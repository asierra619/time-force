const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const cartSchema = require("./cart");
const wishlistSchema = require("./wishlist");

const formatDate = require('../utils/Date-Format');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Please enter a valid email address.",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Please enter a valid password.",
    ],
  }, // matching [a-zA-Z0-9!@#$%^&*]{6,16}
  createdAt: {
    type: String,
    default: formatDate()
  },
  timeStamp:{
    type: Date,
    default :Date.now()
  },

  cart: [cartSchema],
  wishlist: [wishlistSchema],
},
{
  toJSON: {
    virtuals: true,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = model("User", userSchema);

module.exports = User;
