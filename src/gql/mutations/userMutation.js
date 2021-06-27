"use strict";

const GraphQL = require("graphql");
//const UserController = require("../../controllers/userController");

const { GraphQLNonNull, GraphQLString } = GraphQL;
//importing the user model
const User = require("../../models/userModel");
// lets import our user type
const UserType = require("../types/userType");

const login = () => {
  return {
    type: UserType,
    description: "User authentication",

    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Email can't be left empty",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    async resolve(parent, args) {
      //return await UserController.login(fields);
      return await User.create(args);
    },
  };
};

const registration = () => {
  return {
    type: UserType,
    description: "User authentication",

    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Name be left empty",
      },

      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Email be left empty",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    async resolve(parent, args) {
      //return await UserController.registration(fields);
      return await User.create(args);
    },
  };
};

module.exports = { login, registration };
