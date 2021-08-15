/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const config = require("./config");

// App
const app = express();

// DB connection
mongoose
    .connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connection to database succesfully");
    })
    .catch((err) => {
        console.error("Database connection returned error: ", err.message);
    });
// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utils
app.use(morgan("dev"));

// Route prefixes
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// App running
const port = config.nodePort;

// eslint-disable-next-line consistent-return
const server = app.listen(port, (err) => {
    if (err) return console.log("Error on server init: ", err.message);
    console.log(`Server running on port ${port}`);
});

module.exports = {
    app,
    server,
};
