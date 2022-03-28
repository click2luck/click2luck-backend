const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Queries
const { users, user, posts, post } = require("./queries");

// Mutations
const {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
} = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    users,
    user,
    posts,
    post,
    
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
