import React, { useState, useEffect } from "react";
import CarouselComponent from "../../Components/Carousel";
import Explore from "../../Components/Explore";
import DiscoverMore from "../../Components/DiscoverMore";
import Chatbot from "../../Components/Chatbot";
import { getUserLocationFromIP } from "../../utils/IpLocation.js";

export default function LandingPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [location, setLocation] = useState(null);

  // Location from IP
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getUserLocationFromIP();

        // Format location for API call
        const locationParams = {
          longitude: result.coordinates[0],
          latitude: result.coordinates[1],
        };

        setLocation(locationParams);
      } catch (error) {
        console.error("Error fetching location:", error);
        // Set default location if IP location fails
        const defaultLocation = {
          longitude: 78.9629,
          latitude: 20.5937, // Default to India center
        };
        setLocation(defaultLocation);
      }
    };
    fetchLocation();
  }, []);

  return (
    <>
      {/* Home */}
      <CarouselComponent />

      {/* Hostels - Pass location to Explore */}
      <Explore userLocation={location} />

      {/* Hostels - Pass location to DiscoverMore */}
      <DiscoverMore userLocation={location} />

      {/* Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
        onClick={() => setIsChatbotOpen((v) => !v)}
        aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
        title={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </>
  );
}
