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

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN 
    : 'http://localhost:5173',
  credentials: true,
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
