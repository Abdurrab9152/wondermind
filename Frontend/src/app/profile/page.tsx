"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../../components/TopBar";
import Footer from "../../../components/Footer";
import SavedPlanCard from "../../../components/SavedPlanCard";
import axios from "axios";

interface SavedPlan {
  title: string;
  details: string;
  _id?: string;
}

const ProfilePage: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    setUserName(name || "Traveler");

    fetchPlans(token);
  }, []);

  const fetchPlans = (token: string | null) => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSavedPlans(res.data.savedPlans || []))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <TopBar />

      {}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {}
      {mounted && (
        <motion.div
          className="absolute w-full h-full -z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, idx) => (
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

      <main className="flex-1 px-4 md:px-8 py-16 z-10 relative">
        <h1 className="text-4xl font-bold text-white mb-4 animate-slideDown">
          Hello, {userName} 👋
        </h1>
        <h2 className="text-2xl font-semibold text-white/80 mb-6 animate-slideDown delay-100">
          Your Saved Itineraries:
        </h2>

        {savedPlans.length === 0 && (
          <p className="text-white/70 text-lg animate-fadeIn">
            You haven’t saved any itineraries yet. Start planning your next trip!
          </p>
        )}

        <div className="saved-plans-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {savedPlans.map((plan, i) => (
            <div
              key={plan._id || i}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="animate-fadeIn"
            >
              <SavedPlanCard plan={plan} onDelete={() => plan._id && handleDelete(plan._id)} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
