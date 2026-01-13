const studentModel = require("../models/studentModel");

const addStudent = async (req,res)=>{
    console.log(req.body);
    await studentModel.create(req.body);
    res.send("data saved");
};

const displayStudent = async (req,res)=>{
    const students = await studentModel.find({});
    console.log(students);
    res.send(students);
}


module.exports = {
    addStudent,
    displayStudent,
}