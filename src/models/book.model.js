const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    isbn: {
        type: String,
        unique: true,
    },
    image: String,
});

module.exports = mongoose.model("Book", bookSchema);
