const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ CORS (Allow Netlify frontend)
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite local
    "https://myshopfront.netlify.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/", userRoutes);

// ✅ Use Render Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
