import { connect, disconnect } from 'mongoose';

async function connectToMongoDB() {
  try {
    await connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

async function disconnectFromMongoDB() {
  try {
    await disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw new Error('Failed to disconnect from MongoDB');
  }
}

export { connectToMongoDB, disconnectFromMongoDB };
