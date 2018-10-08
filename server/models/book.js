// import mongoose ORM schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// declare schema for books
const booksSchema = new Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    author: {
        type: String,
        require: "author is required"
    },
    publication_year: {
        type: String,
        required: "Publication year is required"
    },
    num_of_pages: {
        type: Number,
        required: 'Number of pages is required'
    },
    borrowed_date: { 
        type: String,
        default: "New Book"
    },
    return_date: { 
        type: String,
        default: "New book"
    },
    available: Boolean,
    overdue: { type: Boolean, default: false },
    borrowers: [
        {
            username: String,
            borrow_date: { type: String }
        }
    ]
});

// create books model from the books schema
const Book = mongoose.model('Book', booksSchema);

module.exports = Book;