"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface SearchBarProps {
  currentQuery: string;
  setCurrentQuery: (v: string) => void;
  setItineraryText: (v: string) => void;
  setIsLoading: (v: boolean) => void;
}

export default function SearchBar({
  currentQuery,
  setCurrentQuery,
  setItineraryText,
  setIsLoading,
}: SearchBarProps) {
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      if (Array.isArray(stored)) {
        setRecentSearches(stored.map(item => String(item)));
      }
    } catch {
      setRecentSearches([]);
    }
  }, []);
  const handleSearch = async () => {
    const query = String(currentQuery ?? "").trim();   

    if (!query) {
      alert("Please enter a destination.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/generate-itinerary", {
        destination: query,
      });

      setItineraryText(String(res.data.itinerary || ""));
    } catch {
      setItineraryText("Something went wrong. Please try again.");
    }
    const updated = [
      query,
      ...recentSearches.filter((s) => String(s) !== query),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    setIsLoading(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">

      {}
      <div className="flex gap-3">

        <input
          value={String(currentQuery ?? "")}  
          onChange={(e) => setCurrentQuery(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Type destination like 'Goa 3 days plan'"
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {}
      {recentSearches.length > 0 && (
        <div className="mt-4 text-gray-600">
          <p className="mb-2 font-medium">Recent searches:</p>

          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((search, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuery(String(search))}
                className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
