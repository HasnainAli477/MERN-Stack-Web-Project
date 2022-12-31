const User = require("../../Models/UserModel");
const Products = require("../../Models/ProductsModel");

const UpdateProduct = async (req, res) => {
  let Product = await Products.findById(req.params.id);
  Product.name = req.body.name;
  Product.price = req.body.price;
  Product.image = req.body.image;
  Product.description = req.body.description;
  await Product.save();
  res.redirect("/");
};

module.exports = UpdateProduct;
