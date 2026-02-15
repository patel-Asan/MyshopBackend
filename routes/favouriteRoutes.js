const express = require("express");
const router = express.Router();
const {
  getFavourites,
  addToFavourites,
  removeFromFavourites,
} = require("../controllers/usercontroller");
 
// Get favourites
router.get("/:email", getFavourites);
 
// Add favourite
router.post("/add", addToFavourites);
 
// Remove favourite
router.post("/remove", removeFromFavourites);
 
module.exports = router;
 