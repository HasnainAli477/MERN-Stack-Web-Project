const User = require("../Models/UserModel");
const jwt = require("./JWTTokenGenerator");

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.send("No email or password is entered");
  let user = await User.findOne({ email: email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.redirect("/");
    res.send("Incorrect email or password is provided");
  }
  // let token = jwt(user._id, user.email);
  // req.session.jwt = token;
  // res.cookie("jwt", token, { httpOnly: true });
  // let user = await User.findById(user._id)
  req.session.user = user;
  res.redirect("/");
};

const Logout = (req, res) => {
  req.session.user = "undefine";
  res.redirect("/");
};
module.exports = { Login, Logout };
