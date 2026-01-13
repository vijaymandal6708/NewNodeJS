const express = require("express");
const app = express();
const studentRoute = require("./routes/studentRoute");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/newest-crud").then(()=>{
    console.log("database connected successfully");
})

app.use(cors());

app.use(express.json());

app.use("/student", studentRoute);

app.listen(9000, ()=>{
    console.log("Server is running on port 9000!");
})