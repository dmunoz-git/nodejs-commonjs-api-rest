const User = require("../models/user.model");

const updateUser = (req, res) => {
    User.updateOne({ isbn: req.body.isbn })
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => res.status(500).send({ message: "Internal server error" }));
};

const deleteUser = (req, res) => {
    User.removeOne({ isbn: req.body.isbn })
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => res.status(500).send({ message: "Internal server error" }));
};

module.exports = {
    updateUser,
    deleteUser,
};
