// lib/mongodb.ts
import mongoose from 'mongoose';

const uri = "mongodb+srv://lausogovi:do3mUNU7NfQtThqd@shehacks2025.iykzz.mongodb.net/";

if (!uri) {
  throw new Error('Add Mongo URI to .env.local');
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }
    return await mongoose.connect(uri);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}