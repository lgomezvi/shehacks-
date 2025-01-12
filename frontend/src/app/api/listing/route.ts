import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing'; // Import the Listing model
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body as JSON
    const body = await request.json();

    // Destructure the incoming data
    const { email, category, product, price, description, image, location, availability } = body;

    // Check if all required fields are provided
    if (!email || !category || !product || !price || !description || !image || !location || !availability) {
      return NextResponse.json(
        { error: 'All fields are required.' },
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
      availability: 'Available', // Set the default availability
    });

    // Return success response with the newly created listing
    return NextResponse.json({
      message: 'Listing created successfully!',
      listing: newListing,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all listings from the database
    const listings = await Listing.find({}); // Fetch all documents in the `Listing` collection

    // Return the listings as a JSON response
    return NextResponse.json(listings, { status: 200 });
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
