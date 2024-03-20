const { Schema, model } = require('mongoose');

// Cart model {
//   _id!
//   food: [Food]
//   }

const cartSchema = new Schema({
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ]
});


//   purchaseDate: {
//  type: Date,
//  default: Date.now()
// },

//const Cart = model('Cart', cartSchema);

module.exports = cartSchema;
