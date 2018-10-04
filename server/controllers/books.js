const Book = require("../models").Book;

module.exports = {
    create(req, res) {
        console.log(req);
        return res.status(201).send("Successfully sent data")
    },
    // should be able to set params for available books or borrowed books
    async getAllBooks(req,res) {
        console.log(req);
        return res.status(200).send("Successfully retrieved all books")
    },
    async fetchBook(req,res) {
        console.log(req);
        return res.status(200).send("Successfully retrieved single book")
    },
    async updateBook(req, res) {
        console.log(req);
        return res.status(200).send("Successfully updated book")
    },
    async deleteBook(req,res) {
        console.log(req);
        return res.status(200).send("Successfully deleted book")
    }
};