"use strict";

const GraphQL = require("graphql");
const { GraphQLString, GraphQLBoolean, GraphQLNonNull } = GraphQL;

const UserType = new GraphQL.GraphQLObjectType({
  name: "User",
  description: "User type for managing all the users in our application.",

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "ID of the user, Generated automatically by MongoDB",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Full name of the user",
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Email of the user",
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Password of the user,must be valid and unique",
    },

    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description:
        "Status of the user, whether active or disabled. For this application status will be active by default",
      defaultValue: "active",
    },

    role: {
      type: new GraphQLNonNull(GraphQLString),
      description: "User type for permission purpose",
      defaultValue: "user",
    },

    token: {
      type: GraphQLString,
      description: "Status of the user, whether active or disabled",
    },

    createdAt: {
      type: GraphQLString,
      description:
        "Generate system to allow user to have secure resource access",
    },
    updatedAt: {
      type: GraphQLString,
      description: "Date and time when this users account was last updated",
    },
  }),
});

module.exports = UserType;
