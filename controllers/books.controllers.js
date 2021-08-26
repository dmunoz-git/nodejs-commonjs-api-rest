const mongoose = require("mongoose");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const createBook = (req, res) => {
    Book.findOne({ isbn: req.body.isbn })
        .then((book) => {
            if (book) {
                res.status(409).send({ message: "This book already exist" });
            } else {
                const createdBook = new Book(req.body);

                User.findById(res.locals.userId).then((user) => {
                    createdBook.addedBy = res.locals.userId;

                    createdBook
                        .save()
                        .then((newBook) => {
                            user.books.push(createdBook);
                            user.save();
                            res.status(201).send(newBook);
                        })
                        .catch((error) =>
                            error instanceof mongoose.Error.ValidationError
                                ? res.status(400).send({ message: "Bad body format" })
                                : res.status(500).send({ message: "Internal error server" })
                        );
                });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const getBook = (req, res) => {
    Book.findOne({ isbn: req.params.isbn })
        .then((book) => {
            if (book) {
                res.status(201).send(book);
            } else {
                res.status(404).send({ message: "Book not found" });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const listBooks = (req, res) => {
    Book.find()
        .then((books) => {
            if (books.length > 0) {
                res.status(201).send(books);
            } else {
                res.status(404).send({
                    message: "There is no books",
                });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const updateBook = (req, res) => {
    Book.updateOne({ isbn: req.params.isbn }, req.body)
        .then((book) => {
            if (book) {
                res.status(201).send(book);
            } else {
                res.status(404).send({ message: "Book not found" });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const deleteBook = (req, res) => {
    Book.deleteOne({ isbn: req.params.isbn })
        .then(() => {
            res.status(201).send({ message: "The book was deleted" });
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

module.exports = {
    createBook,
    getBook,
    listBooks,
    updateBook,
    deleteBook,
};
