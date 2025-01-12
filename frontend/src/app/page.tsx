"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Layout } from "./components";
import { universities } from "./constants";
import Image from "next/image";
import { Dashboard } from "./pages/Dashboard";

export default function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <Layout>
      {!isAuthenticated && (
        <main className="flex flex-col items-center justify-center h-screen gap-14">
          <div className="flex flex-col items-center justify-center">
            <img src="/logo.svg" alt="logo" className="h-[200px] w-[200px]" />
            <h1 className="font-luckiest-guy mt-3">Campus Cart</h1>
            <p>Your campus. Your community. Your marketplace.</p>
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
              className="btn btn-primary"
            >
              Sign Up
            </button>

            <button
              onClick={() => loginWithRedirect()}
              className="btn btn-secondary"
            >
              Log In
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            Trusted by over 1 million students across 1000+ campuses.
            <div className="flex gap-4">
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
      )}
      {isAuthenticated ? <Dashboard /> : <p>Error</p>}
    </Layout>
  );
}
