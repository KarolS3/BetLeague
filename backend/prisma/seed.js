const prisma = require("../src/config/prisma");

async function main() {
  const matches = [
    {
      homeTeam: "Bayern Monachium",
      awayTeam: "Borussia Dortmund",
      league: "Bundesliga",
      startTime: "2025-05-10 18:30",
    },

    {
      homeTeam: "Real Madryt",
      awayTeam: "FC Barcelona",
      league: "La Liga",
      startTime: "2025-05-10 21:00",
    },

    {
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      league: "Premier League",
      startTime: "2025-05-11 17:30",
    },

    {
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      league: "Serie A",
      startTime: "2025-05-11 20:45",
    },

    {
      homeTeam: "PSG",
      awayTeam: "Olympique Marsylia",
      league: "Ligue 1",
      startTime: "2025-05-12 20:00",
    },
  ];

  for (const m of matches) {
    const match = await prisma.match.create({ data: m });

    await prisma.odds.create({
      data: {
        matchId: match.id,

        home: +(1.5 + Math.random()).toFixed(2),

        draw: +(3.0 + Math.random()).toFixed(2),

        away: +(2.0 + Math.random() * 2).toFixed(2),
      },
    });
  }

  console.log("Seed gotowy - dodano " + matches.length + " meczow");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
