const express = require("express");
const bookCtrl = require("../controllers/books.controllers");

const router = express.Router();

// Route 'books/new' with POST method
router.post("/", bookCtrl.createBook);

// Route 'books/xxxx-xxxx-xxxx with GET method'
router.get("/:isbn", bookCtrl.getBook);

// Route 'books' with GET method
router.get("/", bookCtrl.listBooks);

// Route 'books/xxxx-xxxx-xxxx' with PUT method
router.put("/:isbn", bookCtrl.updateBook);

// Route 'books/xxxx-xxxx-xxxx' with DELETE method
router.delete("/:isbn", bookCtrl.deleteBook);

module.exports = router;
