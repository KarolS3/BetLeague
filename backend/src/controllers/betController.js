const { getBets, placeBet } = require("../services/betService");

exports.getUserBets = async (req, res, next) => {
  try {
    res.json(await getBets(req.user.id));
  } catch (err) {
    next(err);
  }
};

exports.createBet = async (req, res, next) => {
  try {
    const bet = await placeBet(req.user.id, req.body);

    res.status(201).json(bet);
  } catch (err) {
    next(err);
  }
};
