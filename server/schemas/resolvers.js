const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("resolver: ME (context.user)", context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        console.log(userData);
        return userData;
      } else {
        throw AuthenticationError;
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      console.log("resolver:createUser", { username, email, password });
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    login: async (parent, { email, password }) => {
      console.log("resolver: login");
      console.log({ email, password });

      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      //console.log("user(data)", user);
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
  },
  saveToCart: async (parent, args, context) => {
    if (context.user) {
      const addToCart = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: {cart} },
        { new: true }
      );
    }
  },
  deleteFromCart : async (parent, {foodName}, context) => {
    if (context.user) {
        const addToCart = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: {cart: { foodName:foodName }} },
          { new: true }
        );
      }
    },
  }
},


module.exports = resolvers;
