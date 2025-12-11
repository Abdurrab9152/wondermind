"use client";

import { useState } from "react";

interface WriteReviewModalProps {
  onClose: () => void;
  onSubmit: (review: { username: string; city: string; message: string }) => void;
}

export default function WriteReviewModal({ onClose, onSubmit }: WriteReviewModalProps) {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!username || !city || !message) return;
    onSubmit({ username, city, message });
    onClose();
    setUsername("");
    setCity("");
    setMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Write a Review</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          placeholder="Your Review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
