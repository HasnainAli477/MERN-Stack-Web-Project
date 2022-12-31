const User = require("../../Models/UserModel");
// const Products = require("../../Models/ProductsModel");

const UpdateProduct = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user._id.equals(req.params.id)) {
      console.log("Both are aqual");
      user.role = req.body.role;
      user.name = req.body.name;
      user.password = req.body.password;
      await user.save();
    }
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = UpdateProduct;
