const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookModel = require('../Model/book');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

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
router.post('/', upload.single('image'), async (req, res) => {
    const book = new bookModel({
        bname: req.body.bname,
        isbnn: req.body.isbnn,
        price: req.body.price,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        image: req.file ? req.file.buffer : undefined,
    });


    try {
        const newBook = await book.save();
        res.status(201).json({ message: 'New book has been created successfully' });
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
