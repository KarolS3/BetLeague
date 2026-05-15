const router = require("express").Router();

const auth = require("../middleware/auth");

const { getUserBets, createBet } = require("../controllers/betController");

router.get("/", auth, getUserBets);

router.post("/", auth, createBet);

module.exports = router;
