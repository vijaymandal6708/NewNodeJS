const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/nineteen-crud").then(()=>{
    console.log("mongodb connected successfully");
});

app.use("/product", productRoute);

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
});