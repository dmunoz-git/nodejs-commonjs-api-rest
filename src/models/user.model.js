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

// eslint-disable-next-line consistent-return
userSchema.pre("save", (next) => {
    if (!this.isModifified("password")) return next();

    try {
        bcrypt.genSalt(10).then((salts) => {
            bcrypt.hash(this.password, salts).then((cipheredPass) => {
                this.password = cipheredPass;
                next();
            });
        });
    } catch (err) {
        return next(err);
    }
});

userSchema.statics.comparePassword = (password) => bcrypt.compare(password, this.password);
