const express = require("express");
const authCtrl = require("../controllers/auth.controllers");

const router = express.Router();
/**
 * @swagger
 * securitySchemes:
<<<<<<< HEAD
 *   bearerAuth:
=======
 *   TokenHeader:
>>>>>>> f2a14f9f8ec62b8a01d8cbd0be89968e6031e2be
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
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
 *        content:
 *         application/json:
 *          schema:
 *          type: object
 *          properties:
 *           name:
 *            type: string
 *           secondName:
 *            type: string
 *           email:
 *            type: string
 *          example:
 *           name: "Jhon"
 *           secondName: "Doe"
 *           email: "jhon.doe@mail.com"
<<<<<<< HEAD
 *      '409':
 *        description: If the email is already in use
=======
>>>>>>> f2a14f9f8ec62b8a01d8cbd0be89968e6031e2be
 *      '400':
 *        description: User already exists or bad request
 *      '500':
 *        description: Internal server error
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
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *        example:
 *         email: "jhon.doe@mail.com"
 *         password: "JhonDoe45!"
 *    responses:
 *      '201':
 *        description: If successful, returns the user tokens
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            refreshToken:
 *             type: string
 *            accessToken:
 *             type: string
 *          example:
 *           refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjYwNjk3OGIxNzEyMWY1YzI3MmQwMSIsImlhdCI6MTYyOTg4MjAyMCwiZXhwIjoxNjI5OTY4NDIwfQ.iDnLR6rOBfx95XMjfWqHFhwAUrRSbjkA74MxensPNys"
 *           accesToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjYwNjk3OGIxNzEyMWY1YzI3MmQwMSIsImlhdCI6MTYyOTg4MjAyMCwiZXhwIjoxNjI5ODg1NjIwfQ.bYY60CMXHAVFpbdAV4EN3cSj5b052NKGOfIvRiOB-wc"
 *
<<<<<<< HEAD
 *      '401':
 *        description: If the user credentials are incorrect
 *      '409':
 *        description: User doesn't exist
=======
 *      '400':
 *        description: User doesn't exist or bad request
>>>>>>> f2a14f9f8ec62b8a01d8cbd0be89968e6031e2be
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
 *        type: object
 *        properties:
 *         refreshToken:
 *          type: string
 *        example:
 *          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjYwNjk3OGIxNzEyMWY1YzI3MmQwMSIsImlhdCI6MTYyOTg4MjAyMCwiZXhwIjoxNjI5OTY4NDIwfQ.iDnLR6rOBfx95XMjfWqHFhwAUrRSbjkA74MxensPNys"
 *    responses:
 *      '201':
 *        description: If successful, returns the new user
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            accessToken:
 *             type: string
 *           example:
 *            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjYwNjk3OGIxNzEyMWY1YzI3MmQwMSIsImlhdCI6MTYyOTg4MjAyMCwiZXhwIjoxNjI5ODg1NjIwfQ.bYY60CMXHAVFpbdAV4EN3cSj5b052NKGOfIvRiOB-wc"
<<<<<<< HEAD
 *      '401':
 *          description: The refresh token is invalid
=======
 *      '400':
 *        description: Invalid token or bad request
>>>>>>> f2a14f9f8ec62b8a01d8cbd0be89968e6031e2be
 *      '500':
 *        description: Internal server error
 */
router.post("/refresh", authCtrl.refreshAccessToken);
module.exports = router;
