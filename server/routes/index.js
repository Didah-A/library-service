const BooksController = require("../controllers").Book;

// create routes for the library service
module.exports = (app) => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Home Page"
    }));

    app.post("/api/v1/books", BooksController.create);

    app.get("/api/v1/books", BooksController.getAllBooks);

    app.delete("/api/v1/books", BooksController.deleteAllBooks);

    app.get("/api/v1/overdue", BooksController.getOverdueBooks);

    app.put("/api/v1/books/:bookId", BooksController.updateBook);

    app.get("/api/v1/books/:bookId", BooksController.fetchBook);

    app.delete("/api/v1/books/:bookId", BooksController.deleteBook);

    app.put("/api/v1/books/:bookId/borrow", BooksController.borrowBook);

    app.put("/api/v1/books/:bookId/return", BooksController.returnBook);
};