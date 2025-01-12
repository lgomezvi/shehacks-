"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import { Chat } from "../components/Chat";

export default function ChatPage() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user?.email_verified) {
        router.push("/");
      }
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading || isCheckingAuth) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  // Only render chat if authenticated
  if (isAuthenticated && user?.email_verified) {
    return (
      <Layout>
        <Chat />
      </Layout>
    );
  }

  // This return is needed for React but should never be shown
  return null;
}