'use client'
import React, { useState } from "react";
import TopBar from "../../../components/TopBar";
import SearchBar from "../../../components/SearchBar";
import ItineraryPreview from "../../../components/ItineraryPreview";
import Footer from "../../../components/Footer";
const HomePage: React.FC = () => {
  const [currentDestination, setCurrentDestination] = useState<string>("");
  const [itineraryText, setItineraryText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="page-container">
      <TopBar />
      <main className="main-content">
        <h1 className="page-title">AI Travel Guide & Planner</h1>
        <p className="page-subtitle">
          Type your destination and get a personalized AI travel itinerary.
        </p>

        <SearchBar
           currentQuery={currentDestination}
          setCurrentQuery={setCurrentDestination}
          setItineraryText={setItineraryText}
          setIsLoading={setLoading}
        />

        <ItineraryPreview itinerary={itineraryText} isLoading={loading} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;