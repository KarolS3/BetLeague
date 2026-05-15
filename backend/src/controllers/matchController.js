const { fetchMatches } = require("../services/matchService");

exports.getMatches = async (req, res, next) => {
  try {
    const matches = await fetchMatches();

    res.json(matches);
  } catch (err) {
    next(err);
  }
};
