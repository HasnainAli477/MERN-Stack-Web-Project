const Product = require("../../Models/ProductsModel");

const NewProduct = async (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  if (req.body.image) product.image = req.body.image;
  await product.save();
  res.redirect("/");
};

module.exports = NewProduct;
