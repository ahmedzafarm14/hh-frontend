import React from "react";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleSidebar,
  setCurrentTab,
} from "../State/Slices/tabHandlerSlice.js";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const tabs =
    role === "owner"
      ? ["Manage Hostels", "Bookings", "Chat"]
      : ["Home", "Hostels", "Chat"];

  const handleTabClick = (tab) => {
    if (role === "owner" && tabs.includes(tab)) {
      dispatch(setCurrentTab(tab));
    } else {
      dispatch(setCurrentTab(tab));
      if (tab == "Home") {
        navigate("/");
      } else if (tab == "Hostels") {
        navigate("/hostels");
      } else if (tab == "Contact us") {
        navigate("/chat");
      }
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "Manage Hostels":
        return <DashboardIcon fontSize="small" className="mr-1" />;
      case "Advertise Hostels":
        return <AdUnitsOutlinedIcon fontSize="small" className="mr-1" />;
      case "Bookings":
        return <AccountBalanceOutlinedIcon fontSize="small" className="mr-1" />;
      case "Chat":
        return <ChatBubbleOutlineIcon fontSize="small" className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-PrimaryColor">
      <div className="flex justify-between px-4 sm:px-2 pt-3">
        {/* Left: Logo & Toggle */}
        <div className="flex items-center">
          <div className="hidden xxm:flex">
            <IconButton
              onClick={() => dispatch(setToggleSidebar())}
              className="text-white"
              aria-label="Toggle Sidebar"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </div>
          <div className="flex items-center space-x-1 mr-28 lg:mr-8 xxlg:mr-5 sm:mr-0">
            <div className="h-4 w-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
            <Typography variant="h6" className="text-BackgroundColor">
              HH
            </Typography>
          </div>
        </div>

        {/* Middle Tabs */}
        <div className="flex flex-grow gap-14 xxxl:gap-3 lg:gap-4 xxlg:gap-0 md:ml-4 ml-12 xxlg:ml-4 justify-start xxm:hidden">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`flex items-center cursor-pointer rounded-t-xl xxlg:px-4 px-6 ${
                currentTab === tab
                  ? "bg-BackgroundColor text-TextColor"
                  : "text-LightBackground hover:bg-blue-600"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {getTabIcon(tab)}
              <Typography variant="body1" className="sm:text-sm">
                {tab}
              </Typography>
            </div>
          ))}
        </div>

        {/* Right: Utilities */}
        <div className="flex items-center gap-4 pb-2 md:gap-2 lg:ml-1">
          <Profile />
        </div>
      </div>
    </nav>
  );
}
