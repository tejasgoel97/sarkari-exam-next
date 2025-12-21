// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the new component

const hindiFont = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hindi",
});

export const metadata: Metadata = {
  title: "Sarkari Exam Info | सरकारी रिजल्ट",
  description:
    "Latest Government Jobs, Sarkari Result, Admit Card and Answer Keys in Hindi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={hindiFont.variable}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-hindi flex flex-col min-h-screen">
        {/* Replace the old <nav> with this */}
        <Navbar />

        <main className="flex-grow pb-10">{children}</main>

        <footer className="bg-gray-800 text-white text-center py-8 mt-auto text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-6 mb-4 font-semibold text-gray-400">
              <a href="/about" className="hover:text-white">
                About Us
              </a>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </div>
            <p className="opacity-50">
              © 2025 Sarkari Exam Info. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
