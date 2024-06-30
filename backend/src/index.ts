

import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB, disconnectFromMongoDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect to MongoDB
connectToMongoDB();

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down server...');
  server.close(async () => {
    await disconnectFromMongoDB();
    console.log('Server and MongoDB connection closed');
    process.exit(0);
  });
};

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
