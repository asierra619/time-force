const { Schema, model } = require('mongoose');


// category: {
//   _id!
//   categoryName: String!
//   }

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = model('category', categorySchema);

module.exports = Category;
