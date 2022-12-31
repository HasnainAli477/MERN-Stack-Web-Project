// const jwt = require("./JWTTokenGenerator");
const User = require("../Models/UserModel");
const { promisify } = require("util");
const key = require("../config.json");
const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
  // let token;
  // if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }
  // const decode = await promisify(jwt.verify)(token, key.jwtPrivateKey);
  if (!req.session.user) {
    res.redirect("/");
    res.send("Please login first");
  }
  const freshUser = await User.findById(req.session.user._id);
  if (!freshUser) {
    res.redirect("/");
    res.send("User dosen't exist.");
  }
  req.user = req.session.user;
  next();
};

module.exports = Authenticate;
