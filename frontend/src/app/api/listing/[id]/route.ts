import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing';
import { Types } from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Ensure id parameter is available and await it
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    // Validate using resolved id
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid listing ID format' },
        { status: 400 }
      );
    }

    // Use resolved id for database query
    const listing = await Listing.findById(id).lean();

    // If no listing is found, return 404
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      listing
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
      
      // Await params here as well
      const resolvedParams = await params;
      const id = resolvedParams.id;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: 'Invalid listing ID' },
          { status: 400 }
        );
      }
  
      const listing = await Listing.findByIdAndUpdate(
        id,
        { 
          sold: true,
          status: 'Sold'
        },
        { new: true }
      );
  
      if (!listing) {
        return NextResponse.json(
          { error: 'Listing not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ listing });
    } catch (error) {
      console.error('Error updating listing:', error);
      return NextResponse.json(
        { error: 'Failed to update listing' },
        { status: 500 }
      );
    }
  }
  