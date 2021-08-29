require("dotenv").config();

module.exports = {
    nodePort: process.env.PORT || 3000,
    mongoURL: process.env.NODE_ENV === "test" ? process.env.MONGO_URL_TEST : process.env.MONGO_URL_DEV,
    auth: {
        accessTokenKey: process.env.ACCESS_TOKEN_KEY || "secret",
        refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "secret2",
        accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },

    swaggerSpecs: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Book",
                version: "1.0.0",
                description: "A simple express book complete API Rest",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },

        apis: ["./routes/*.js"],
    },
};
