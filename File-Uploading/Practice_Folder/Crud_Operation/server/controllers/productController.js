const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/productModel");

const addProduct =async(req,res)=>{
    console.log(req.body);
    
    const product = await Product.create(req.body);

    res.send(product);
};

const getProducts =async(req,res)=>{
    const products= await Product.find();

    res.send(products);
}


module.exports = {
    addProduct,
    getProducts,
}