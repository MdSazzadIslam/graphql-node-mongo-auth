"use strict";

const GraphQL = require("graphql");
//const UserController = require("../../controllers/userController");

const { GraphQLNonNull, GraphQLString } = GraphQL;

const matchPassword = require("../../middlewares/matchPassword");
const hashPassword = require("../../middlewares/hashPassword");
const generateToken = require("../../middlewares/generateToken");

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
    async resolve(parent, args, context, info) {
      //return await UserController.login(fields);
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (user) {
        const isValid = await matchPassword(password, user.password);
        if (isValid) {
          const token = await generateToken(user._id, user.email);
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            status: user.status,
            role: user.role,
            token,
          };
        } else {
          throw new Error("Password is not valid");
        }
      }
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
    async resolve(parent, args, context, info) {
      const { name, email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        const newPassword = await hashPassword(
          password,
          10 //saltRounds = 10;
        );

        const newUser = {
          name,
          email,
          password: newPassword,
        };
        return await User.create(newUser);
      } else {
        return new Error("Email already used");
      }
    },
  };
};

module.exports = { login, registration };
