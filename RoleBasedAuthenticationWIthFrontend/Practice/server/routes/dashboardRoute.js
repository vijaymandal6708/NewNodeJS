const express = require("express");
const route = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

route.get("/user",authMiddleware ,authorizeRoles("user"), dashboardController.getUserDashboard);


module.exports = route;