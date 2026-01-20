const userModel = require("../models/userModel");

const userRegister = async(req,res)=>{
    console.log(req.body);
    await userModel.create(req.body);
    res.send("okk");
}

onst userRegister = async(req,res)=>{
    console.log(req.body);
    await userModel.create(req.body);
    res.send("okk");
}


module.exports = {userRegister,}