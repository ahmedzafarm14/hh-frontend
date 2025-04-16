import React from "react";
import CarouselComponent from "../../Components/Carousel";
import Explore from "../../Components/Explore";
import DiscoverMore from "../../Components/DiscoverMore";

export default function LandingPage() {
  return (
    <>
      {/* Home */}
      <CarouselComponent />

      {/* Hostels */}
      <Explore />

      {/* Hostels */}
      <DiscoverMore />
    </>
  );
}
