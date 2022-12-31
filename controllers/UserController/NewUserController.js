const User = require("../../Models/UserModel");

const Register = async (req, res) => {
  try {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    if (user.role) user.role = req.body.role;
    await user.save();
    res.redirect("/user/login");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = Register;
