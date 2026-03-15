const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null, "uploads/"),
    filename: (req,file,cb)=> cb(null, Date.now()+ "-" + file.originalname)
});

const upload = multer({storage});

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
});

app.post("/add-product",upload.single("image"),async(req,res)=>{
    
    const img = await cloudinary.uploader.upload(req.file.path);

    console.log(req.file);
    res.send("success");
});

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})