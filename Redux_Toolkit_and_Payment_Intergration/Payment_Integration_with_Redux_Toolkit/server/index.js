import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const products = [
  { id: 1, name: "Headphones", price: 1500 },
  { id: 2, name: "Smart Watch", price: 3000 },
  { id: 3, name: "Bluetooth Speaker", price: 2000 }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});