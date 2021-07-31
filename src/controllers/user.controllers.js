const User = require("../models/user.model");

const createUser = (req, res) => {
    User.findOne({ email: req.body.mail }).then((user) => {
        if (user) {
            const user = new User(req.body);
            res.status.status(201).send(user);
        }
    });
};

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

const getUsers = (req, res) => {
    User.find({}).then((users) => {
        if (users.lenght > 0) {
            res.status(201).send(users);
        } else {
            res.status(404).send({ message: "there is not users" });
        }
    });
};

module.exports = {
    updateUser,
    deleteUser,
};
