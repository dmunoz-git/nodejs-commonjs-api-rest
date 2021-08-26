const User = require("../models/user.model");

const updateUser = (req, res) => {
    User.updateOne({ email: req.body.email })
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => res.status(500).send({ message: "Internal server error" }));
};

const deleteUser = (req, res) => {
    User.removeOne({ email: req.body.email })
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => res.status(500).send({ message: "Internal server error" }));
};

module.exports = {
    updateUser,
    deleteUser,
};
