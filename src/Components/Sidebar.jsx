import React from "react";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "../Theme/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleSidebar,
  setCurrentTab,
} from "../State/Slices/tabHandlerSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.tabHandler.toggleSidebar);
  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  const role = useSelector((state) => state.user.role);

  const tabs =
    role === "owner"
      ? ["Registration", "Management", "Chat", "Advertising"]
      : [];

  const handleTabClick = (tab) => {
    if (currentTab !== tab) {
      dispatch(setCurrentTab(tab));
    }
    dispatch(setToggleSidebar());
  };

  const renderSidebarItems = () =>
    tabs.map((tab) => (
      <div
        key={tab}
        className={`flex items-center rounded-md cursor-pointer px-2 py-3 ${
          currentTab === tab
            ? "bg-BackgroundColor text-TextColor"
            : "text-LightBackground hover:bg-blue-600"
        }`}
        onClick={(event) => {
          event.stopPropagation();
          handleTabClick(tab);
        }}
      >
        <Typography variant="body1">{tab}</Typography>
      </div>
    ));

  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={() => dispatch(setToggleSidebar())}
        ModalProps={{
          keepMounted: true,
        }}
        classes={{ paper: "bg-PrimaryColor text-white w-60" }}
      >
        <div className="h-full p-2 flex flex-col bg-PrimaryColor">
          <CloseIcon
            onClick={() => dispatch(setToggleSidebar())}
            className="text-white self-end m-2 cursor-pointer"
          />
          <div className="flex flex-col mt-3">{renderSidebarItems()}</div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
