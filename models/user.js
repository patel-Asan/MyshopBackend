
const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  img: String,
  quantity: { type: Number, default: 1 },
});
 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
  cart: [productSchema],
  favourites: [productSchema], // favourites array
});
 
module.exports = mongoose.model("User", userSchema);
