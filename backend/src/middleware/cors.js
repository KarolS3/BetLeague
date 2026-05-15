const cors = require("cors");

module.exports = cors({
  origin: "http://localhost:5173",

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],
});
