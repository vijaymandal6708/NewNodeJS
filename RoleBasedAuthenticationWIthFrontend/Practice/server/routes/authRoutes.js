const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

route.post("/register", authController.userRegister);
route.post("/login", authController.userLogin);

module.exports = route;