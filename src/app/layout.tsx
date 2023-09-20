import "@/styles/globals.css";
import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Book Library",
  description:
    "Book Library Build with Next.js &  MongoDB. Steps to learn Next.js CRUD",
};

const encode_sans = Encode_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={encode_sans.className}>
        <NavBar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
