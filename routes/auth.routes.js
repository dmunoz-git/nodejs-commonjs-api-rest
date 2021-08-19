const express = require("express");
const authCtrl = require("../controllers/auth.controllers");

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
 *    name: Auth
 *    description: Authentication routes
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *    summary: Create a new user
 *    tags: [Auth]
 *    requestBody:
 *     description: A user object
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *
 *    responses:
 *      '201':
 *        description: If successful, returns the new user
 *      '400':
 *        description: User already exists or invalid input
 *      '500':
 *        description: Internal server error
 *
 */
router.post("/signup", authCtrl.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *    summary: Sign in a user
 *    tags: [Auth]
 *    requestBody:
 *     description: Pass the user's credentials
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *
 *    responses:
 *      '201':
 *        description: If successful, returns the new user
 *      '400':
 *        description: User already exists or invalid input
 *      '500':
 *        description: Internal server error
 *
 */
router.post("/signin", authCtrl.signIn);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *    summary: Refresh a user's token
 *    tags: [Auth]
 *    requestBody:
 *     description: Refresh token is needed
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *
 *    responses:
 *      '201':
 *        description: If successful, returns the new user
 *      '400':
 *        description: User already exists or invalid input
 *      '500':
 *        description: Internal server error
 *
 */
router.post("/refresh", authCtrl.refreshAccessToken);
module.exports = router;
