// import all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.DIALECT}://${process.env.HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });

const app = express();

app.use(logger("dev")); //declare morgan logger to work in the dev environment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import all the routes for the service
require('./server/routes')(app);

app.get("*", (req, res) => res.status(200).send({
    message: "Welcome to The Library API, Please Enter a valid Endpoint"
}));

module.exports = app;