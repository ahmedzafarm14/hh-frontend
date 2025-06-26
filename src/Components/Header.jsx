import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Button from "../Components/Button";
import Profile from "./Profile.jsx";
import { useSelector } from "react-redux";

const StickyHeader = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const user = useSelector((state) => state.user.user);

  const tabs = [
    { label: "Home", route: "/" },
    { label: "Hostels", route: "/hostels" },
    { label: "Contact Us", route: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex justify-center">
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
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              {/* Logo */}
              <div className="flex items-center gap-1 text-BackgroundColor">
                <div className="w-6 h-6 sm:w-4 sm:h-4 bg-cyan-400 rounded-full ml-1"></div>
                <span className="text-xl sm:text-base font-semibold">HH</span>
              </div>

              {/* Nav links */}
              <Box className="flex sm:hidden gap-2">
                <nav>
                  <ul className="flex space-x-1">
                    {tabs.map((tab) => (
                      <li key={tab.label}>
                        <Link
                          to={tab.route}
                          className={`px-4 py-2 rounded-md transition-colors text-sm ${
                            location.pathname === tab.route
                              ? "text-PrimaryColor"
                              : "text-AccentColor3 hover:text-white"
                          }`}
                        >
                          {tab.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Box>

              {user && Object.keys(user).length > 0 ? (
                <Profile />
              ) : (
                <Link to="/login" className="no-underline">
                  <Button
                    text="Login"
                    type="submit"
                    height="37px"
                    width="100%"
                    customColor={BackgroundColor}
                    bgColor={PrimaryColor}
                    className="rounded-full px-5 h-auto border-none"
                  />
                </Link>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};

export default StickyHeader;
