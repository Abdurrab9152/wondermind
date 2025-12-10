import React from "react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="backdrop-blur-lg bg-white/10 text-white py-4 shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center px-6">
        {}
        <h2 className="text-2xl font-extrabold tracking-wide cursor-pointer hover:text-yellow-300 transition-colors duration-300">
          TravelPlanner
        </h2>

        {}
        <nav className="flex gap-8 text-lg font-medium">
          <Link
            href="/"
            className="relative group transition-colors duration-300 hover:text-yellow-300"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/profile"
            className="relative group transition-colors duration-300 hover:text-yellow-300"
          >
            Profile
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/login"
            className="relative group transition-colors duration-300 hover:text-yellow-300"
          >
            Login
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
