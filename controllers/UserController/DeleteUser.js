const User = require("../../Models/UserModel");
const Products = require("../../Models/ProductsModel");
const { Logout } = require("../../Auth/Login");

const DeleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user._id.equals(req.user._id)) {
      let response = await user.delete();
      res.redirect("/user/logout");
    } else {
      res.send(`${req.user._id} can't delete user ${user._id}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DeleteUser;
