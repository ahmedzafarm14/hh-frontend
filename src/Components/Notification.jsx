import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import WarningIcon from "@mui/icons-material/Warning";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "../Theme/Typography";

const notifications = [
  {
    id: 1,
    image: "https://i.pravatar.cc/300?img=1",
    name: "Brigid Dawson",
    action: "followed you",
    time: "4 hours ago",
    icon: null,
    recent: true,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/300?img=2",
    name: "John Dwyer",
    action: "liked your post",
    time: "Yesterday",
    icon: <FavoriteIcon className="text-ErrorColor" />,
    recent: true,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/300?img=3",
    name: "Tim Hellman",
    action: "liked your post",
    time: "Tuesday",
    icon: <FavoriteIcon className="text-ErrorColor" />,
    recent: false,
  },
  {
    id: 4,
    image: null,
    name: "Running low on storage space",
    action: "",
    time: "Monday",
    icon: <WarningIcon className="text-purple-500" />,
    recent: false,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/300?img=5",
    name: "Shannon Shaw",
    action: "commented on your post",
    time: "4 days ago",
    icon: <ChatBubbleIcon className="text-PrimaryColor" />,
    recent: false,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/300?img=6",
    name: "Alex Turner",
    action: "liked your photo",
    time: "Last week",
    icon: <FavoriteIcon className="text-ErrorColor" />,
    recent: false,
  },
  {
    id: 7,
    image: "https://i.pravatar.cc/300?img=7",
    name: "Mark Hoppus",
    action: "started following you",
    time: "2 weeks ago",
    icon: null,
    recent: false,
  },
  {
    id: 8,
    image: "https://i.pravatar.cc/300?img=8",
    name: "Ella Fitzgerald",
    action: "shared your post",
    time: "3 weeks ago",
    icon: <FavoriteIcon className="text-ErrorColor" />,
    recent: false,
  },
  {
    id: 9,
    image: null,
    name: "Space Running Out",
    action: "",
    time: "3 days ago",
    icon: <WarningIcon className="text-purple-500" />,
    recent: true,
  },
  {
    id: 10,
    image: "https://i.pravatar.cc/300?img=10",
    name: "Nina Simone",
    action: "commented on your photo",
    time: "1 month ago",
    icon: <ChatBubbleIcon className="text-PrimaryColor" />,
    recent: false,
  },
];

const NotificationCard = ({ image, name, action, time, icon }) => (
  <div className="flex items-start p-4 hover:bg-gray-100 transition-colors duration-200">
    <Avatar src={image} alt={name} className="w-12 h-12 mr-3" />
    <div className="flex-1">
      <Typography variant={"body1"} className="text-TextColor">
        <span className="font-semibold">{name}</span> {action}
      </Typography>
      <Typography variant={"body1"} className="text-TextColor">
        {time}
      </Typography>
    </div>
    {icon && <div className="text-xl">{icon}</div>}
  </div>
);

const NotificationList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showRecent, setShowRecent] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowRecent(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleShowRecent = () => {
    setShowRecent(false);
  };

  const open = Boolean(anchorEl);

  const displayedNotifications = notifications.filter((notification) =>
    showRecent ? notification.recent : true
  );
  const recentNotificationsCount = notifications.filter(
    (notification) => notification.recent
  ).length;

  return (
    <>
      <Box className="flex justify-end items-center">
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            aria-expanded={open ? "true" : undefined}
            sx={{ width: 32, height: 32 }}
            aria-label="show notifications"
            aria-controls="notification-menu"
            aria-haspopup="true"
            color="inherit"
            className="!bg-BackgroundColor !text-PrimaryColor"
          >
            <Badge badgeContent={recentNotificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        className="mt-1"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="shadow-lg overflow-hidden z-50 w-80 sm:w-72">
          <div className="flex justify-between items-center bg-PrimaryColor text-BackgroundColor p-4">
            <Typography variant={"h6"}>Notifications</Typography>
            {/* <IconButton className="text-white">
              <SettingsIcon />
            </IconButton> */}
          </div>
          <div className="bg-BackgroundColor max-h-60 overflow-y-auto">
            {displayedNotifications.map((notification) => (
              <NotificationCard key={notification.id} {...notification} />
            ))}
          </div>
          <div className="text-center p-3">
            <button
              onClick={toggleShowRecent}
              className="text-PrimaryColor hover:text-TextColor transition-colors duration-200"
            >
              <Typography variant={"body1"}> See all past activity</Typography>
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default NotificationList;
