const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const { UserType, PostType} = require("./types");
const { User, Post } = require("../models");
var atob = require('atob');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authenticate } = require("../middleware/auth");

 const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves a list of users",
  resolve: (_, args, context) =>{
    token = context.user.split(" ")[1]
    try {
      const verified = jwt.verify(token, JWT_SECRET); 
      console.log(verified.user.role)
      if(verified.user.role == "admin"){
        return User.find()
      }
    } catch (error) {
      throw new Error('You are not authenticated!')
      
    }
   
   
    
     }

};


const user = {
  type: UserType,
  description: "retrieves a single user",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => User.findById(id),
};

const posts = {
  type: new GraphQLList(PostType),
  description: "retrieves a list of posts",
  resolve: () => Post.find(),
};

const post = {
  type: PostType,
  description: "retrieves a single post",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Post.findById(id),
};





module.exports = { users, user, posts, post };
