const { Schema, model } = require('mongoose');

// Cart model {
//   _id!
//   food: [Food]
//   }

const cartSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now()
  },
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ]
});

//const Cart = model('Cart', cartSchema);

module.exports = cartSchema;
