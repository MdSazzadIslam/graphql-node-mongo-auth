"use strict";

const GraphQL = require("graphql");
//const UserController = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");
const { GraphQLList, GraphQLString, GraphQLNonNull } = GraphQL;
//importing the user model
const User = require("../../models/userModel");
// importing the user type
const UserType = require("../types/userType");

//to display all the records
const getAll = () => {
  return {
    type: new GraphQLList(UserType),
    description: "This will return all the users present in the database",
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        // return await UserController.getAll();
        return await User.find({});
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

//to display single record
const getById = () => {
  return {
    type: UserType,
    description:
      "This will return data of a single users based on the id provided",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter user id",
      },
    },
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        //return await UserController.getById(user.id);
        return await User.findById(args.id);
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

module.exports = { getAll, getById };
