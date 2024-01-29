// cart.js

const mongoose = require('mongoose');
const { userModel } = require("../Model/user");

mongoose.connect("mongodb+srv://yeonak6:Alma123@cluster0.lfv1yya.mongodb.net/BookDb?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to the db");
  })
  .catch((err) => console.log(err));

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', // Reference to the User model
  },
  bookid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookModel',
  },
  bname: String,
  quantity: {
    type: Number,
    required: true,
  },
  price: Number,
  author: String,
  genre: String,
  image: Buffer
});

const CartModel = mongoose.model('cartDetails', cartSchema);

module.exports = CartModel;
