const express = require("express");
const HomeController = require("../controllers/HomeController");
const { protect } = require("../controllers/authController");
const Router = express.Router();

Router.get('/getPerMonthForYear', protect, HomeController.getDataPerMonth);
Router.get('/getRefillPerMonthForYear', protect, HomeController.getRefillDataPerMonth);
Router.get('/getPolularity', protect, HomeController.getPopularity);


module.exports = Router;