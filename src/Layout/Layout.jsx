import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import Registration from "../Pages/Registration/Registration.jsx";
import Chat from "../Pages/Chat/Chats.jsx";
import Advertising from "../Pages/Advertising/Advertising.jsx";
import Management from "../Pages/Management/Management.jsx";
import { setCurrentTab } from "../State/Slices/tabHandlerSlice.js";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    if (!currentTab && role === "owner") {
      dispatch(setCurrentTab("Registration"));
    }

    switch (currentTab) {
      case "Registration":
        navigate("/registration");
        break;
      case "Chat":
        navigate("/chat");
        break;
      case "Advertising":
        navigate("/advertising");
        break;
      case "Management":
        navigate("/management");
        break;
      default:
        break;
    }
  }, [currentTab, role, navigate, dispatch]);

  const renderContent = () => {
    switch (currentTab) {
      case "Registration":
        return <Registration />;
      case "Chat":
        return <Chat />;
      case "Advertising":
        return <Advertising />;
      case "Management":
        return <Management />;
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
      <div className="flex pt-16 h-full">
        {/* Main Page Content */}
        <div className="flex-grow w-full px-4 pt-2 pb-3">{renderContent()}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
