import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LandLayout = () => {
  return (
    <div className="bg-TextColor min-h-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandLayout;
