import React, { useState } from "react";
import ReviewCarousel from "../Components/ReviewCarousel";
import Image1 from "../Assets/Images/bed1.svg";
import Image2 from "../Assets/Images/bed2.svg";
import Image3 from "../Assets/Images/bed3.svg";
import Typography from "../Theme/Typography";
import Button from "./Button";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import { useNavigate } from "react-router-dom";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-selected": {
            backgroundColor: "#fff",
            color: "#000",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          },
        },
      },
    },
  },
});

export default function RoomDetails() {
  const navigate = useNavigate();
  const details = [
    {
      label: "Size",
      value: "60 sq. meters",
    },
    {
      label: "Max. Occupancy",
      value: "2 Guest",
    },
    {
      label: "Bed Type",
      value: "1 King Size Double Bed",
    },
  ];

  const images = [
    { src: Image1, alt: "Bright room view" },
    { src: Image3, alt: "Bedding detail" },
    {
      src: Image1,
      alt: "Evening room ambiance",
    },
    { src: Image2, alt: "Dark room view" },
    { src: Image2, alt: "Window view" },
  ];

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const features = [
    {
      title: "Room Features",
      items: [
        "Bed: King Size Double Bed",
        "Bathroom: Private Bathroom with Bathtub and Shower",
        "Balcony: Private Balcony with seating area",
      ],
    },
    {
      title: "In-Room Facilities",
      items: ["Air Conditioner", "TV (55 inch Smart LED)", "Desk/Workspace"],
    },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="md:p-5 p-7 text-BackgroundColor mt-24">
        <Typography variant={"h1"} className="text-center">
          Duplex Room
        </Typography>

        <Grid container className="mb-8 justify-center">
          {details.map((detail, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box className="flex flex-col items-center text-center">
                <Typography variant="p6" className="mt-4 sm:mt-2 sm:text-sm">
                  {detail.label}
                </Typography>
                <Typography
                  variant="body1"
                  className="sm:text-xs text-AccentColor3"
                >
                  {detail.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box className="grid grid-cols-3 sm:grid-cols-1 gap-4 relative">
          {/* First row */}
          <Box className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Box>

          {/* Center large image */}
          <Box className="relative h-[calc(100%)] row-span-2 rounded-lg overflow-hidden md:col-span-1">
            <img
              src={images[1].src}
              alt={images[1].alt}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Box>

          {/* Right top image */}
          <Box className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={images[2].src}
              alt={images[2].alt}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Box>

          {/* Bottom row */}
          <Box className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={images[3].src}
              alt={images[3].alt}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Box>

          <Box className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={images[4].src}
              alt={images[4].alt}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Box>
        </Box>
        <Box className="py-4">
          <div className="grid grid-cols-2 sm:grid-cols-1 justify-between gap-4 mt-4">
            {/* Features Section */}
            <Grid item xs={12} md={6}>
              {features.map((section, index) => (
                <Box key={index}>
                  <Typography
                    variant={"h4"}
                    className="sm:text-lg font-semibold mb-4"
                  >
                    {section.title}
                  </Typography>
                  <Box component="ul" className="space-y-3 list-disc pl-5">
                    {section.items.map((item, itemIndex) => (
                      <Box component="li" key={itemIndex}>
                        <Typography variant={"h6"} className=" ">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Grid>

            {/* Calendar Section */}
            <Grid item xs={12} md={6}>
              <Box className="bg-[#1a1b23] rounded-lg max-w-sm">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      className="!h-[300px] !w-[90%]"
                      sx={{
                        width: "100%",
                        "& .MuiPickersCalendarHeader-root": {
                          color: "#fff",
                          "& .MuiPickersArrowSwitcher-button": {
                            color: "#fff",
                          },
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                          color: "#9ca3af",
                        },
                        "& .MuiPickersDay-root": {
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </Box>
            </Grid>
          </div>
        </Box>
        <ReviewCarousel />
        <div className="flex justify-center items-center mt-6">
          <Button
            text="Reserve"
            type="submit"
            height="37px"
            customColor={BackgroundColor}
            bgColor={PrimaryColor}
            className="rounded-full px-4 h-auto border-none "
            onClick={() => navigate("/reserve")}
          />
        </div>
      </div>
    </Box>
  );
}
