import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import Chat from "../Pages/Chat/Chats.jsx";
import { setCurrentTab } from "../State/Slices/tabHandlerSlice.js";
import HostelManagement from "../Pages/HostelManagement/HostelManagement.jsx";
import Advertisement from "../Pages/Advertisement/Advertisement.jsx";
import EditProfile from "../Pages/EditProfile/EditProfile.jsx";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    if (!currentTab && role === "owner") {
      dispatch(setCurrentTab("Manage Hostels"));
    }

    switch (currentTab) {
      case "Manage Hostels":
        navigate("/management");
        break;
      case "Advertise Hostels":
        navigate("/advertising");
        break;
      case "Bookings":
        navigate("/bookings");
        break;
      case "Chat":
        navigate("/chat");
        break;
      case "Edit Profile":
        navigate("/edit-profile");
      default:
        break;
    }
  }, [currentTab, role, navigate, dispatch]);

  const renderContent = () => {
    switch (currentTab) {
      case "Manage Hostels":
        return <HostelManagement />;
      case "Chat":
        return <Chat />;
      case "Advertise Hostels":
        return <Advertisement />;
      case "Bookings":
        return <div>Bookings</div>;
      case "Edit Profile":
        return <EditProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      {/* Navbar stays fixed */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>
      <div className="flex pt-16 h-[calc(100vh-64px)] min-h-0">
        {/* Main Page Content */}
        <div className="flex-grow w-full px-4 pt-2 pb-3 min-h-0">{renderContent()}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
