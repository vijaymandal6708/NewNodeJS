const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req,res)=>{
    try {
      console.log(req.body);
      const {name,email,password} = req.body;

      if(!name || !email || !password){
        return res.status(400).json({message:"all fields are required"});
      };

      const userExists = await userModel.findOne({email});

      if (userExists){
        return res.status(400).json({message:"user already exists"});
      }

      const hashPassword = await bcrypt.hash(password,10);
      await userModel.create({name:name,email:email,password:hashPassword});
      
      res.status(201).json({message:"user successfully registered"});

    } catch (error) {
      res.status(500).json({message:"internal server error"});
    }
};

const userLogin = async (req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"all fields are required"});
    }
    
    const userFound = await userModel.findOne({email});

    if(!userFound){
        return res.status(404).json({message:"user not found"});
    };

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch){
        return res.status(400).json({message:"invalid credentials"});
    }

    const token = jwt.sign(
        {id:userFound._id, role:userFound.role},
        "vijay@1234",
        {expiresIn:"1d"}
    );

    res.status(200).json({message:"user logged in successfully",token, name:userFound.name,role:userFound.role});

};

const userDashboardValidate = async (req,res)=>{
    console.log(req.headers.authorization);
    res.send("okk");
}


module.exports = {
    userRegister,
    userLogin,
    userDashboardValidate,
}

