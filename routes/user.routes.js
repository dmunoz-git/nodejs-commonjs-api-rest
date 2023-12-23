const express = require("express");
const userCtrl = require("../controllers/user.controllers");
const authMiddle = require("../middlewares/auth.middlewares");

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
 *             password: JhonDoe45!
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
 *  get:
 *   tags: [User]
 *   summary: Get user details
 *   security:
 *    - TokenHeader: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       description: User unique identifier
 *   responses:
 *    201:
 *     description: Return the user with the modified fields
 *    404:
 *     description: User not found
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.get("/:idUser", userCtrl.getUser);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *   tags: [User]
 *   summary: Update user
 *   security:
 *    - TokenHeader: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       description: User unique identifier
 *   responses:
 *    201:
 *     description: Return the user with the modified fields
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.put("/:idUser", authMiddle.verifyAuth, userCtrl.updateUser);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   tags: [User]
 *   summary: Delete user
 *   security:
 *    - TokenHeader: []
 *   parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *      description: User unique identifier
 *   responses:
 *    201:
 *     description: User removed
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.delete("/:idDelete", authMiddle.verifyAuth, userCtrl.deleteUser);

module.exports = router;
