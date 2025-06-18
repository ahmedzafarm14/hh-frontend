import React from "react";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import Calendar from "./Calendar";
import Notification from "./Notification";

export default function Navbar({ toggleSidebar, onTabChange, currentTab }) {
  const tabs =
    // role === "owner"
    //   ? ["Registration", "Management", "Chat", "Advertising"]
    ["Registration", "Management", "Chat", "Advertising"];

  // useEffect(() => {
  //   const storedTab = localStorage.getItem("selectedTab");
  //   if (storedTab) {
  //     onTabChange(storedTab);
  //     updateChangeTab(storedTab);
  //   }
  // }, []);

  // const updateChangeTab = (tab) => {
  //   if (tab === "Registration" && role === "owner") {
  //     setChangeTab("Registration");
  //   } else if (tab === "Chat" && role === "owner") {
  //     setChangeTab("Chat");
  //   } else if (tab === "Advertising" && role === "owner") {
  //     setChangeTab("Advertising");
  //   } else if (tab === "Home" && role === "client") {
  //     setChangeTab("Home");
  //   }
  // };

  const handleTabClick = (tab) => {
    onTabChange(tab);
    // updateChangeTab(tab);
    // localStorage.setItem("selectedTab", tab);
  };

  return (
    <nav className="sticky top-0 z-50 bg-PrimaryColor">
      <div className="flex justify-between px-4 sm:px-2 pt-3">
        <div className="flex items-center">
          <div className="hidden xxm:flex">
            <IconButton
              onClick={toggleSidebar}
              className="text-white hidden xxm:flex"
              aria-label="Toggle Sidebar"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </div>
          <div className="flex items-center space-x-1 mr-28 lg:mr-8 xxlg:mr-5 sm:mr-0">
            <div className="h-4 w-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
            <Typography variant="h6" className="text-BackgroundColor">
              HMS
            </Typography>
          </div>
        </div>
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
              {/* {tab === "Registration" && (
                <DashboardIcon className="mr-1" fontSize="small" />
              )}
              {tab === "Chat" && (
                <BedOutlinedIcon className="mr-1" fontSize="small" />
              )}
              {tab === "Advertising" && (
                <AccountBalanceOutlinedIcon className="mr-1" fontSize="small" />
              )} */}
              <Typography variant="body1" className="sm:text-sm">
                {tab}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 pb-2 md:gap-2 lg:ml-1">
          <Calendar />
          <Notification />
          <Profile />
        </div>
      </div>
      {/* {role === "owner" && (
        <div className="xxm:flex flex-grow justify-around gap-4 sm:gap-2 hidden">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`flex items-center cursor-pointer rounded-t-xl px-4 py-2  ${
                currentTab === tab
                  ? "bg-BackgroundColor text-TextColor"
                  : "text-LightBackground hover:bg-blue-600"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "Registration" && (
                <DashboardIcon className="mr-1" fontSize="small" />
              )}
              {tab === "Rooms" && (
                <BedOutlinedIcon className="mr-1" fontSize="small" />
              )}
              {tab === "Accounts" && (
                <AccountBalanceOutlinedIcon className="mr-1" fontSize="small" />
              )}
              <Typography variant="body1">{tab}</Typography>
            </div>
          ))}
        </div>
      )} */}
    </nav>
  );
}
