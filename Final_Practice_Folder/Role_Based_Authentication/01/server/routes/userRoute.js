const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.get("/fetch-user-dashboard", userController.getUserDashboard);


module.exports = router;