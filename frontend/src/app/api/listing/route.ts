import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing'; // Import Listing model (not User)
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body as JSON
    const body = await request.json();

    // Destructure the incoming data
    const { email, category, product, price, description, image, location } = body;

    // Check if all required fields are provided
    if (!email || !category || !product || !price || !description || !image || !location) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // You can add additional validation for fields if needed
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number.' },
        { status: 400 }
      );
    }

    // Create a new listing
    const newListing = await Listing.create({
      email,
      category,
      product,
      price,
      description,
      image,
      location,
    });

    // Return success response with the newly created listing
    return NextResponse.json({
      message: 'Listing created successfully!',
      listing: newListing,
    });
  } catch (error: any) {
    // Catch all errors and log them for better debugging
    console.error(error);

    // Return an appropriate error message to the client
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
