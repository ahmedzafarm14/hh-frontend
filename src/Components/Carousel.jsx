import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Button from "../Components/Button";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate";
import Typography from "../Theme/Typography";
import Hostel from "../Assets/Images/hostel.jpg";
import Hostel1 from "../Assets/Images/hostel1.jpg";
import Hostel2 from "../Assets/Images/hostel2.jpg";

const items = [
  {
    image: Hostel,
  },
  {
    image: Hostel1,
  },
  {
    image: Hostel2,
  },
];

const CarouselComponent = () => {
  return (
    <Carousel
      fullHeightHover
      autoPlay
      indicators={false}
      navButtonsAlwaysVisible
      swipe
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  const { item } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens
  const navigate = useNavigate();

  return (
    <Paper
      style={{
        position: "relative",
        height: isSmallScreen ? "300px" : "600px", // Adjust height for small screens
        backgroundImage: `url(${item.image})`,
        backgroundSize: isSmallScreen ? "contain" : "cover", // Adjust background size
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",

          backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay effect for readability
        }}
      >
        <div className="max-w-[500px] sm:max-w-[280px]">
          <Typography variant={"h1"} className="text-3xl sm:text-lg">
            Your Perfect Stay Awaits - Comfort, Community, Explore
          </Typography>
          <Typography variant="body1" className="my-3 sm:my-2 sm:text-xs">
            Book your ideal hostel experience – affordable stays, unforgettable
            memories.
          </Typography>
          <Button
            text="Book Now"
            type="submit"
            height="37px"
            width="100px"
            customColor={BackgroundColor}
            bgColor={PrimaryColor}
            className="rounded-full px-2 h-auto border-none"
            onClick={() => navigate("/hostels")}
          />
        </div>
      </div>
    </Paper>
  );
}

export default CarouselComponent;
