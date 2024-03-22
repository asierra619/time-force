const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ]
});

//const Cart = model('Cart', cartSchema);

module.exports = cartSchema;
