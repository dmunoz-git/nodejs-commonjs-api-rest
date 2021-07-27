const Book = require("../models/book.model");

const createBook = async (req, res) => {
    await Book.findOne({ isbn: req.body.isbn })
        .then((book) => {
            if (book) {
                res.status(409).send({ message: "This book already exist" });
            } else {
                const createdBook = new Book(req.body);
                createdBook
                    .save()
                    .then((newBook) => res.status(201).send(newBook))
                    .catch(() => res.status(500).send({ message: "Internal error server" }));
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const getBook = async (req, res) => {
    await Book.findOne({ isbn: req.params.isbn })
        .then((book) => {
            if (book) {
                res.status(201).send(book);
            } else {
                res.status(409).send({ message: "Book not found" });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const listBooks = async (req, res) => {
    await Book.find()
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

const updateBook = async (req, res) => {
    await Book.updateOne({ isbn: req.params.isbn }, req.body)
        .then((book) => {
            if (book) {
                res.status(201).send(book);
            } else {
                res.status(404).send({ message: "Book not found" });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal error server" }));
};

const deleteBook = async (req, res) => {
    await Book.deleteOne({ isbn: req.params.isbn })
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
