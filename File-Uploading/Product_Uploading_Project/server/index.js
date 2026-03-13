import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

import Product from "./productModel.js";
import cloudinary from "./cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/product-detail-upload").then(()=>{
    console.log("mongodb connected");
})

/* multer setup */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* add product */

app.post("/add-product", upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    stars: req.body.stars,
    description: req.body.description,
    image: result.secure_url,
  });

  fs.unlinkSync(req.file.path);

  res.json(product);
});

/* get products */

app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.listen(5000, () => console.log("Server running on 5000"));
