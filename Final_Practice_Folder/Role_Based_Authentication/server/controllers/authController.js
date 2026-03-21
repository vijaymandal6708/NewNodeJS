const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(409).json({ msg: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });

    if (!userExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      userExist.password,
    );

    if (!matchPassword) {
      return res.status(401).json({ msg: "password not match" });
    }

    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      "vijay@1234",
      { expiresIn: "1d" },
    );

    res
      .status(200)
      .json({ msg: "login successfull", token, role: userExist.role });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const authorizeUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid token format" });
    }
    const token = authHeader.split(" ")[1];

    req.user = jwt.verify(token, "vijay@1234");
  } catch (error) {}
};

module.exports = {
  userSignup,
  userLogin,
  authorizeUser,
};
