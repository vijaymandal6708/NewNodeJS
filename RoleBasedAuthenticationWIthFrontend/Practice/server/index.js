const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userModel= require("./models/userModel");
const authRoute = require("./routes/authRoutes");
const dashboardRoute = require("./routes/dashboardRoute");

app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGODB_CONN}`).then(()=>{
    console.log("mongodb conneted")
})

app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})