"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import Explore from "../pages/Explore";
import { Layout } from "../components";

export default function ExplorePage() {
  const { isAuthenticated, user } = useAuth0();

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user?.email_verified) {
    redirect("/");
  }

  return (
    <Layout>
      <Explore />
    </Layout>
  );
}
