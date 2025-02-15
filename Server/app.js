if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

var cors = require("cors");
const errorHandler = require("./middlewares/errorHandling");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routers"));

app.use(errorHandler);

module.exports = app;
