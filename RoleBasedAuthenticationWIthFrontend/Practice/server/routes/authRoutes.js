const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

route.post("/register", authController.userRegister);
route.post("/login", authController.userLogin);
route.get("/profile", authMiddleware, authController.getUserDashboard);

module.exports = route;