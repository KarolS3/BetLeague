const router = require("express").Router();

const { getMatches } = require("../controllers/matchController");

router.get("/", getMatches);

module.exports = router;
