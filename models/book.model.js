/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) =>
                new Promise((resolve) => {
                    resolve(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(v));
                }),
        },
    },
    addedBy: String,
});

bookSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("Book", bookSchema);
