const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.post("register", userController.userRegister);

module.exports = route;