const express = require("express");

const HomeController = require("../controllers/HomeController");

const Router = express.Router();

Router.get('/getPerMonthForYear', HomeController.getDataPerMonth);
Router.get('/getRefillPerMonthForYear', HomeController.getRefillDataPerMonth);
Router.get('/getPolularity', HomeController.getPopularity);

module.exports = Router;