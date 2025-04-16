import React from "react";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "../Theme/Typography";
import { Role } from "../Utlis/constants";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  currentTab,
  changeTab,
  setChangeTab,
  role = Role,
}) => {
  const renderSidebarItemsUser = () => {
    return (
      <>
        <div
          className={`flex items-center rounded-md cursor-pointer px-2 py-3 ${
            changeTab === "Registration"
              ? "bg-BackgroundColor text-TextColor"
              : "text-LightBackground hover:bg-blue-600"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setChangeTab("Registration");
          }}
        >
          {/* <DashboardOutlinedIcon className="mr-2" fontSize="small" /> */}
          <Typography variant="body1">Registration</Typography>
        </div>
        <div
          className={`flex items-center rounded-md cursor-pointer px-2 py-3 ${
            changeTab === "Chat"
              ? "bg-BackgroundColor text-TextColor"
              : "text-LightBackground hover:bg-blue-600"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setChangeTab("Chat");
          }}
        >
          {/* <ListRoundedIcon className="mr-2" fontSize="small" /> */}
          <Typography variant="body1">Chat</Typography>
        </div>
        <div
          className={`flex items-center rounded-md cursor-pointer px-2 py-3 ${
            changeTab === "Advertising"
              ? "bg-BackgroundColor text-TextColor"
              : "text-LightBackground hover:bg-blue-600"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setChangeTab("Advertising");
          }}
        >
          {/* <DateRangeOutlinedIcon className="mr-2" fontSize="small" /> */}
          <Typography variant="body1">Advertising</Typography>
        </div>
        <div
          className={`flex items-center rounded-md cursor-pointer px-2 py-3 ${
            changeTab === "Management"
              ? "bg-BackgroundColor text-TextColor"
              : "text-LightBackground hover:bg-blue-600"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setChangeTab("Management");
          }}
        >
          {/* <NewReleasesOutlinedIcon className="mr-2" fontSize="small" /> */}
          <Typography variant="body1">Management</Typography>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Sidebar for smaller screens */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        className="xxm:flex hidden w-60"
        classes={{ paper: "bg-PrimaryColor text-white" }}
      >
        <div className="h-full w-52 p-2 flex flex-col bg-PrimaryColor">
          <CloseIcon
            onClick={toggleSidebar}
            className="text-white self-end m-2"
            aria-label="Close Sidebar"
          >
            <MenuIcon />
          </CloseIcon>
          <div className="flex flex-col bg-PrimaryColor mt-3">
            {/* {role === "owner" && renderSidebarItems()} */}
            {renderSidebarItemsUser()}
          </div>
        </div>
      </Drawer>

      {/* Sidebar for larger screens */}
      {/* {role === "owner" && (
        <div className="xxm:hidden flex bg-customWhite p-2 h-full">
          <div className="flex flex-col p-2 w-52 bg-PrimaryColor rounded-md text-LightBackground">
            <div className="flex flex-col">{renderSidebarItems()}</div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Sidebar;
