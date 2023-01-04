const express = require("express");
const app = express();
const productrouter = require("./routes/products");
const userrouter = require("./routes/users");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config.json");

app.use(cookieParser());
app.use(express.static("public"));

app.use(
  session({
    secret: config.Key,
    resave: false,
    saveUninitialized: false,
    cookie: {},
    cookie: {
      httpOnly: true,
      maxAge: 8600000,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("my-app"));

mongoose
  .connect("mongodb://localhost/User")
  .then(async () => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(`Error occured. ${err}`);
  });

app.use("/product", productrouter);
app.use("/", productrouter);
app.use("/user", userrouter);

app.listen(config.port, function () {
  console.log("I am listening on port 3000");
});
