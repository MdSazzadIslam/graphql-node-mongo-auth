"use strict";
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose"); //Mongoose is an object data modeling(ODM) library
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //process.env global variable is injected by the node at run time
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connection successfull");
  } catch (error) {
    console.log("Connection fail", error);
    process.exit(1); //the process is immediately forced to terminate.
    //This means that any callback that's pending, any network request still being sent,
    //any filesystem access, or processes writing to stdout or stderr - all is going to be ungracefully terminated right away.
  }
};

module.exports = connectDB;
