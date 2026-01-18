const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// ONLY route gateway
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

module.exports = app;