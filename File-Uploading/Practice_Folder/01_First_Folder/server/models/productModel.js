const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productImage: String,
});

module.exports = mongoose.model("product", productSchema);