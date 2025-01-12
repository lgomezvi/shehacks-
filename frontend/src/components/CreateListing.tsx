"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListingData {
  email: string;
  category: string;
  product: string;
  price: number;
  description: string;
  image: string;
  location: string;
  availability: string;
}

interface CreateListingProps {
    onListingCreated: () => void;
  }

export default function CreateListing({ onListingCreated }: CreateListingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listingData, setListingData] = useState<ListingData>({
    email: "",
    category: "",
    product: "",
    price: 0,
    description: "",
    image: "",
    location: "",
    availability: "Available",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setListingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setListingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create listing");
      }

      console.log("Listing created:", data);
      router.push("/dashboard");
      onListingCreated(); // Notify parent component
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error creating listing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={listingData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="product">Product Name</Label>
            <Input
              id="product"
              name="product"
              value={listingData.product}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={listingData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={listingData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={listingData.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={listingData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="availability">Availability</Label>
            <Select
              onValueChange={(value) => handleSelectChange("availability", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

