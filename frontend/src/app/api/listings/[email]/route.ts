import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing';
import { Types } from 'mongoose';

interface ListingDocument {
  _id: Types.ObjectId;
  product: string;
  price: number;
  status: string;
  sold: boolean;
  createdAt: Date;
}

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    await connectDB();
    
    // Ensure params.email is available before using it
    if (!params?.email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const email = decodeURIComponent(params.email);
    const listings = await Listing.find({ email })
      .sort({ createdAt: -1 })
      .select('product price status sold createdAt')
      .lean()
      .exec() as unknown as ListingDocument[];

    const formattedListings = listings.map(listing => ({
      id: listing._id.toString(),
      title: listing.product,
      price: `$${listing.price.toFixed(2)}`,
      status: listing.status || 'Available',
      sold: listing.sold,
      createdAt: listing.createdAt
    }));

    const stats = {
      totalListings: listings.length,
      activeListings: listings.filter(l => !l.sold).length,
      soldListings: listings.filter(l => l.sold).length
    };

    const recentActivity = formattedListings
      .slice(0, 5)
      .map(listing => `Listed '${listing.title}' for sale`);

    return NextResponse.json({
      listings: formattedListings,
      recentActivity,
      stats
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
} 