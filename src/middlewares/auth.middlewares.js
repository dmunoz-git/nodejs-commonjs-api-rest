const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, config.auth.access.secret, (err, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(401).send({ message: "The token is expired or invalid" });
            }
        });
    } else {
        res.status(401).send({ message: "User not authorizated" });
    }
};

module.exports = { verifyAuth };
