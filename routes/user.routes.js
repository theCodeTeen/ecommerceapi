const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');

router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);

router.route("/").get(UserController.isLoggedIn,UserController.getUserProfile);


module.exports = router;
