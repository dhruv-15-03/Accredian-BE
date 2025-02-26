const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/referrals", referralRoutes);

module.exports = app;
