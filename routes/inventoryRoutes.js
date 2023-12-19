const express = require("express");

const InventoryController = require("../controllers/inventoryController");

const Router = express.Router();

// Router.get('/', InventoryController.fun);
Router.post('/addToInventory' , InventoryController.addToInventory);
Router.get('/getPerMonthForYear', InventoryController.getQuantityPerMonth);

module.exports = Router;