import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body as JSON
    const body = await request.json();

    // Destructure the incoming data
    const { email, category, product, price, description, image, location, status, sold } = body;

    // Check if all required fields are provided
    if (!email || !category || !product || !price || !description || !image || !location || !status) {
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
      status,
      sold: sold || false
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
    await connectDB();
    
    const listings = await Listing.find({sold: false}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      listings,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}
