/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    isbn: {
        type: Number,
        unique: true,
        minLength: 10,
        maxLength: 13,
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
