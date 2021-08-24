const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, config.auth.accessTokenKey, (err, decoded) => {
            if (decoded) {
                res.locals.userId = decoded.id;
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
