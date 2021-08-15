module.exports = {
    nodePort: process.env.PORT || 3000,
    mongoURL: process.env.MONGODB_TEST || process.env.MONGODB_DEV || "mongodb://localhost:27017/api-books",
    auth: {
        accessTokenKey: process.env.ACCESS_TOKEN_KEY || "secret",
        refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "secret2",
        accesTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "24h",
    },
};
