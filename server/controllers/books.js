const Book = require("../models").Book;
const addDays = require("../Helpers/dateSum");

module.exports = {
    async create(req, res) {
        try {
            const book = new Book({
                name: req.body.name,
                author: req.body.author,
                publication_year: req.body.publication_year,
                num_of_pages: req.body.num_of_pages,
                return_date: req.body.return_date,
                available: true,
                overdue: false,
                borrowers: []
            });
            const result = await book.save();
            return res.status(201).send({
                message: "Book Successfully created",
                book: result
            });
        } catch(error) {
            return res.status(400).send({
                message: "Oops Something went wrong",
                Error:error
            });
        }
    },
    // should be able to set params for available books or borrowed books
    async getAllBooks(req,res) {
        try {
            const books = await Book.find(req.query);
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
    },
    async fetchBook(req,res) {
        try {
            const book = await Book.find({ _id: req.params.bookId});
            return res.status(200).send(book);
        } catch(error) {
            return res.status(404).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
    },
    async updateBook(req, res) {
        try {
            const book = await Book.findById(req.params.bookId);
            if (!book) return res.status(404).send({
                mesage: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
            });
            const { publication_year, num_of_pages } = req.body;
            book.set({
                publication_year: publication_year,
                num_of_pages: num_of_pages
            });
            const response = await book.save();
            return res.status(200).send({
                message: "Successfully updated book",
                book: response 
            });
        } catch(error) {
            return res.status(400).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
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
        try {
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
        } catch(error) {
            return res.status(400).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
    },
    async returnBook(req, res) {
        try {
            const book = await Book.findById(req.params.bookId);
            if (!book || book.available) return res.status(404).send({
                mesage: `Sorry Book with Id ${req.params.bookId} is Unavailable for Return`,
            });
            let overdueMessage = "";
            if( new Date() > Date.parse(book.return_date)) {
                book.overdue = true;
                console.log("hahahahahahah")
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
        } catch(error) {
            return res.status(400).send({
                message: `Sorry Book with Id ${req.params.bookId} is Unavailable`,
                Error: error
            });
        }
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