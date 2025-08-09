import React, { useState } from "react";
import CarouselComponent from "../../Components/Carousel";
import Explore from "../../Components/Explore";
import DiscoverMore from "../../Components/DiscoverMore";
import Chatbot from "../../Components/Chatbot";

export default function LandingPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  return (
    <>
      {/* Home */}
      <CarouselComponent />

      {/* Hostels */}
      <Explore />

      {/* Hostels */}
      <DiscoverMore />

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
