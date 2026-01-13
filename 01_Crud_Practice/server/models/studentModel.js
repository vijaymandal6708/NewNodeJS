const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:String,
    rollno:Number,
});


module.exports = mongoose.model("student", studentSchema);