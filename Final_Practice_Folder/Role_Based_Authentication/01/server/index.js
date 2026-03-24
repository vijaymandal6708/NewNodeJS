const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/twenty-four-role").then(()=>{
    console.log("mongodb connected successfully");
})

app.use("/user", userRoute);

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
})