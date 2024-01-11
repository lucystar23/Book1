// routes.js

const express = require('express');
const router = express.Router();
const bookModel = require('../Model/book'); // Update the path based on your project structure

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await bookModel.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single book
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// POST a new book
router.post('/', async (req, res) => {
    const book = new bookModel({
        bname: req.body.bname,
        isbnn: req.body.isbnn,
        price: req.body.price,
        author: req.body.author,
        genre: req.body.genre
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a single book by ID
async function getBook(req, res, next) {
    let book;
    try {
        book = await bookModel.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}

module.exports = router;
