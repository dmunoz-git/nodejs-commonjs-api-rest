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
 *           example:
 *              title: The Grapes of Wrath
 *              isbn: 978-0-8041-3778-5
 *              description: A book about the Grapes of Wrath
 *              author: John Steinbeck
 */

/**
 * @swagger
 *   tags:
 *    name: Book
 *    description: Book routes
 */

/**
 * @swagger
 * /books:
 *  post:
 *   tags: [Book]
 *   summary: Create a book
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      description: Access token
 *   requestBody:
 *    description: Book object
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Book'
 *   responses:
 *    201:
 *     description: Return the created book
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.post("/", authMiddle.verifyAuth, bookCtrl.createBook);

/**
 * @swagger
 * /books/{isbn}:
 *  get:
 *   tags: [Book]
 *   summary: Get a book
 *   parameters:
 *    - in: path
 *      name: isbn
 *   responses:
 *    201:
 *     description: Return the created book
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Book'
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 */
router.get("/:isbn", bookCtrl.getBook);

/**
 * @swagger
 * /books:
 *  get:
 *   tags: [Book]
 *   summary: Get a book list
 *   responses:
 *    201:
 *     description: Return the book list
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 */
router.get("/", bookCtrl.listBooks);

/**
 * @swagger
 * /books/{ibsn}:
 *  put:
 *   tags: [Book]
 *   summary: Update a book
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: header
 *      name: Authorization
 *    - in: path
 *      name: isbn
 *   responses:
 *    201:
 *     description: Return the updated book
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 */
router.put("/:isbn", authMiddle.verifyAuth, bookCtrl.updateBook);

/**
 * @swagger
 * /books/{ibsn}:
 *  delete:
 *   tags: [Book]
 *   summary: Delete a book
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: header
 *      name: Authorization
 *    - in: path
 *      name: isbn
 *   responses:
 *    201:
 *     description: Return the deleted book
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 */
router.delete("/:isbn", authMiddle.verifyAuth, bookCtrl.deleteBook);

module.exports = router;
