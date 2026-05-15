const { registerUser, loginUser, getUser } = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body.email, req.body.password);

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body.email, req.body.password);

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const data = await getUser(req.user.id);

    res.json(data);
  } catch (err) {
    next(err);
  }
};
