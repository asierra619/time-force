const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }
});

const Food = model('Food', foodSchema);

module.exports = Food;
