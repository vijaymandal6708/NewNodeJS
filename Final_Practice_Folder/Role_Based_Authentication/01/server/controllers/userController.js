const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  console.log(req.body);

  const ifUserExist = await userModel.findOne({ email: req.body.email });

  if (ifUserExist) {
    return res.status(409).json({ msg: "user already exist" });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const user = await userModel.create({
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
  });

  res.json({ msg: "signup successful" });
};

const Login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password,user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "email or password is incorrect" });
    }

    const token = jwt.sign(
       {id:user._id, role:user.role},
       "vijay123",
       {expiresIn:"1d"}
    );

    res.json({msg:"user successfully logged in", token});

  } catch (error) {
    return res.status(500).json({msg:"internal server error"});
  }
};

const getUserDashboard=(req,res)=>{
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    console.log(token);

    req.user = jwt.verify(token, "vijay123");

    console.log("user authorized");

    if(req.user.role==="admin"){
       return res.json({msg:"welcome admin",user:req.user});
    }

    if(req.user.role==="user"){
       return res.json({msg:"welcome user",user:req.user});
    }

    return res.status(404).json({msg:"invalid token"});
}

module.exports = {
  Signup,
  Login,
  getUserDashboard,
};
