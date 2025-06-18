import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import Registration from "../Pages/Registration/Registration.jsx";
import Chat from "../Pages/Chat/Chats.jsx";
import Advertising from "../Pages/Advertising/Advertising.jsx";
import Management from "../Pages/Management/Management.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTab,
  clearCurrentTab,
} from "../State/Slices/tabHandlerSlice.js";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  const { role } = useSelector((state) => state.user);

  const [changeTab, setChangeTab] = useState(currentTab || "Registration");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(setCurrentTab(changeTab));

    switch (changeTab) {
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
  }, [changeTab, navigate]);

  const handleTabChange = (tab) => {
    dispatch(setCurrentTab(tab));
    setChangeTab(tab);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (changeTab) {
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
      <div className="fixed top-0 left-0 right-0 z-10 ">
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          changeTab={changeTab}
          setChangeTab={setChangeTab}
          role={role}
        />
      </div>
      <div className="flex pt-16">
        <div className="fixed left-0 top-14 bottom-0 z-10">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            changeTab={changeTab}
            setChangeTab={setChangeTab}
            role={role}
          />
        </div>
        <div className="flex-grow">
          <div className="px-4 pt-2 pb-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
