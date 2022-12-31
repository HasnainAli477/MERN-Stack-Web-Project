const express = require("express");
const Router = express.Router();
const { Login } = require("../Auth/Login");
const NewUser = require("../controllers/UserController/NewUserController");
const DeleteUser = require("../controllers/UserController/DeleteUser");
const Authorization = require("../Auth/Authorization");
const UpdateUser = require("../controllers/UserController/UpdateUser");
const Authenticate = require("../Auth/Authenticate");
const { Logout } = require("../Auth/Login");

Router.post("/register", NewUser);
Router.get("/logout", Logout);

Router.get("/register", (req, res) => {
  res.render("Register", { title: "New User Register" });
});

Router.get("/MyAccount/:id", Authenticate, (req, res) => {
  res.render("UserAccount", {
    title: "User Account",
    user: req.session.user,
    pass: req.session.pass,
  });
});

Router.get("/AddProduct/:id", function (req, res) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  // req.flash("success", "Product Added To Cart");
  res.redirect("/");
});

Router.get("/delete/:id", Authenticate, Authorization("user"), DeleteUser);
Router.post("/update/:id", Authenticate, Authorization("user"), UpdateUser);

Router.post("/login", Login);
Router.get("/login", (req, res) => {
  res.render("Login", { title: "Login" });
});

Router.get("/", (req, res) => {
  res.send("You came to user directory");
});

module.exports = Router;
