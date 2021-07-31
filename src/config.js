module.exports = {
    nodePort: process.env.PORT || 3000,

    database: {
        mongoURL: process.env.MONGODB_TEST || process.env.MONGODB_DEV || "mongodb://localhost:27017/api-books",
    },
};
