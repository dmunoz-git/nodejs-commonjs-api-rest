const express = require("express");
const bookCtrl = require("../controllers/books.controllers");
const authMiddle = require("../middlewares/auth.middlewares");

const router = express.Router();

/**
 * @swagger
 *  components:
 *     schemas:
 *         Book:
 *           type: object
 *           properties:
 *             id:
 *              type: integer
 *              format: int64
 *              description: unique identifier
 *             title:
 *              type: string
 *              description: The book's title
 *             isbn:
 *              type: number
 *              description: The book's isbn
 *             author:
 *              type: string
 *              description: The book's author
 */

// Route 'books/new' with POST method
router.post("/", authMiddle.verifyAuth, bookCtrl.createBook);

// Route 'books/xxxx-xxxx-xxxx with GET method'
router.get("/:isbn", bookCtrl.getBook);

// Route 'books' with GET method
router.get("/", bookCtrl.listBooks);

// Route 'books/xxxx-xxxx-xxxx' with PUT method
router.put("/:isbn", authMiddle.verifyAuth, bookCtrl.updateBook);

// Route 'books/xxxx-xxxx-xxxx' with DELETE method
router.delete("/:isbn", authMiddle.verifyAuth, bookCtrl.deleteBook);

module.exports = router;
