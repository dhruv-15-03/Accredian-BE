const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

app.use(cors());
app.use(
    cors({
      origin: ["http://localhost:3000/*","https://accredian-fe.vercel.app/*"], // Allow only your frontend
      methods: "GET,POST,PUT,DELETE",
      credentials: true, // Allow cookies if needed
    })
  );
app.use(bodyParser.json());
app.use("/api/referrals", referralRoutes);

module.exports = app;
