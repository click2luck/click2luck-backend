const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");
const { Post, User } = require("../models");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    apellidos: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type:  GraphQLString}
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  description: "Company type",
  fields: () => ({
    id: { type: GraphQLID },
    compamyname: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    phone: { type: GraphQLString },
    role: { type:  GraphQLString}
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.authorId);
      },
    },
    
  }),
});


module.exports = {
  UserType,
  PostType,
  CompanyType
  
};
