module.exports = {
    nodePort: process.env.PORT || 3000,
    mongoURL: process.env.MONGODB_TEST || process.env.MONGODB_DEV || "mongodb://mongodb:27017/api-books",
    auth: {
        accessTokenKey: process.env.ACCESS_TOKEN_KEY || "secret",
        refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "secret2",
        accesTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "24h",
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
            components: {
                securitySchemes: {
                    TokenHeader: {
                        type: "apiKey",
                        in: "header",
                        name: "Authorization",
                        description: "Authentification token. Add your token directly in the request header.",
                    },
                },
            },
        },

        apis: ["./routes/*.js"],
    },
};
