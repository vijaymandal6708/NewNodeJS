const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminOnly");

route.post("/login", AdminController.adminLogin);
route.post("/add-product", adminAuth, AdminController.addProduct);
route.get("/dashboard-stats", adminAuth, AdminController.getDashboardStats);
route.get("/orders", adminAuth, AdminController.getAllOrders);
route.get("/products", adminAuth, AdminController.getProductsWithStock);




module.exports= route;