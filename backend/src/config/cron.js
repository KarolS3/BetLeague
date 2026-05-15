const cron = require("node-cron");

const axios = require("axios");

const prisma = require("./prisma");

const LEAGUES = {
  39: "Premier League",

  140: "La Liga",

  135: "Serie A",

  78: "Bundesliga",

  61: "Ligue 1",
};

async function syncMatches() {
  console.log("Synchronizacja meczow...");

  for (const [leagueId, leagueName] of Object.entries(LEAGUES)) {
    try {
      const { data } = await axios.get(
        "https://v3.football.api-sports.io/fixtures",
        {
          params: { league: leagueId, season: 2025, next: 5 },
          headers: {
            "x-apisports-key": process.env.APISPORTS_KEY,
          },
        },
      );

      for (const fixture of data.response) {
        const externalId = fixture.fixture.id;

        const matchData = {
          homeTeam: fixture.teams.home.name,

          awayTeam: fixture.teams.away.name,

          league: leagueName,

          startTime: new Date(fixture.fixture.date).toLocaleString("pl-PL"),

          status: "scheduled",
        };

        const match = await prisma.match.upsert({
          where: { externalId },

          update: matchData,

          create: { ...matchData, externalId },
        });

        const existing = await prisma.odds.findUnique({
          where: { matchId: match.id },
        });

        if (!existing) {
          await prisma.odds.create({
            data: {
              matchId: match.id,

              home: +(1.5 + Math.random()).toFixed(2),

              draw: +(3.0 + Math.random()).toFixed(2),

              away: +(2.0 + Math.random() * 2).toFixed(2),
            },
          });
        }
      }
    } catch (e) {
      console.error("Blad sync ligi " + leagueId + ": " + e.message);
    }
  }
}

cron.schedule("*/30 * * * *", syncMatches);

syncMatches();

module.exports = { syncMatches };
