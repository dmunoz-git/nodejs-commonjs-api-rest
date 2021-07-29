const express = require("express");
const userCtrl = require("../controllers/user.controllers");

const router = express.Router();

router.put("", userCtrl.updateUser);

router.delete("", userCtrl.deleteUser);

module.exports = router;
