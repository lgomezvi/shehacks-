"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import Explore from "../pages/Explore";
import { Layout } from "../components";
import { useEffect } from "react";

export default function ExplorePage() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.email_verified)) {
      redirect("/");
    }
  }, [isAuthenticated, user, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Explore />
    </Layout>
  );
}
