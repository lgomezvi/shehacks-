import mongoose from 'mongoose';

// Define the listing schema
const listingSchema = new mongoose.Schema({
  email: {
    type: String, // email of the user creating the listing
    required: true,
    // Optionally, you can use a regular expression to validate the email format
  },
  category: {
    type: String, // product category, e.g., "Electronics"
    required: true,
  },
  product: {
    type: String, // name of the product
    required: true,
  },
  price: {
    type: Number, // price of the product
    required: true,
    min: [0, 'Price must be a positive number'], // Ensure price is positive
  },
  description: {
    type: String, // product description
    required: true,
  },
  image: {
    type: String, // store the image URL or file path
    required: true,
  },
  location: {
    type: String, // location of the product (e.g., city, state)
    required: true,
  },
  // Add more fields here if necessary, like "tags", "status", etc.
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

// Use the model name 'Listing' and export it
export const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);