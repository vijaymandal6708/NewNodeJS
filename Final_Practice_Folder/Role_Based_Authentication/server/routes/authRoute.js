const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.get("/authorize-user", authController.authorizeUser)


module.exports = router;