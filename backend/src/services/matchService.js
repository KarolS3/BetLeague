const prisma = require("../config/prisma");

exports.fetchMatches = async () => {
  return prisma.match.findMany({
    where: { status: "scheduled" },

    include: { odds: true },

    orderBy: { id: "asc" },
  });
};
