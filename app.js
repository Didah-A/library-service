/* Required imports to run the Node Service */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { errors } = require("celebrate");
require('dotenv').config();

/* Mongo database configuration */
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DIALECT}://${process.env.HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes')(app);

app.use(errors());

module.exports = app;