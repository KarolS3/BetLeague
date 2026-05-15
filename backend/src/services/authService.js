const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },

    process.env.JWT_SECRET,

    { expiresIn: "7d" },
  );
}

exports.registerUser = async (email, password) => {
  const exists = await prisma.user.findUnique({ where: { email } });

  if (exists)
    throw Object.assign(new Error("Email juz zajety"), { status: 409 });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({ data: { email, password: hash } });

  await prisma.transaction.create({
    data: { userId: user.id, type: "deposit", amount: 1000 },
  });

  return {
    user: { id: user.id, email: user.email, balance: user.balance },
    token: makeToken(user),
  };
};

exports.loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    throw Object.assign(new Error("Nieprawidlowe dane"), { status: 401 });

  const ok = await bcrypt.compare(password, user.password);

  if (!ok)
    throw Object.assign(new Error("Nieprawidlowe dane"), { status: 401 });

  return {
    user: { id: user.id, email: user.email, balance: user.balance },
    token: makeToken(user),
  };
};

exports.getUser = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return { id: user.id, email: user.email, balance: user.balance };
};
