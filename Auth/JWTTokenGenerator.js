const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const token = function signAToken(id, email) {
  return jwt.sign({ id, email }, config.jwtPrivateKey, {
    expiresIn: "2d",
  });
};

module.exports = token;
