const User = require("../../Models/UserModel");
const Products = require("../../Models/ProductsModel");

const DeleteProduct = async (req, res) => {
  let product = await Products.findById(req.params.id);
  await product.delete();
  res.redirect("/");
};

module.exports = DeleteProduct;
