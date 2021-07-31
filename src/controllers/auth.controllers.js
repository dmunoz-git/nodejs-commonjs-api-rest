const User = require("../models/user.model");

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
                        res.status(201).send({ message: "You're log it!" });
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
module.exports = { signUp, signIn };
