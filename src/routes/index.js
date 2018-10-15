/*
    Routes declarations module
    Book Validations module is used to validate the input from the user.
*/
const { errors } = require("celebrate");
const BooksController = require("../controllers").Book;
const { 
    createValidator, 
    updateValidator,
    returnBookValidator, 
    borrowBookValidator, 
    getBookValidator, 
    getAllBooksValidator 
}  = require("../validators/bookValidations");

module.exports = (app) => {
    app.get("/", (req, res) => res.status(200).send({
        message: "Welcome to the Home Page"
    }));

    app.post("/api/v1/books", createValidator, BooksController.create);

    app.get("/api/v1/books", getAllBooksValidator, BooksController.getAllBooks);

    app.delete("/api/v1/books", BooksController.deleteAllBooks);

    app.get("/api/v1/overdue", BooksController.getOverdueBooks);

    app.put("/api/v1/books/:bookId", updateValidator, BooksController.updateBook);

    app.get("/api/v1/books/:bookId", getBookValidator, BooksController.fetchBook);

    app.delete("/api/v1/books/:bookId", BooksController.deleteBook);

    app.put("/api/v1/books/:bookId/borrow", borrowBookValidator, BooksController.borrowBook);

    app.put("/api/v1/books/:bookId/return", returnBookValidator, BooksController.returnBook);

    app.get("*", (req, res) => res.status(404).send({
        message: "Welcome to The Library API, Please Enter a valid Endpoint"
    }));
};