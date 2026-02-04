const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

mongoose.connect("mongodb://localhost:27017/newest-role-04-05-26").then(()=>{
    console.log("db connected successfully");
})

app.listen(4000, ()=>{
    console.log("server is running on port 4000");
});