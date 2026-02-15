 
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
 
const app = express();
app.use(cors());
app.use(express.json());
 
// Connect DB
connectDB();
 
// Routes
app.use("/", userRoutes);
 
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
 
 
 