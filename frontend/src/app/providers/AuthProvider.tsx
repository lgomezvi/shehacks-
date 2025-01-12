"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  if (typeof window === 'undefined') {
    // Return a loading state or placeholder during SSR
    return <>{children}</>;
  }

  console.log("Auth Domain:", !!process.env.NEXT_PUBLIC_AUTH_DOMAIN);
  console.log("Client ID:", !!process.env.NEXT_PUBLIC_AUTH_CLIENT_ID);

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
