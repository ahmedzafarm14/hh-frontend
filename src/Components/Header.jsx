import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Button from "../Components/Button";

const StickyHeader = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  const tabs = [
    { label: "Home", route: "/" },
    { label: "Hostels", route: "/hostels" },
    { label: "Contact Us", route: "/contact" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    navigate(tab.route);
  };

  return (
    <div className="w-full flex justify-center">
      {/* Wrapper for centering the AppBar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.1)",
            boxShadow: isSticky ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            borderRadius: "50px",
            marginY: "20px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{
                justifyContent: "space-between",
              }}
            >
              <div className="flex items-center gap-1 text-BackgroundColor">
                <div className="w-6 h-6 sm:w-4 sm:h-4 bg-cyan-400 rounded-full ml-1"></div>
                <span className="text-xl sm:text-base font-semibold">HMS</span>
              </div>
              <Box className="flex sm:hidden gap-2">
                <nav>
                  <ul className="flex space-x-1">
                    {tabs.map((tab) => (
                      <li key={tab.label}>
                        <button
                          className={`px-4 py-2 rounded-md transition-colors ${
                            activeTab === tab.label
                              ? "text-PrimaryColor"
                              : "text-AccentColor3"
                          }`}
                          onClick={() => handleTabClick(tab)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Box>
              <Button
                text="Login"
                type="submit"
                height="37px"
                width="100%"
                customColor={BackgroundColor}
                bgColor={PrimaryColor}
                className="rounded-full px-5 h-auto border-none"
                onClick={() => navigate("/login")}
              />
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};

export default StickyHeader;
