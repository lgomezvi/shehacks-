import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import React from "react";
import { BottomNav } from "./BottomNav";
import { MessageCircle, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  hasNewMessages?: boolean;
}

export const Layout = ({ children, hasNewMessages = false }: LayoutProps) => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex w-full px-6 py-4 border-b">
        <nav className="flex w-full justify-between items-center">
          <Link className="flex items-center gap-2" href="/">
            <img src="/logo.svg" alt="logo" />
            <h1 className="font-luckiest-guy md:text-4xl text-3xl mt-3 text-start">
              Campus Cart
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="items-center gap-6 md:flex hidden">
            <li>
              <Link href="/">Home</Link>
            </li>
            {isAuthenticated && (
              <li>
                <a className="" href="/chat">
                  Chat
                </a>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <a className="btn btn-primary">Sign Up</a>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <a
                  className="btn btn-primary"
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: window.location.origin,
                      },
                    })
                  }
                >
                  Log Out
                </a>
              </li>
            )}
          </ul>

          {/* Mobile Navigation */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center gap-4">
              <Link
                href="/chat"
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <MessageCircle className="w-6 h-6" color="black" />
                {hasNewMessages && (
                  <span className="absolute top-2 right-1 w-3 h-3 bg-red rounded-full"></span>
                )}
              </Link>
              <button
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  })
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <LogOut className="w-6 h-6" color="black" />
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      {isAuthenticated && <BottomNav />}
      <footer>
        <div className="flex w-full justify-center items-center py-4">
          <p>&copy; 2025 Campus Cart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
