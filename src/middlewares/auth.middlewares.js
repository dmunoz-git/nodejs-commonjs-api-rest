const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

// Create both tokens
const createTokens = async (req, res, next) => {
    User.findOne({email: req.body.email} || {user: req.body.nickname}).then((user) => {
        if(user){
            req.refreshToken = await jwt.sign({ user: user.nickname }, config.refreshToken.secret, {expiresIn: config.refreshToken.expires});
            req.accessToken = await jwt.sign({ user: user.nickname}, config.accessToken.secret, {expiresIn: config.accessToken.expires});

            // Pass control to the next middleware
            next();
        }else{
            res.status(404).send({message: "User not found"});
        }
    })
};

// Valid refreshToken and create acessToken
const refreshAcessToken;

// Valid access-token, return exporired access token or invalid
const validToken;
