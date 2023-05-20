const express = require("express");
const getInfo = require("./getInfo");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

app.use("/", async (req, res) => {
  try {
    const info = await getInfo();
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
