'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-lg bg-white/10 text-white py-8 mt-12 border-t border-white/20 shadow-inner animate-fadeInUp">
      <div className="container mx-auto text-center text-sm flex flex-col items-center gap-3 px-6">
        {}
        <p className="text-white/80 hover:text-yellow-300 transition-colors duration-300">
          ©️ 2025 <span className="font-semibold">TravelPlanner</span>. Made with ❤️ for Hackathon.
        </p>

        {}
        <div className="flex gap-6 mt-2 text-base font-medium">
          <a
            href="#"
            className="relative group hover:text-yellow-300 transition-colors duration-300"
          >
            Privacy
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-yellow-300 transition-colors duration-300"
          >
            Terms
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-yellow-300 transition-colors duration-300"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
