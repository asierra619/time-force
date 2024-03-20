const { Schema, model } = require('mongoose');


// category: {
//   _id!
//   categoryName: String!
//   }

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Category = model('Category', categorySchema);

module.exports = Category;
