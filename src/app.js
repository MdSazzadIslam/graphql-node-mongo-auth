"use strict";
const express = require("express");
const logger = require("morgan"); //HTTP request logger middleware that generates request logs
const fs = require("fs");
const path = require("path");
const { graphqlHTTP } = require("express-graphql"); //will set up our GraphQL HTTP server.
const cors = require("cors");

// let's import the schema file we just created
const GraphQLSchema = require("./gql");
//const jwt = require("express-jwt");

//Initializing app
const app = express();
app.use(express.json());
app.use(cors());

//morgan only use for developement purpose
if (process.env.NODE_ENV === "development") {
  // we are using the host parameter
  app.use(
    morgan(":method :host :status :res[content-length] - :response-time ms")
  ); //This tells express to log via morgan
}

//create a write stream(in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/logs/access.log"),
  { flags: "a" }
);
//setup the logger
app.use(logger("combined", { stream: accessLogStream }));

////////////////GraphQL server///////////////////////
app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: process.env.NODE_ENV === "development",
    pretty: true,
  })
);
// =========== GraphQL server end ========== //

module.exports = app;
