// import mongoose ORM schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// declare model for books
const booksSchema = new Schema({
    name: String,
    author: String,
    publication_year: String,
    num_of_pages: Number,
    return_date: Date,
    available: Boolean,
    overdue: Boolean,
    borrowers: [
        {
            username: String,
            borrow_date: { type: Date, default: Date.now }
        }
    ]
});

const Book = mongoose.model('Book', booksSchema);

module.exports = Book;