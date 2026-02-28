import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});