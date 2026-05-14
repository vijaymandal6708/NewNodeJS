const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/twenty-one-role-base-authentication").then(()=>{
    console.log("mongodb connected successfully");
});

app.use("/user", authRoute);

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
});