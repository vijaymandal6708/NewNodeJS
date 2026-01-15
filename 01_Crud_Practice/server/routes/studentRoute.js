const express = require("express");
const route = express.Router();
const studentController = require("../controllers/studentControllers");

route.post("/add-student", studentController.addStudent);
route.get("/display-student", studentController.displayStudent);
route.delete("/delete-student/:id", studentController.deleteStudent);
route.get("/open-edit-form/:id", studentController.openEditForm);


module.exports = route;