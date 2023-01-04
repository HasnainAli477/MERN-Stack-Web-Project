const express = require("express");
const Router = express.Router();
const { Login } = require("../Auth/Login");
const Authorization = require("../Auth/Authorization");
const Authenticate = require("../Auth/Authenticate");
const { Logout } = require("../Auth/Login");
const User = require("../Models/UserModel");
const nodemailer = require("nodemailer");

Router.post("/register", async (req, res) => {
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
});
Router.get("/logout", Logout);

Router.get("/register", (req, res) => {
  res.render("Register", { title: "New User Register" });
});

Router.get("/MyAccount/:id", Authenticate, (req, res) => {
  let cart = req.cookies.cart;
  let ItemsCount = cart.length;
  res.render("UserAccount", {
    title: "User Account",
    user: req.session.user,
    Items: ItemsCount,
  });
});

Router.get(
  "/delete/:id",
  Authenticate,
  Authorization("user"),
  async (req, res) => {
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
  }
);
Router.post(
  "/update/:id",
  Authenticate,
  Authorization("user"),
  async (req, res) => {
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
  }
);

Router.post("/login", Login);
Router.get("/login", (req, res) => {
  res.render("Login", { title: "Login" });
});

Router.get("/", (req, res) => {
  res.render("Login");
});

Router.post("/contact", (req, res) => {
  const tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "SP20-BCS-122@cuilahore.edu.pk",
      pass: "ccthhtkbryoewpjq",
    },
  });

  const mailOptions = {
    from: req.body.Email,
    to: "alihasnain.031350.pk@gmail.com",
    subject: `Message from ${req.body.name}: ${req.body.Subject}`,
    text: req.body.message,
  };

  tranporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("Error occured");
    } else {
      console.log("Success");
      res.send("Message sended succesfully");
    }
  });
});

Router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact-Us" });
});

module.exports = Router;
