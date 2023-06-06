const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const CategoryController = require('../controllers/category.controller.js');

router.route("/")
.post(UserController.isLoggedIn,UserController.isAuthorized("admin"),CategoryController.postCategory)
.get(CategoryController.getAllCategory);

router.route("/:id")
.get(CategoryController.getCategoryById)
.patch(CategoryController.updateCategory)
.delete(CategoryController.deleteCategory);

module.exports = router;