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
};

const deleteStudent = async (req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    await studentModel.findByIdAndDelete(id);
    res.send("student deleted successfully");
};

const openEditForm = async (req,res)=>{
    const {id} = req.params;
    console.log(req.params);
    const editData = await studentModel.findById(id);
    res.send(editData);
};

const finalEditStudent = async (req,res)=>{
    console.log(req.params);
    console.log(req.body);
    const {id} = req.params;
    await studentModel.findByIdAndUpdate(id,req.body);
    res.send("student updated successfully");
};

const searchStudent = async (req,res)=>{
    console.log(req.body);
    const student = await studentModel.findOne(req.body);
    console.log(student);
    res.send(student);
}


module.exports = {
    addStudent,
    displayStudent,
    deleteStudent,
    openEditForm,
    finalEditStudent,
    searchStudent,
}