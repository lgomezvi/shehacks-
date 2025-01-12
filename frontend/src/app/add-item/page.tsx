"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { Layout } from "../components";
import { useState, useEffect } from "react";

interface ListingData {
  category: string;
  product: string;
  price: number;
  description: string;
  image: string;
  location: string;
  status: string;
}

interface UserData {
  listings: {
    id: string;
    title: string;
    price: string;
    status: string;
    sold: boolean;
    createdAt: Date;
  }[];
  recentActivity: string[];
  stats: {
    totalListings: number;
    activeListings: number;
    soldListings: number;
  };
}

export default function AddPage() {
const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<ListingData>({
    category: "",
    product: "",
    price: 0,
    description: "",
    image: "",
    location: "",
    status: "Used"
  });
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    listings: [],
    recentActivity: [],
    stats: {
      totalListings: 0,
      activeListings: 0,
      soldListings: 0,
    },
  });

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`/api/listings/${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user listings:', err);
      }
    };

    fetchUserListings();
  }, [user?.email]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create listing");
      }

      setSuccessMessage("Listing created successfully!");
      setFormData({
        category: "",
        product: "",
        price: 0,
        description: "",
        image: "",
        location: "",
        status: "Used"
      });
      setTimeout(() => {
        setShowForm(false);
        setSuccessMessage(null);
      }, 2000);

      // After successful creation, refresh the listings
      const response = await fetch(`/api/listings/${encodeURIComponent(user?.email || '')}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsSold = async (listingId: string) => {
    try {
      const response = await fetch(`/api/listing/${listingId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to mark listing as sold');
      }

      // Refresh the listings after marking as sold
      const refreshResponse = await fetch(`/api/listings/${encodeURIComponent(user?.email || '')}`);
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setUserData(data);
      }
    } catch (err) {
      console.error('Error marking listing as sold:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };
  
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Create New Listing</h2>
        <form onSubmit={handleCreateListing} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {successMessage && (
            <div className="text-green-600 text-sm">{successMessage}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary px-8 py-2 transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
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
            ) : (
              "Create Listing"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
