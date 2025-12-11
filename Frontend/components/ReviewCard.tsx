"use client";

import { motion } from "framer-motion";

interface ReviewCardProps {
  username: string;
  city: string;
  message: string;
}

export default function ReviewCard({ username, city, message }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-2">
        <p className="font-semibold text-gray-800">{username}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
      <p className="text-gray-700">{message}</p>
    </motion.div>
  );
}
