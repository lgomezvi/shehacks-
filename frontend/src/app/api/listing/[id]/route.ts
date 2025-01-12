import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing';
import { Types } from 'mongoose';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // Ensure id parameter is available
        const resolvedParams = await params;

        if (!resolvedParams?.id) {
            return NextResponse.json(
                { error: 'Listing ID is required' },
                { status: 400 }
            );
        }

        // Validate if the ID is a valid MongoDB ObjectId
        if (!Types.ObjectId.isValid(resolvedParams.id)) {
            return NextResponse.json(
                { error: 'Invalid listing ID format' },
                { status: 400 }
            );
        }

        // Find the listing by ID
        const listing = await Listing.findById(resolvedParams.id).lean();

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
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const resolvedParams = await params;

        if (!resolvedParams?.id || !Types.ObjectId.isValid(resolvedParams.id)) {
            return NextResponse.json(
                { error: 'Invalid listing ID' },
                { status: 400 }
            );
        }

        const listing = await Listing.findByIdAndUpdate(
            resolvedParams.id,
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
