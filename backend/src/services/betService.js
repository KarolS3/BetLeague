const prisma = require("../config/prisma");

exports.getBets = async (userId) => {
  return prisma.bet.findMany({
    where: { userId },

    include: { match: true },

    orderBy: { createdAt: "desc" },
  });
};

exports.placeBet = async (userId, { matchId, pick, amount }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user.balance < amount)
    throw Object.assign(new Error("Niewystarczajace saldo"), { status: 400 });

  const odds = await prisma.odds.findUnique({ where: { matchId } });

  if (!odds)
    throw Object.assign(new Error("Brak kursow dla tego meczu"), {
      status: 404,
    });

  const oddValue =
    pick === "home" ? odds.home : pick === "draw" ? odds.draw : odds.away;

  const [bet] = await prisma.$transaction([
    prisma.bet.create({
      data: { userId, matchId, pick, amount, odds: oddValue },

      include: { match: true },
    }),

    prisma.user.update({
      where: { id: userId },

      data: { balance: { decrement: amount } },
    }),

    prisma.transaction.create({
      data: { userId, type: "bet", amount: -amount },
    }),
  ]);

  return bet;
};
