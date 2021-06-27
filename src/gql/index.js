"use strict";
const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;

// importing all the queries
const UserQuery = require("./queries/userQueries");
// importing all the  mutations
const UserMutation = require("./mutations/userMutation");

// lets define our root query
const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "This is the default root query provided by the backend",
  fields: {
    // User
    users: UserQuery.getAll(),
    user: UserQuery.getById(),
  },
});

// lets define our root mutation
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Default mutation provided by the backend APIs",
  fields: {
    // User
    login: UserMutation.login(),
    registration: UserMutation.registration(),
  },
});

// export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
