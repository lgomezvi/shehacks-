import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Menu } from "../components/Menu";
import { Search, ChevronDown } from "lucide-react";

// Define the Listing type based on your schema
interface Listing {
  _id: string;
  product: string;
  price: number;
  description: string;
  image: string;
  category: string;
  status: "New" | "Used" | "Refurbished";
  location: string;
  sold: boolean;
}

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

const Explore: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [priceRange, setPriceRange] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch listings when component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listing");
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data.listings);
      } catch (err) {
        setError("Failed to load listings");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter listings based on category, search query, and price range
  const filteredListings = listings
    .filter((listing) => {
      const matchesCategory =
        selectedCategory === "all" || listing.category === selectedCategory;
      const matchesSearch = listing.product
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriceRange =
        priceRange === "all" ||
        (priceRange === "under-50" && listing.price < 50) ||
        (priceRange === "50-100" &&
          listing.price >= 50 &&
          listing.price <= 100) ||
        (priceRange === "over-100" && listing.price > 100);
      return (
        matchesCategory && matchesSearch && matchesPriceRange && !listing.sold
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.product.localeCompare(b.product);
        case "name-desc":
          return b.product.localeCompare(a.product);
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-6xl space-y-4 mb-6">
        {/* Search and Filters Container */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Price Range Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            >
              <option value="all">All Prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Category Menu */}
        <Menu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredListings.map((listing) => (
          <Card
            key={listing._id}
            id={listing._id}
            image={listing.image}
            title={listing.product}
            description={listing.description}
            price={listing.price}
            status={listing.status}
            location={listing.location}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredListings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
