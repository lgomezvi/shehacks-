// app/components/Dashboard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  email: string;
}

export default function Dashboard({ email }: DashboardProps) {
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

      {/* Listings and Recent Activity Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* My Listings */}
        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.listings.map((listing) => (
                <li key={listing.id} className="flex justify-between items-center">
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
      </div>
    </div>
  );
}
