const express = require("express");
const authCtrl = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", authCtrl.signUp);

router.post("/signin", authCtrl.signIn);

router.post("/refresh", authCtrl.refreshAccessToken);
module.exports = router;
