// lib/mongodb.ts
import mongoose from 'mongoose';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI; // access the environment variable

export async function connectDB() {
  try {

if (!uri) {
    throw new Error('Add Mongo URI to .env.local');
  }
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }
    return await mongoose.connect(uri);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}