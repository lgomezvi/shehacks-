"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Layout } from "./components";
import { universities } from "./constants";
import Image from "next/image";

export default function Home() {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated and email is verified, redirect to explore page
    if (isAuthenticated && user?.email_verified) {
      router.push("/explore");
    }
  }, [isAuthenticated, user, router]);

  const UnverifiedEmailPrompt = () => (
    <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Email Verification Required</h2>
      <p className="text-center mb-4">
        Please verify your email address to continue. Check your inbox for the
        verification link.
      </p>
      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
        className="btn btn-secondary"
      >
        Return to Login
      </button>
    </div>
  );

  // If user is authenticated but email is not verified, show verification prompt
  if (isAuthenticated && user && !user.email_verified) {
    return (
      <Layout>
        <UnverifiedEmailPrompt />
      </Layout>
    );
  }

  // Landing page for unauthenticated users
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen gap-14 py-8">
        <div className="flex flex-col items-center justify-center">
          <img src="/logo.svg" alt="logo" className="h-[200px] w-[200px]" />
          <h1 className="font-luckiest-guy mt-3 text-4xl">Campus Cart</h1>
          <p className="text-lg mt-2">Your campus. Your community. Your marketplace.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  screen_hint: "signup",
                },
              })
            }
            className="btn btn-primary px-8 py-2"
          >
            Sign Up
          </button>

          <button
            onClick={() => loginWithRedirect()}
            className="btn btn-secondary px-8 py-2"
          >
            Log In
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-medium text-gray-700">
            Trusted by over 1 million students across 1000+ campuses.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {universities.map((uni) => (
              <Image
                key={uni.name}
                src={uni.image}
                alt={`${uni.name} University`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-[60px] object-contain"
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}