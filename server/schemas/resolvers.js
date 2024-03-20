const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers ={
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('cart')
                .populate('wishlist');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
          checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
            await Order.create({ products: args.products.map(({ _id }) => _id) });
            const line_items = [];
      
            for (const product of args.products) {
              line_items.push({
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: product.name,
                    description: product.description,
                    images: [`${url}/images/${product.image}`],
                  },
                  unit_amount: product.price * 100,
                },
                quantity: product.purchaseQuantity,
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`,
            });
      
            return { session: session.id };
          },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
          updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, {
                new: true,
              });
            }
      
            throw AuthenticationError;
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
    }
}

module.exports = resolvers;