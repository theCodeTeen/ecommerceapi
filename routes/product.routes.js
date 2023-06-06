const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const ProductController = require('../controllers/product.controller.js');

router.route("/")
.post(UserController.isLoggedIn,UserController.isAuthorized("admin"),ProductController.postProduct)
.get(ProductController.getAllProduct);

router.route("/:id")
.get(ProductController.getProductById)
.patch(ProductController.updateProduct)
.delete(ProductController.deleteProduct);

module.exports = router;