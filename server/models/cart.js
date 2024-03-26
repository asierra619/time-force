const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  food: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ,
  price:{
    type: Number,
    required: true
  }
});

//const Cart = model('Cart', cartSchema);

module.exports = cartSchema;
