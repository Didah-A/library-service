/* Required imports to run the Node Service */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { errors } = require("celebrate");
require('dotenv').config();
const { connectDB } = require("./config");

connectDB();

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errors());

// import all service routes
require('./src/routes')(app);
require("./config/prod")(app);

module.exports = app;
