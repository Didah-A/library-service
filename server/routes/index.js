const BooksController = require("../controllers").Book;

// create routes for the library service
module.exports = (app) => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Home Page"
    }));

    app.post("/api/v1/books", BooksController.create);

    app.get("/api/v1/books", BooksController.getAllBooks);

    app.put("/api/v1/books/:bookId", BooksController.updateBook);

    app.get("/api/v1/books/:bookId", BooksController.fetchBook);

    app.delete("/api/v1/books/:bookId", BooksController.deleteBook);

    app.put("/api/v1/:bookId/borrow", (req, res) => res.status(200).send("successfully borrowed"));

    app.put("/api/v1/:bookId/return", (req, res) => res.status(200).send("successfully borrowed"));
};