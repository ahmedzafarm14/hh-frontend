import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { Search as SearchIcon } from "@mui/icons-material";
import Typography from "../../Theme/Typography";
import {
  BackgroundColor,
  PrimaryColor,
  TextColor,
} from "../../Theme/ColorBoilerplate";
import Button from "../../Components/Button";
import { useCreateOrGetRoomMutation } from "../../State/Services/chatQueries.js";
import topImage from "../../Assets/Images/topimage.svg";
import topImage1 from "../../Assets/Images/topimage1.svg";
import topImage2 from "../../Assets/Images/topimage2.svg";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const filterOptions = ["Wifi", "Laundry", "Kitchen", "Air Condition"];

const initialHotels = [
  {
    id: 1,
    name: "Oasis Lodge",
    location: "Old Anarkali, Lahore",
    rating: 1,
    floors: 5,
    rooms: 38,
    price: 2000,
    image: topImage,
    ownerId: "689794db172ebecf9f990ac9",
    amenities: ["Wifi", "Kitchen"],
  },
  {
    id: 2,
    name: "Century Hostel",
    location: "Near Cantt, Lahore",
    rating: 3,
    floors: 3,
    rooms: 18,
    price: 5000,
    ownerId: "689794db172ebecf9f990ac9",
    image: topImage1,
    amenities: ["Wifi", "Laundry", "Air Condition"],
  },
  {
    id: 3,
    name: "BackPacker’s Haven",
    location: "Valancia, Lahore",
    rating: 2,
    floors: 4,
    rooms: 24,
    ownerId: "689794db172ebecf9f990ac9",
    price: 8000,
    image: topImage2,
    amenities: ["Wifi", "Laundry", "Air Condition"],
  },
];

export default function Component() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [createRoom, { isLoading: creatingRoom }] = useCreateOrGetRoomMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hotels, setHotels] = useState(initialHotels);

  useEffect(() => {
    const filteredHotels = initialHotels.filter(
      (hotel) =>
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFilters.length === 0 ||
          selectedFilters.every((filter) => hotel.amenities.includes(filter)))
    );
    setHotels(filteredHotels);
  }, [searchTerm, selectedFilters]);

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);
  };

  const handleStartChat = async (hotel) => {
    try {
      if (!user || Object.keys(user).length === 0) {
        navigate("/login");
        return;
      }
      const participantId = hotel?.ownerId || hotel?.owner?._id || hotel?.ownerId?.toString?.();
      if (!participantId) {
        // No owner info available in demo data; block action gracefully
        return;
      }
      const res = await createRoom({ participantId }).unwrap();
      const roomId = res?.data?._id || res?.room?._id || res?._id;
      if (roomId) {
        navigate(`/chat?roomId=${roomId}`);
      }
    } catch (err) {
      console.error("Failed to start chat", err);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        marginTop: 12,
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", color: BackgroundColor }}>
          <Typography variant={"h1"}>Find Your Perfect Stay</Typography>
          <div className="max-w-[280px] mx-auto">
            <Typography variant="body1" className="my-3 sm:my-2 sm:text-xs">
              Hostels for Unmatched Comfort and Memorable Experiences
            </Typography>
          </div>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: "500px",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px",
                bgcolor: BackgroundColor,
                color: TextColor,
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="text-TextColor" />
                </InputAdornment>
              ),
            }}
          />

          {/* Filters */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <FormControl sx={{ minWidth: 130 }}>
              <InputLabel id="filter-label" className="!text-white text-xs">
                Filter By
              </InputLabel>
              <Select
                labelId="filter-label"
                multiple
                value={selectedFilters}
                size="small"
                onChange={handleFilterChange}
                input={<OutlinedInput label="Filter By" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Hotel Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                bgcolor: BackgroundColor,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 300 },
                  height: 200,
                  objectFit: "cover",
                }}
                image={hotel.image}
                alt={hotel.name}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  p: 3,
                  color: TextColor,
                }}
              >
                <div sx={{ flex: "1 0 auto", p: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant={"h4"}
                        className="sm:text-base font-semibold mb-1"
                      >
                        {hotel.name}
                      </Typography>
                      <Typography
                        variant={"h6"}
                        className="text-TextColor sm:text-xs"
                      >
                        {hotel.location}
                      </Typography>
                    </Box>
                    <div className="flex gap-2">
                      <Button
                        text="Book Now"
                        type="submit"
                        height="37px"
                        width="100%"
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full px-5 h-auto border-none"
                        onClick={() => navigate("/hostel-details")}
                      />
                      <Button
                        text={creatingRoom ? "Starting..." : "Chat with Owner"}
                        type="button"
                        height="37px"
                        width="100%"
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full px-5 h-auto border-none"
                        onClick={() => handleStartChat(hotel)}
                        disabled={!hotel?.ownerId || creatingRoom}
                      />
                    </div>
                  </Box>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < hotel.rating
                            ? "text-RatingColor"
                            : "text-AccentColor3"
                        }`}
                      />
                    ))}
                  </div>
                  <Box className="flex justify-between flex-row items-center mt-8 xxs:flex-col xxs:gap-4 xxs:items-start">
                    <Typography
                      variant={"body1"}
                      className="text-AccentColor3 sm:text-xs"
                    >
                      {hotel.floors} Floors • {hotel.rooms} Rooms
                    </Typography>
                    <Typography
                      variant={"h6"}
                      className="text-TextColor sm:text-sm"
                    >
                      Starting from
                      <span className="text-PrimaryColor text-xl ml-1 sm:text-base">
                        Rs. {hotel.price.toLocaleString()}
                      </span>
                    </Typography>
                  </Box>
                </div>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
