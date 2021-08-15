const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // hash the password using our new salt
    bcrypt
        .genSalt(10)
        .then((salts) => {
            bcrypt
                .hash(this.password, salts)
                .then((hash) => {
                    this.password = hash;
                    next();
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch((error) => next(error));
});

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
});

userSchema.statics.comparePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = mongoose.model("User", userSchema);
