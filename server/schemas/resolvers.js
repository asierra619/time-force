const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


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
    // change username to firstName and lastName
    createUser: async (parent, { firstName, lastName, email, password }) => {
      console.log("resolver:createUser", { firstName, lastName, email, password });
      const newUser = await User.create({ firstName, lastName, email, password });
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

    saveToCart: async (parent, args, context) => {
        if (context.user) {
          const addToCart = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: {cart} },
            { new: true }
          );
          return addToCart;
        } else {throw AuthenticationError;}
      },

    deleteFromCart : async (parent, {foodName}, context) => {
        if (context.user) {
            const deleteItem = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: {cart: { foodName:foodName }} },
              { new: true }
            );
            return deleteItem;
          } else {throw AuthenticationError;}
          
        },

    saveToWishlist: async (parent, args, context) => {
            if (context.user) {
              const addToWishlist = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: {cart} },
                { new: true }
              );
              return addToWishlist
            } else {throw AuthenticationError;}
          },

    deleteFromWishlist : async (parent, {foodName}, context) => {
            if (context.user) {
                const deleteItem = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: {cart: { foodName:foodName }} },
                  { new: true }
                );
                return deleteItem;
              } else {throw AuthenticationError;}
            },
     },
}
// in the checkout page: move the item from cart to wishlist
// optional mutation 1 :
// findAndUpdate then pull from User [cart] and add to [wishlist]
// optional mutation 2 :
// findAndUpdate then pull from User [wishlist] and add to [cart]


module.exports = resolvers;
