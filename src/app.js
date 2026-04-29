const express = require("express");
const app = express();

app.use(express.json());

// routes
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

module.exports = app;