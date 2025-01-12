import type { Metadata } from "next";
import { Luckiest_Guy, Oswald, Open_Sans } from "next/font/google";
import "./globals.css";

export const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

export const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UniSwap",
  description: "Your Campus. Your Community. Your Marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${oswald.variable} ${luckiestGuy.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
