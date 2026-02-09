const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/user-dashboard-validate",authMiddleware,roleMiddleware("user"), userController.userDashboardValidate);


module.exports = router;