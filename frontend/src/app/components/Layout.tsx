import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <header className="flex w-full px-6 py-4 border border-b-1">
        <nav className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            <a>
              <img src="/logo.svg" alt="logo" />
            </a>
            <h1 className="font-luckiest-guy text-4xl mt-3">UniSwap</h1>
          </div>

          <ul className="flex items-center gap-6">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a className="btn btn-primary">Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer>
        <div className="flex w-full justify-center items-center py-4">
          <p>&copy; 2025 UniSwap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};