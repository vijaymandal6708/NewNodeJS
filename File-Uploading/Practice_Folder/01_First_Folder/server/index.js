require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Product = require("./models/productModel");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/product-detail-upload").then(()=>{
    console.log("mongodb connected successfully");
})

const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null, "uploads/"),
    filename: (req,file,cb)=> cb(null, Date.now()+ "-" + file.originalname)
});

const upload = multer({storage});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

app.post("/add-product", upload.single("image"), async (req,res)=>{
  try{
    const img = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productImage: img.secure_url
    });

    console.log(product);
    res.send(product);
  }
  catch(err){
    console.log(err);
    res.status(500).send("Error saving product");
  }
});

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});

