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
  process.exit(1);
}

const app = express(); // ✅ Define `app` first

// ✅ Use CORS Middleware Before Any Routes
app.use(cors({
  origin: ["https://alqadriblog.vercel.app/"], // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Allow cookies and authentication
}));

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB is connected successfully!'))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// ✅ Serve Static Files in Production
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// ✅ Handle React Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});
