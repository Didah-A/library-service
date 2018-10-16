const table = require("console.table");
const pick = require("lodash.pick");
const { connectDB } = require("../config");
const { Book } = require("../src/models")

connectDB();
/*
    Prints reports of all available books
    prints name, author, return date, borrower number and if book is available
*/
const printBooksReport = async () => {
    const books = await Book.find();
    if(!books.length > 0) {
        console.log("No books available");
    };
    const booksDetails = books.map(book => pick(book, ["name", "author", "available", "return_date", "borrowers"]));
    const report = booksDetails.map((book) => {
        book['borrowed times'] = book.borrowers.length;
        delete book.borrowers;
        book["Overdue"] = (new Date() > Date.parse(book.return_date) ? "Yes" : "No");
        book["return date"] = book.return_date;
        delete book.return_date;
        if(book.available) {
            book["return date"] = "Not available",
            book["Overdue"] = "No"
        }
        return book;
    });
    console.table(report);
}

printBooksReport();

