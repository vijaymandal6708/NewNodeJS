const express = require("express");
const route = express.Router();
const ProductController = require("../controllers/productController")

route.get("/product-display", ProductController.productDisplay);
route.get("/category/:category", ProductController.getByCategory);
route.get("/search", ProductController.productSearch);

route.get("/:id", ProductController.productDetail);



module.exports= route;