"use client";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface ListingData {
  category: string;
  product: string;
  price: number;
  description: string;
  image: string;
  location: string;
}

export default function Profile() {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dummy data from Dashboard
  const userData = {
    listings: [
      { id: 1, title: "Gaming Laptop", price: "$1200", status: "Active" },
      { id: 2, title: "Desk Chair", price: "$150", status: "Sold" },
      { id: 3, title: "Headphones", price: "$200", status: "Active" },
    ],
    recentActivity: [
      "Listed 'Gaming Laptop' for sale",
      "Sold 'Desk Chair'",
      "Updated price for 'Headphones'",
    ],
    stats: {
      totalListings: 3,
      activeListings: 2,
      soldListings: 1,
    },
  };

  const handleCreateListing = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const listingData: ListingData = {
      category: "Electronics",
      product: "Gaming Laptop",
      price: 1200,
      description: "Selling my gaming laptop",
      image: "gaming-laptop.jpg",
      location: "New York, NY",
    };

    try {
      const res = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          ...listingData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create listing");
      }

      setSuccessMessage("Listing created successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Welcome, Stats Section, and Create Listing Button */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome, {user?.email}</h2>
          <button
            onClick={handleCreateListing}
            disabled={isLoading}
            className={`btn transition-all duration-200 border-2 border-black rounded-lg ${
              isLoading
                ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                : error
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : successMessage
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : error ? (
              'Failed to Create'
            ) : successMessage ? (
              'Created Successfully!'
            ) : (
              'Create New Listing'
            )}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-bold">Total Listings</h3>
            <p className="text-2xl">{userData.stats.totalListings}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold">Active Listings</h3>
            <p className="text-2xl">{userData.stats.activeListings}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-bold">Sold Listings</h3>
            <p className="text-2xl">{userData.stats.soldListings}</p>
          </div>
        </div>
      </div>

      {/* Listings and Recent Activity Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* My Listings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Listings</h2>
          <ul className="space-y-4">
            {userData.listings.map((listing) => (
              <li
                key={listing.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h4 className="font-semibold">{listing.title}</h4>
                  <p className="text-sm text-gray-600">{listing.price}</p>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    listing.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {listing.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            {userData.recentActivity.map((activity, index) => (
              <li key={index} className="text-sm text-gray-600 border-b pb-2">
                • {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
