const express = require("express");
const route = express.Router();
const ProductController = require("../controllers/productController")

route.get("/product-display", ProductController.productDisplay);
route.get("/:id", ProductController.productDetail);



module.exports= route;