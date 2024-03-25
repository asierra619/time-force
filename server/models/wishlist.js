const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ]
});

//const Wishlist = model('wishlist', wishlistSchema);

module.exports = wishlistSchema;
