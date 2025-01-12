"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import ProductDetails from "@/app/pages/ProductDetails";
import { Layout } from "@/app/components";

export default function ProductPage() {
  const { isAuthenticated, user } = useAuth0();

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user?.email_verified) {
    redirect("/");
  }

  return (
    <Layout>
      <ProductDetails />
    </Layout>
  );
}
