// models/User.ts

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String, // file for img look it up 
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // add more fields here

}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);