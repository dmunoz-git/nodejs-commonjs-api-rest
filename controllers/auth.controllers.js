const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(409).send({ message: "User already exists" });
        } else {
            const userNew = new User(req.body);
            userNew
                .save()
                .then((savedUser) => {
                    res.status(201).send(savedUser);
                })
                .then(() => res.status(500).send({ message: "User already exists" }));
        }
    });
};

const signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                User.comparePassword(req.body.password, user.password).then((match) => {
                    if (match) {
                        const refreshToken = jwt.sign({ email: user.email }, config.auth.refreshTokenKey, {
                            expiresIn: config.auth.refreshTokenExpiresIn,
                        });

                        const accessToken = jwt.sign({}, config.auth.accessTokenKey, {
                            expiresIn: config.auth.accesTokenExpiresIn,
                        });

                        res.status(201).send({ refreshToken: refreshToken, accesToken: accessToken });
                    } else {
                        res.status(401).send({ message: "User not authorizated" });
                    }
                });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        })
        .catch((error) => {
            res.status(500).send({ message: "Internal server error" }), console.log(error);
        });
};

const refreshAccessToken = (req, res) => {
    if (req.body.refreshToken) {
        jwt.verify(req.body.refreshToken, config.auth.refreshTokenKey, (err, decoded) => {
            if (decoded) {
                const accessToken = jwt.sign({}, config.auth.accessTokenKey, {
                    expiresIn: config.auth.accesTokenExpiresIn,
                });
                res.status(201).send({ accessToken: accessToken });
            } else {
                res.status(400).send({ message: "The token is not valid or is expired" });
            }
        });
    }
};
module.exports = { signUp, signIn, refreshAccessToken };
