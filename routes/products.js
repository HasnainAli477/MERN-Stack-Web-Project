const express = require("express");
const app = express();
const Router = express.Router();
const AddNewProduct = require("../controllers/ProductController/NewProduct");
const UpdateProduct = require("../controllers/ProductController/UpdateProduct");
const Authorization = require("../Auth/Authorization");
const deleteProduct = require("../controllers/ProductController/DeleteProduct");
const Authenticate = require("../Auth/Authenticate");
const Products = require("../Models/ProductsModel");
const cors = require("cors");
const request = require("request");

app.use(cors());

const expressStaticGzip = require("express-static-gzip");

app.use("/", expressStaticGzip("build", { enableBrotli: true }));

Router.post("/addproduct", Authenticate, Authorization("admin"), AddNewProduct);
Router.get("/addproduct", (req, res) => {
  res.render("AddProduct", {
    title: "Add New Product",
    user: req.session.user,
  });
});

Router.get("/cart", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
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
  });
});

// Router.post("/React", (req, res) => {
//   res.send();
// });

Router.post("/update/:id", Authenticate, Authorization("admin"), UpdateProduct);
Router.get(
  "/update/:id",
  Authenticate,
  Authorization("admin"),
  async (req, res) => {
    let Product = await Products.findById(req.params.id);
    // console.log(Product);
    res.render("UpdateProduct", {
      title: "Update Page",
      Product,
    });
  }
);
Router.get("/delete/:id", Authenticate, Authorization("admin"), deleteProduct);
Router.get("/", async (req, res) => {
  // res.cookie("jwt", null, { httpOnly: true });
  let products = await Products.find();
  // let user = await User.findById(req.session.jwt);
  // let jwt = req.session.jwt;
  // console.log(req.session.user);
  res.render("Products", {
    title: "Overview Page",
    products,
    user: req.session.user,
  });
});

module.exports = Router;
