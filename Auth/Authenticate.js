const User = require("../Models/UserModel");

const Authenticate = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }
  const freshUser = await User.findById(req.session.user._id);
  if (!freshUser) {
    return res.redirect("/user/login");
  }
  req.user = req.session.user;
  next();
};

module.exports = Authenticate;

// const jwt = require("./JWTTokenGenerator");

// const { promisify } = require("util");
// const key = require("../config.json");
// const jwt = require("jsonwebtoken");

// let token;
// if (req.cookies.jwt) {
//   token = req.cookies.jwt;
// }
// const decode = await promisify(jwt.verify)(token, key.jwtPrivateKey);
