const express = require("express");
const Router = express.Router();
const Authorization = require("../Auth/Authorization");
const Authenticate = require("../Auth/Authenticate");
const Products = require("../Models/ProductsModel");
const Product = require("../Models/ProductsModel");

//Add new product in database
Router.post(
  "/addproduct",
  Authenticate,
  Authorization("admin"),
  async (req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    if (req.body.image) product.image = req.body.image;
    await product.save();
    res.redirect("/");
  }
);

//Get new product page
Router.get("/addproduct", Authenticate, Authorization("admin"), (req, res) => {
  let cart = req.cookies.cart;
  let ItemsCount = cart.length;
  res.render("AddProduct", {
    title: "Add New Product",
    user: req.session.user,
    Items: ItemsCount,
  });
});

//Get the cart
Router.get("/cart", Authenticate, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) {
    cart = [];
  }
  let ItemsCount = cart.length;
  let products = await Products.find({ _id: { $in: cart } });

  let total = products.reduce(
    (total, product) => total + Number(product.price),
    0
  );
  res.render("cart", {
    title: "Cart",
    products,
    total,
    user: req.session.user,
    Items: ItemsCount,
  });
});

//Delete from cart
Router.get("/cart/delete/:id", Authenticate, (req, res) => {
  let cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/product/cart");
});

//Add in cart
Router.get("/AddProduct/:id", (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  res.redirect("/");
});

//Update the product
Router.post(
  "/update/:id",
  Authenticate,
  Authorization("admin"),
  async (req, res) => {
    let Product = await Products.findById(req.params.id);
    Product.name = req.body.name;
    Product.price = req.body.price;
    Product.image = req.body.image;
    Product.description = req.body.description;
    await Product.save();
    res.redirect("/");
  }
);

//Get the update file
Router.get(
  "/update/:id",
  Authenticate,
  Authorization("admin"),
  async (req, res) => {
    let Product = await Products.findById(req.params.id);
    let cart = req.cookies.cart;
    let ItemsCount = cart.length;
    res.render("UpdateProduct", {
      title: "Update Page",
      Product,
      Items: ItemsCount,
    });
  }
);

//Get the delete page
Router.get(
  "/delete/:id",
  Authenticate,
  Authorization("admin"),
  async (req, res) => {
    let product = await Products.findById(req.params.id);
    await product.delete();
    res.redirect("/");
  }
);

// Main Page
Router.get("/", async (req, res) => {
  let products = await Products.find();
  let cart = req.cookies.cart;
  if (!cart) {
    cart = [];
  }
  let ItemsCount = cart.length;
  res.render("Products", {
    title: "Overview Page",
    products,
    user: req.session.user,
    Items: ItemsCount,
  });
});

module.exports = Router;
