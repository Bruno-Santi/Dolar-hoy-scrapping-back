const express = require("express");
const getInfo = require("./getInfo");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
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
app.get("/", async (req, res) => {
  try {
    const info = await getInfo();
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/hola", async (req, res) => {
  try {
    res.status(200).json({ hola });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = app;
