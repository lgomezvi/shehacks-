"use server";

import { revalidatePath } from "next/cache";

export async function createListing(formData: FormData) {
  const listingData = {
    category: formData.get("category"),
    product: formData.get("product"),
    price: parseFloat(formData.get("price") as string),
    description: formData.get("description"),
    image: formData.get("image"),
    location: formData.get("location"),
    availability: "Available",
  };

  try {
    // Here you would typically save the listing to your database
    // For this example, we'll just log it
    console.log("Creating listing:", listingData);

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Revalidate the dashboard page to show the new listing
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing" };
  }
}
