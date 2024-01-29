// cartRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const CartModel = require('../Model/cart');

const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });


// Route to get all items in the cart
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all items in the cart for a specific user
router.get('/cart/:userId', async (req, res) => {
  try {
    const cartItems = await CartModel.find({ user: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add an item to the cart
// cartRoutes.js

// Route to add an item to the cart or update the quantity if the item already exists
router.post('/cartadd', upload.single('image'), async (req, res) => {
  const { user, bookid, quantity } = req.body;

  try {
    let cartItem = await CartModel.findOne({ user, bookid });

    if (cartItem) {
      // If the item already exists in the cart, update the quantity
      cartItem.quantity += parseInt(quantity);
    } else {
      // If the item is not in the cart, create a new cart item
      cartItem = new CartModel({
        user,
        bookid,
        quantity,
        bname: req.body.bname,
        price: req.body.price,
        author: req.body.author,
        genre: req.body.genre,
        image: req.file ? req.file.buffer : undefined,
      });
    }

    const updatedCartItem = await cartItem.save();
    res.status(201).json(updatedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Route to update an item in the cart
router.patch('/cart/:id', async (req, res) => {
  try {
    const updatedCartItem = await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an item from the cart
router.delete('/cart/:id', async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted from the cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
