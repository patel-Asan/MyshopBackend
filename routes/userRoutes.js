 
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
 
// Auth
router.post("/register", userController.register);
router.post("/login", userController.login);
 
// Cart
router.get("/cart/:email", userController.getCart);
router.post("/cart/add", userController.addToCart);
router.post("/cart/remove", userController.removeFromCart);
 
// Favourites
router.get("/favourites/:email", userController.getFavourites);
router.post("/favourites/add", userController.addToFavourites);
router.post("/favourites/remove", userController.removeFromFavourites);
 
module.exports = router;
 