const ProductModel = require("../models/ProductModel")

const productDisplay = async (req,res) => {
  const productdisplay = await ProductModel.find({});
  res.send(productdisplay); 
}

const productDetail = async (req,res) => {
  const productdetail = await ProductModel.findOne();
  console.log(productdetail);
  res.send(productdetail);
}

module.exports = {
    productDisplay,
    productDetail,
}