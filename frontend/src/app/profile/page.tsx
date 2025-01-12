"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { Layout } from "../components";
import Profile from "../components/Profile";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth0();

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user?.email_verified) {
    redirect("/");
  }

  return (
    <Layout>
      <Profile />
    </Layout>
  );
} 