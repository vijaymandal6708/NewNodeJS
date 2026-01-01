const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const route = express.Router();
const SellerController = require("../controllers/sellerController");

route.post("/registration",authMiddleware, SellerController.registerSeller);

module.exports = route;