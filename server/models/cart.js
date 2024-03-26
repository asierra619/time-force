const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  foodName:{
    type:String,
  }
  ,
  price:{
    type: Number,
    required: true
  }
});

//const Cart = model('Cart', cartSchema);

module.exports = cartSchema;
