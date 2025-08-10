import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTab,
  clearCurrentTab,
} from "../State/Slices/tabHandlerSlice.js";
import { clearUser } from "../State/Slices/userSlice.js";
import { clearMessages } from "../State/Slices/messageHandlerSlice.js";
import { useNavigate } from "react-router-dom";
import { clearHostels } from "../State/Slices/hostelSlice.js";

export default function AccountMenu() {
  const { firstName, lastName, image } = useSelector(
    (state) => state.user.user
  );
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    dispatch(setCurrentTab("Edit Profile"));
    if (role === "resident") {
      navigate("/edit-profile");
    }
    handleClose();
  };

  const handleProfile = () => {
    dispatch(setCurrentTab("Edit Profile"));
    if (role === "resident") {
      navigate("/edit-profile");
    }
    handleClose();
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCurrentTab());
    dispatch(clearMessages());
    dispatch(clearHostels());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title={`${firstName} ${lastName}`}>
          <IconButton
            onClick={handleClick}
            sx={{ width: 32, height: 32 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Display user image or fallback to Avatar */}
            {image ? (
              <img
                src={image.url}
                alt={`${firstName} ${lastName}`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "BackgroundColor", // Replace with your color
                  color: "PrimaryColor", // Replace with your color
                }}
              >
                {firstName?.[0]}
                {lastName?.[0]} {/* Show initials */}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          {/* Display user image or fallback to Avatar */}
          {image ? (
            <img
              src={image.url}
              alt={`${firstName} ${lastName}`}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Avatar />
          )}
          <Box sx={{ ml: 1 }}>
            <strong>
              {firstName} {lastName}
            </strong>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
