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

module.exports = { signUp };
