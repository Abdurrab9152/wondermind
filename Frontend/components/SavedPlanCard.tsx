"use client";
import React from "react";

interface SavedPlan {
  title: string;
  details: string;
}

interface Props {
  plan: SavedPlan;
  onDelete?: () => void; 
}

const emojis = ["🗺️", "✈️", "🏖️", "🍲", "🏨", "🏛️"];

export default function SavedPlanCard({ plan, onDelete }: Props) {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all animate-fadeIn">
      
      {}
      <div className="absolute top-4 right-4 text-3xl animate-float">{randomEmoji}</div>

      {}
      <h3 className="text-xl font-bold text-indigo-700 mb-2">{plan.title}</h3>
      
      {}
      <p className="text-gray-700 whitespace-pre-line line-clamp-4 mb-4">
        {plan.details}
      </p>

      {}
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
          View
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
