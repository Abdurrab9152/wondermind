"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "../../../components/TopBar";
import Footer from "../../../components/Footer";
import ReviewCard from "../../../components/ReviewCard";
import WriteReviewModal from "../../../components/WriteReviewModal";

interface Review {
  username: string;
  city: string;
  message: string;
}

// Initial dummy reviews
const dummyReviews: Review[] = [
  { username: "Fatima", city: "Goa", message: "Amazing beach trip! 🌴 Loved the sunsets and street food." },
  { username: "Abdurrab", city: "Delhi", message: "Loved the street food in Delhi. Chandni Chowk is a must-visit!" },
  { username: "Tausif", city: "Jaipur", message: "Historic forts were breathtaking! The culture is amazing." },
];

export default function ReviewsPage() {
  const [reviewsArray, setReviewsArray] = useState<Review[]>(dummyReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addReview = (review: Review) => {
    setReviewsArray([review, ...reviewsArray]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="reviews-page relative flex flex-col min-h-screen overflow-x-hidden">
      <TopBar />

      {/* Gradient animated background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating dots */}
      {mounted && (
        <motion.div
          className="absolute w-full h-full -z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(15)].map((_, idx) => (
            <div
              key={idx}
              className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main content */}
      <main className="flex-grow relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Traveler Reviews</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
          >
            Write a Review
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsArray.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ReviewCard
                username={review.username}
                city={review.city}
                message={review.message}
              />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <WriteReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addReview}
        />
      )}
    </div>
  );
}
