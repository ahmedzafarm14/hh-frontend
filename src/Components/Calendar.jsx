import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Popover, IconButton, Tooltip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function BasicDateCalendar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "calendar-popover" : undefined;

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Calendar">
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "calendar-popover" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ width: 32, height: 32 }}
            className="!bg-BackgroundColor !text-PrimaryColor"
          >
            <CalendarTodayIcon sx={{ width: 22, height: 22 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="mt-1"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              width: "300px",
              height: "305px",
            }}
          />
        </LocalizationProvider>
      </Popover>
    </React.Fragment>
  );
}
