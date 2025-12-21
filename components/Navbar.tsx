// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Replace this src with your actual logo file path (e.g., /logo.png) */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-700 text-white p-1 rounded font-bold text-xl h-10 w-10 flex items-center justify-center">
                SE
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-extrabold text-blue-900 leading-none">
                  SarkariExam
                </h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Info & Results
                </p>
              </div>
            </div>
          </Link>

          {/* 2. Search Bar (Centered & Wide) */}
          <div className="flex-1 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search result, admit card..."
                className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* 3. Navigation Links (Hidden on Mobile) */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link
              href="/latest-jobs"
              className="hover:text-green-600 transition"
            >
              Latest Jobs
            </Link>
            <Link href="/result" className="hover:text-pink-600 transition">
              Results
            </Link>
            <Link href="/admit-card" className="hover:text-blue-600 transition">
              Admit Card
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu (Simple Row) */}
      <div className="md:hidden flex justify-around border-t border-gray-100 py-2 bg-gray-50 text-xs font-medium text-gray-600">
        <Link href="/latest-jobs" className="hover:text-green-600">
          Latest Jobs
        </Link>
        <Link href="/result" className="hover:text-pink-600">
          Results
        </Link>
        <Link href="/admit-card" className="hover:text-blue-600">
          Admit Card
        </Link>
      </div>
    </header>
  );
}
