const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const { User, Post} = require("../models");
const { auth, bcrypt } = require("../util");
const { PostType} = require("./types");

const register = {
  type: GraphQLString,
  args: {
    nombre: { type: new GraphQLNonNull(GraphQLString) },
    apellidos: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { nombre,apellidos, email, password, role},context) {
    const user = new User({ nombre,apellidos, email, password, role});
    user.password = await bcrypt.encryptPassword(user.password);
    console.log(user)
    //console.log(context.cookie)
    await user.save();

    const token = auth.createJWTToken({
      _id: user._id,
      email: user.email,
      role: "basico"
    });
   context.res.cookie("secureCookie", token, {
    httpOnly: true, 
    expires: new Date(new Date().getTime() + 5 * 140000000),
  });
  },
};

const login = {
  type: GraphQLString,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new Error("Invalid Username");

    const validPassword = await bcrypt.comparePassword(password, user.password);

    if (!validPassword) throw new Error("Invalid Password");

    const token = auth.createJWTToken({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
    });

    return token;
  },
};

const createPost = {
  type: PostType,
  description: "create a new blog post",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
    });

    return post.save();
  },
};

const updatePost = {
  type: PostType,
  description: "update a blog post",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, title, body }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const postUpdated = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUpdated) throw new Error("No post for given id");

    return postUpdated;
  },
};

const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args, { verifiedUser }) {
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    });
    if (!postDeleted)
      throw new Error("No post with given ID Found for the author");

    return "Post deleted";
  },
};


module.exports = {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
};
