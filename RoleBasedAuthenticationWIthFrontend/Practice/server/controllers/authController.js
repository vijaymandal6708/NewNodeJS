const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async(req,res)=>{
    console.log(req.body);
    const {name,email,password} = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    await userModel.create({name,email,password:hashpassword});

    res.send("okk");
};

const userLogin = async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;

    const user = await userModel.findOne({email:email});
    
    if(!user){
        return res.status(200).json({message:"user not found"});
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        return res.status(200).json({message:"incorrect password"});
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({ 
        message: "login success", 
        token:token,
        role: user.role 
    });
};


module.exports = {
    userRegister,
    userLogin,
}