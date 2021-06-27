"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const generateToken = (id, email) =>
  jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1day",
  });

module.exports = generateToken;
