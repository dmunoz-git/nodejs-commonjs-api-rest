const express = require("express");
const authCtrl = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", authCtrl.signUp);

router.post("/signin", authCtrl.signIn);

module.exports = router;
