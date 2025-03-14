import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

dotenv.config();  // Load environment variables

const MONGO_URI = process.env.MONGO || "mongodb+srv://nomanqadri34:U0hSWV1mHsiR7PJo@cluster1.xhpp5nd.mongodb.net/alqadri-blog";

// Debugging: Check if MongoDB URI is loading
if (!MONGO_URI) {
  console.error("❌ MONGO URI is missing! Check your .env file.");
  process.exit(1);  // Exit if no MongoDB URI is found
}

const app = express(); // ✅ Define `app` first

// Enable CORS after defining `app`

// ✅ Enable CORS with Explicit Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies & authentication
  if (req.method === "OPTIONS") {
      return res.sendStatus(200); // Preflight request response
  }
  next();
});

// ✅ Use CORS Middleware
app.use(cors({
origin: ["http://localhost:5173", "https://alqadriblog-1.onrender.com"], // Allow frontend origins
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true // Allow cookies and authentication
}));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB is connected successfully!');
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  // Exit on error
  });

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve static files from client build
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});
