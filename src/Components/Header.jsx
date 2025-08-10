import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Button from "../Components/Button";
import Profile from "./Profile.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTab } from "../State/Slices/tabHandlerSlice.js";

const StickyHeader = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Step 1: Base tabs
  const baseTabs = [
    { label: "Home", route: "/" },
    { label: "Hostels", route: "/hostels" },
  ];

  // Step 2: Role-based tabs
  let conditionalTabs = [];

  if (user && user.role === "resident") {
    conditionalTabs = [
      { label: "Chat", route: "/chat" },
      { label: "Bookings History", route: "/bookings-history" },
    ];
  } else if (!user) {
    // Only for not-logged-in users
    conditionalTabs = [{ label: "Contact Us", route: "/contact" }];
  }

  const tabs = [...baseTabs, ...conditionalTabs];

  // Sticky effect on scroll
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
          zIndex: 1000,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: isSticky 
              ? "rgba(255, 255, 255, 0.95)" 
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: isSticky 
              ? "0 4px 20px rgba(0,0,0,0.15)" 
              : "0 2px 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            borderRadius: "50px",
            marginY: "20px",
            maxWidth: "1200px",
            width: "100%",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              {/* Logo */}
              <div className="flex items-center gap-1 text-gray-800">
                <div className="w-6 h-6 sm:w-4 sm:h-4 bg-cyan-400 rounded-full ml-1"></div>
                <span className="text-xl sm:text-base font-semibold">HH</span>
              </div>

              {/* Navigation Tabs */}
              <Box className="flex sm:hidden gap-2">
                <nav>
                  <ul className="flex space-x-1">
                    {tabs.map((tab) => (
                      <li
                        key={tab.label}
                        onClick={() => {
                          if (
                            tab.route === "/chat" &&
                            user?.role === "resident"
                          ) {
                            dispatch(setCurrentTab(tab.label));
                          }
                        }}
                      >
                        <Link
                          to={tab.route}
                          className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                            location.pathname === tab.route
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {tab.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Box>

              {/* Profile or Login Button */}
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
                    className="rounded-full px-5 h-auto border-none shadow-lg hover:shadow-xl transition-shadow"
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
