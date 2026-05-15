require("dotenv").config();

const express = require("express");

const corsMiddleware = require("./middleware/cors");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");

const matchRoutes = require("./routes/matchRoutes");

const betRoutes = require("./routes/betRoutes");

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);

app.use("/api/matches", matchRoutes);

app.use("/api/bets", betRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
require("./config/cron");
app.listen(PORT, () => console.log("Backend dziala na porcie " + PORT));
