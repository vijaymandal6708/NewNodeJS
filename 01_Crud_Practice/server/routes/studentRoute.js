const express = require("express");
const route = express.Router();
const studentController = require("../controllers/studentControllers");

route.post("/add-student", studentController.addStudent);
route.get("/display-student", studentController.displayStudent);


module.exports = route;