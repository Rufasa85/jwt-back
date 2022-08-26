const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require("../models")
const userController = require("./userController")
const iconController = require("./iconController")

router.use("/users",userController)
router.use("/icons",iconController)

module.exports = router;