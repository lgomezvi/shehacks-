import { useEffect, useState } from "react";

export default function Listings() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listing", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setListings(data);
        } else {
          console.error("Failed to fetch listings");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h1>Listings</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>
            <h2>{listing.product}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
