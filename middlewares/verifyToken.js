"use strict";

var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const verifyToken = async (token) => {
  if (token) {
    if (token) {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.ACCESS_TOKEN_SECRET
      );

      return decoded;
    }
  }

  throw new Error("Not authenticated");
};

module.exports = verifyToken;
