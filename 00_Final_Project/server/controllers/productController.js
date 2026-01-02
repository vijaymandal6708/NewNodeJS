const ProductModel = require("../models/ProductModel")

const productDisplay = async (req,res) => {
  const productdisplay = await ProductModel.find({});
  res.send(productdisplay); 
}

const productDetail = async (req,res) => {
  console.log("REQ ID:", req.params.id);

  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  res.json(product);
}

module.exports = {
    productDisplay,
    productDetail,
}