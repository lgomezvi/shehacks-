"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateListing from "@/components/CreateListing";
import { set } from "mongoose";

interface DashboardProps {
  email: string;
}

interface ListingData {
  category: string;
  product: string;
  price: number;
  description: string;
  image: string;
  location: string;
  availability: string;
}

export default function Dashboard({ email }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateListing = async () => {
    setIsListing(true);
  };

  const handleListingCreated = () => {
    setIsListing(false);
    setSuccessMessage("Listing created successfully!");
  };

  // Dummy data
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

  // const handleCreateListing = async () => {
  //   setIsListing(true);
  //   setIsLoading(true);
  //   setError(null);
  //   setSuccessMessage(null);

  //   const listingData: ListingData = {
  //     category: "Electronics",
  //     product: "Gaming Laptop",
  //     price: 1200,
  //     description: "Selling my gaming laptop",
  //     image: "gaming-laptop.jpg",
  //     location: "New York, NY",
  //     availability: "Available",
  //   };

  //   try {
  //     const res = await fetch("/api/listing", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         ...listingData,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || "Failed to create listing");
  //     }

  //     setSuccessMessage("Listing created successfully!");
  //     console.log("Listing created:", data);
  //   } catch (err) {
  //     setError(
  //       err instanceof Error ? err.message : "An unexpected error occurred"
  //     );
  //     console.error("Error creating listing:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="space-y-4 w-full max-w-4xl">
      {/* Welcome and Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {email}</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* If is listing  */}

      {isListing && <CreateListing onListingCreated={handleListingCreated} />}

      {/* Listings and Recent Activity Section */}
      { !isListing && 
      <div className="grid grid-cols-2 gap-4">
        {/* My Listings */}
        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.listings.map((listing) => (
                <li
                  key={listing.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{listing.title}</h4>
                    <p className="text-sm text-gray-600">{listing.price}</p>
                  </div>
                  <span
                    className={`text-sm ${
                      listing.status === "Active"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {listing.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.recentActivity.map((activity, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {activity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Error and Success Messages */}
        {error && (
          <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        <Button
          onClick={handleCreateListing}
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? "Creating Listing..." : "Create New Listing"}
        </Button>
      </div>}
    </div>
  );
}
