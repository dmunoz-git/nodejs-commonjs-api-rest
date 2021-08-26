const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const config = require("../config");

const signUp = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(400).send({ message: "User already exists" });
        } else {
            const userNew = new User(req.body);
            userNew
                .save()
                .then((savedUser) => {
                    res.status(201).send(savedUser);
                })
                .catch((err) =>
                    err instanceof mongoose.Error.ValidationError
                        ? res.status(400).send({ message: "Bad body format" })
                        : res.status(500).send({ message: "Internal server error" })
                );
        }
    });
};

const signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                User.comparePassword(req.body.password, user.password).then((match) => {
                    if (match) {
                        const refreshToken = jwt.sign({ id: user._id }, config.auth.refreshTokenKey, {
                            expiresIn: config.auth.refreshTokenExpiresIn,
                        });

                        const accessToken = jwt.sign({ id: user._id }, config.auth.accessTokenKey, {
                            expiresIn: config.auth.accesTokenExpiresIn,
                        });

                        res.status(201).send({ refreshToken, accessToken });
                    } else {
                        res.status(401).send({ message: "User not authorizated" });
                    }
                });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        })
        .catch(() => res.status(500).send({ message: "Internal server error" }));
};

const refreshAccessToken = (req, res) => {
    if (req.body.refreshToken) {
        jwt.verify(req.body.refreshToken, config.auth.refreshTokenKey, (err, decoded) => {
            if (decoded) {
                const accessToken = jwt.sign({ id: decoded.id }, config.auth.accessTokenKey, {
                    expiresIn: config.auth.accesTokenExpiresIn,
                });
                res.status(201).send({ accessToken });
            } else {
                res.status(400).send({ message: "The token is not valid or is expired" });
            }
        });
    }
};
module.exports = { signUp, signIn, refreshAccessToken };
