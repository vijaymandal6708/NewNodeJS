const express = require("express");
const route = express.Router();
const userController = require("../controllers/authController");

route.post("/register", userController.userRegister);
route.post("/login", userController.userLogin);

module.exports = route;