const { User, Category, Food } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // cart and wish schema are sub-docs adhere to user model/ don't need to populate
    me: async (parent, args, context) => {
      console.log("resolver: ME (context.user)", context.user);
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id });
          console.log(userData);
          return userData;
        } catch (err) {
          console.log(err);
        }
      } else {
        throw AuthenticationError;
      }
    },
    allUsers: async (parent, args) => {
      console.log("resolver: query all users");
      try {
        const users = await User.find().populate("cart");
        console.log(users);
        return users;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
    allCategory: async (parent, args) => {
      console.log("resolver: query all categories");
      try {
        const categories = await Category.find({});
        return categories;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
    allFood: async (parent, args) => {
      console.log("resolver: query all food");
      try {
        const food = await Food.find().populate("category");
        return food;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
    allPizza: async (parent, args) => {
      console.log("resolver: query all Pizza");
      try {
        const category = await Category.findOne({categoryName:"pizza"})
        console.log("Category", category)
        console.log("Category._id", category._id)
        const food = await Food.find({category: category._id}).populate("category");
        console.log("data return in resolver: ",food)
        return food;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
    allSideOrder: async (parent, args) => {
      console.log("resolver: query all Side orders");
      try {
        const category = await Category.findOne({categoryName:"side orders"})
        const food = await Food.find({category:category._id}).populate("category");
        return food;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
    allBeverage: async (parent, args) => {
      console.log("resolver: query all beverages");
      try {
        const category = await Category.findOne({categoryName:"beverage"})
        const food = await Food.find({category:category._id}).populate("category");
        return food;
      } catch (error) {
        console.log(error);
        console.log("something went wrong with the query");
      }
    },
  },
  Mutation: {
    // change username to firstName and lastName
    createUser: async (parent, { firstName, lastName, email, password }) => {
      console.log("resolver:createUser", {
        firstName,
        lastName,
        email,
        password,
      });
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
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

    saveToCart: async (parent, { foodName, price }, context) => {
      console.log("hitting resolver saveToCart: (context.user) ", context.user)
      console.log("hitting resolver saveToCart: ({foodName}) ", foodName)
      if (context.user) {
        const food = await Food.findOne({ foodName: foodName });
        if (!food) {
          return console.log(
            "no food with this foodName is found in database!"
          );
        }
        console.log("food: ",food)
        const addToCart = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { cart: { food:foodName, price:price }  } },
          { new: true }
        );
        console.log("newUser cart ",addToCart)
        return addToCart;
      } else {
        throw AuthenticationError;
      }
    },

    deleteFromCart: async (parent, { foodName }, context) => {
      if (context.user) {
        const deleteItem = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { cart: { foodName: foodName } } },
          { new: true }
        );
        return deleteItem;
      } else {
        throw AuthenticationError;
      }
    },
    // optional
    saveToWishlist: async (parent, args, context) => {
      if (context.user) {
        const addToWishlist = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { cart } },
          { new: true }
        );
        return addToWishlist;
      } else {
        throw AuthenticationError;
      }
    },
    // optional
    deleteFromWishlist: async (parent, { foodName }, context) => {
      if (context.user) {
        const deleteItem = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { cart: { foodName: foodName } } },
          { new: true }
        );
        return deleteItem;
      } else {
        throw AuthenticationError;
      }
    },
  },
};
// in the checkout page: move the item from cart to wishlist
// optional mutation 1 :
// findAndUpdate then pull from User [cart] and add to [wishlist]
// optional mutation 2 :
// findAndUpdate then pull from User [wishlist] and add to [cart]

module.exports = resolvers;
