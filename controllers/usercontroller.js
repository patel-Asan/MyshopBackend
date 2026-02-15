const User = require("../models/user");
const bcrypt = require("bcrypt");
 
// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields required" });
 
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists)
      return res.status(400).json({ message: "User/email exists" });
 
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
 
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });
 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });
 
    res.json({ message: "Login successful", token: "dummy-token", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// CART CONTROLLERS
exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.addToCart = async (req, res) => {
  try {
    const { email, product } = req.body;
    if (!email || !product) return res.status(400).json({ message: "Email and product required" });
 
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
 
    const idx = user.cart.findIndex((i) => i.id == product.id); // type safe
    if (idx > -1) user.cart[idx].quantity += 1;
    else user.cart.push({ ...product, quantity: 1 });
 
    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.removeFromCart = async (req, res) => {
  try {
    const { email, productId } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
 
    user.cart = user.cart.filter((item) => item.id != productId);
    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// FAVOURITES CONTROLLERS
exports.getFavourites = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.addToFavourites = async (req, res) => {
  try {
    const { email, product } = req.body;
    if (!email || !product) return res.status(400).json({ message: "Email and product required" });
 
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
 
    const exists = user.favourites.find((item) => item.id == product.id); // type safe
    if (!exists) {
      user.favourites.push({ ...product }); // no quantity needed
      await user.save();
    }
 
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.removeFromFavourites = async (req, res) => {
  try {
    const { email, productId } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
 
    user.favourites = user.favourites.filter((item) => item.id != productId);
    await user.save();
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}; 
 