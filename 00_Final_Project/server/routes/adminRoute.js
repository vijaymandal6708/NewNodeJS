const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");
route.post("/login", AdminController.adminLogin);
route.post("/add-product", AdminController.addProduct);
route.get("/dashboard-stats", AdminController.getDashboardStats);
route.get("/orders", AdminController.getAllOrders);
route.get("/products", AdminController.getProductsWithStock);




module.exports= route;