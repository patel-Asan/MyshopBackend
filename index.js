const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://myshopfront.netlify.app"
];

// ✅ Better CORS Handling
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman & server-to-server

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.use("/", userRoutes);

// ✅ Health Check Route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ✅ Use Render Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
