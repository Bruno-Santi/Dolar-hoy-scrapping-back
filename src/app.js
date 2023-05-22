const express = require("express");
const getInfo = require("./getInfo");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/get", async (req, res) => {
  try {
    const info = await getInfo();
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
