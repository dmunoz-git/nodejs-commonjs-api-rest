const express = require("express");
const userCtrl = require("../controllers/user.controllers");

const router = express.Router();

/**
 * @swagger
 *  components:
 *     schemas:
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int64
 *               description: unique identifier
 *             name:
 *              type: string
 *              description: The user's name
 *             secondName:
 *              type: string
 *              description: The user's second name
 *             email:
 *              type: string
 *              description: The user's email
 *             password:
 *              type: string
 *              description: The user's password
 *           example:
 *             name: John
 *             secondName: Doe
 *             email: jhon.doe@mail.com
 *             password: 123456
 *
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

/**
 * @swagger
 *   tags:
 *    name: User
 *    description: User routes
 */
/**
 * @swagger
 * /user/{id}:
 *  put:
 *   tags: [User]
 *   summary: Update user
 *   requestBody:
 *    description: User object
 *    content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User updated
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.put("/:idUser", userCtrl.updateUser);

router.delete("/:idDelete", userCtrl.deleteUser);

module.exports = router;
