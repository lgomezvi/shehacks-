import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Mail, MapPin, Tag, Clock, AlertCircle } from 'lucide-react';

interface Listing {
  _id: string;
  email: string;
  product: string;
  price: number;
  description: string;
  image: string;
  category: string;
  status: "New" | "Used" | "Refurbished";
  location: string;
  sold: boolean;
  createdAt: string;
}

interface SellerStats {
  totalListings: number;
  activeListings: number;
  soldListings: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [sellerStats, setSellerStats] = useState<SellerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListingAndStats = async () => {
      try {
        const response = await fetch(`/api/listing/${id}`);
        if (!response.ok) throw new Error("Failed to fetch listing");
        const data = await response.json();
        setListing(data.listing);

        // Fetch seller stats
        if (data.listing.email) {
          const statsResponse = await fetch(`/api/listings/${encodeURIComponent(data.listing.email)}`);
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setSellerStats(statsData.stats);
          }
        }
      } catch (err) {
        setError("Failed to load listing");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchListingAndStats();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error || !listing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button 
            onClick={() => router.push('/explore')}
            className="btn btn-primary"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="max-w-6xl w-full">
        <button 
          onClick={() => router.push('/explore')}
          className="mb-4 btn btn-secondary"
        >
          ← Back to Explore
        </button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={listing.image} 
                alt={listing.product} 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {sellerStats && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Seller Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Listings</p>
                    <p className="text-xl font-bold">{sellerStats.totalListings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-xl font-bold">{sellerStats.activeListings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Sold</p>
                    <p className="text-xl font-bold">{sellerStats.soldListings}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.product}</h1>
              <p className="text-2xl font-bold text-blue-600">
                ${listing.price.toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{listing.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{listing.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{listing.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{formatDate(listing.createdAt)}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{listing.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <a 
                  href={`mailto:${listing.email}?subject=Regarding: ${listing.product}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {listing.email}
                </a>
              </div>
            </div>

            <div className="inline-block">
              <span 
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  listing.sold 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {listing.sold ? 'Sold' : 'Available'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
