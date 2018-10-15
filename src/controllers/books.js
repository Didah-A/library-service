const Book = require("../models").Book;
const addDays = require("../Helpers/dateSum");

module.exports = {
    async create(req, res) {
        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            publication_year: req.body.publication_year,
            num_of_pages: req.body.num_of_pages,
            available: true,
            borrowers: []
        });
        const result = await book.save();
        return res.status(201).send({
            message: "Book Successfully created",
            book: result
        });
    },
    // should be able to set params for available books or borrowed books
    async getAllBooks(req,res) {
        const books = await Book.find(req.query);
        if(books.length === 0) return res.status(200).send({
            message: "No books available"
        });
        return res.status(200).send(books);
    },
    async fetchBook(req,res) {
        const book = await Book.find({ _id: req.params.bookId});
        return res.status(200).send(book);
    },
    async updateBook(req, res) {
        const book = await Book.findById(req.params.bookId);
        if(response.error) {
            return res.status(400).send(response.error.message);
        }
        if (!book) return res.status(404).send({
            mesage: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
        });
        const { publication_year, num_of_pages } = req.body;
        book.set({
            publication_year: publication_year,
            num_of_pages: num_of_pages
        });
        const result = await book.save();
        return res.status(200).send({
            message: "Successfully updated book",
            book: result 
        });
    },
    async deleteBook(req,res) {
        try {
            await Book.findByIdAndRemove(req.params.bookId);
            return res.status(202).send({
                message: "successfully deleted book"
            });
        } catch(error) {
            return res.status(404).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
    },
    async deleteAllBooks(req, res) {
        try {
            await Book.remove({});
            return res.status(202).send({
                message: "Successfully deleted all books" 
            });
        } catch(error) {
            return res.status(404).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
    },
    async borrowBook(req,res) {
        const book = await Book.findById(req.params.bookId);
        if (!book || !book.available) return res.status(404).send({
            mesage: `Sorry Book with Id ${req.params.bookId} is Unavailable for Borrowing`,
        });
        book.set({
            available: false,
            borrowed_date: new Date(),
            return_date: addDays(new Date(), 7)
        });
        const borrower = {
            username: req.body.borrower_name,
            borrow_date: new Date()
        };
        book.borrowers.push(borrower);
        const response = await book.save();
        return res.status(200).send({
            message: "Successfully Borrowed book",
            book: response 
        });
    },
    async returnBook(req, res) {
        const book = await Book.findById(req.params.bookId);
        if (!book || book.available) return res.status(404).send({
            mesage: `Sorry Book with Id ${req.params.bookId} is Unavailable for Return`,
        });
        let overdueMessage = "";
        if( new Date() > Date.parse(book.return_date)) {
            overdueMessage = ", NB: Kindly Pay the amount for overdue books"
        };
        book.set({
            available: true,
            return_date: "returned"
        });
        const response = await book.save();
        return res.status(200).send({
            message: `Successfully Returned book${overdueMessage}`,
            book: response 
        });
    },
    async getOverdueBooks(req, res) {
        try {
            const books = await Book.find({ return_date: {$lt: new Date()}});
            if(books.length === 0) return res.status(200).send({
                message: "No books available"
            });
            return res.status(200).send(books);
        } catch(error) {
            return res.status(400).send({
                message: "oops something went wrong",
                Error: error 
            });
        }
    }
};