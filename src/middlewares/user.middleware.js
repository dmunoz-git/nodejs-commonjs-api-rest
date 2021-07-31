const User = require("../models/user.model");

const validateUserPassword = (req, res, next) => {
    User.findOne({ email: req.body.email } || { user: req.body.user })
        .then((user) => {
            if (user) {
                User.comparePassword(req.body.password, user.password).then((match) => {
                    console.log(match);
                    if (match) {
                        req.user = user;
                        next();
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

module.exports = { validateUserPassword };
