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
import { useSelector, useDispatch } from "react-redux";
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
import { useGetHostelsForResidentQuery } from "../../State/Services/hostelQueries.js";
import Loader from "../../Components/Loader.jsx";
import { residentHostels } from "../../State/Slices/hostelSlice.js";

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

const filterOptions = ["Wifi", "Laundry", "Kitchen", "AC", "TV", "Parking"];

export default function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostelsFromState = useSelector((state) => state.hostel.hostels); // Fixed: was state.hostelSlice.hostels
  const user = useSelector((state) => state.user.user);
  const [createRoom, { isLoading: creatingRoom }] =
    useCreateOrGetRoomMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Get user location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { getUserLocationFromIP } = await import(
          "../../utils/IpLocation.js"
        );
        const result = await getUserLocationFromIP();

        // Format location for API call
        const locationParams = {
          longitude: result.coordinates[0],
          latitude: result.coordinates[1],
        };

        setUserLocation(locationParams);
      } catch (error) {
        console.error("Error fetching location:", error);
        // Set default location if IP location fails
        const defaultLocation = {
          longitude: 78.9629,
          latitude: 20.5937, // Default to India center
        };
        setUserLocation(defaultLocation);
      }
    };
    fetchLocation();
  }, []);

  // Fetch hostels from API with location
  const {
    data: hostelsFromAPI,
    isLoading,
    error,
  } = useGetHostelsForResidentQuery(userLocation, {
    skip: !userLocation, // Skip query if location is not available
  });

  // Save hostels to state when API data is fetched
  useEffect(() => {
    if (hostelsFromAPI) {
      dispatch(residentHostels(hostelsFromAPI));
    }
  }, [hostelsFromAPI, dispatch]);

  // Process and filter hostels
  useEffect(() => {
    if (hostelsFromState && hostelsFromState.length > 0) {
      const processedHostels = hostelsFromState.map((hostel) => ({
        id: hostel._id,
        name: hostel.name,
        location: hostel.address?.city || "", // Fixed: use hostel.address.city instead of hostel.addressId
        addressDetails: hostel.address?.addressDetails || "",
        rating: hostel.rating || 0,
        floors: hostel.floors || 1,
        rooms: hostel.roomTypes?.length || 0,
        price:
          hostel.roomTypes && hostel.roomTypes.length > 0
            ? Math.min(
                ...hostel.roomTypes.map((room) => room.pricePerMonth || 0)
              ) // Fixed: use pricePerMonth
            : 0,
        image:
          hostel.images && hostel.images.length > 0
            ? hostel.images[0].url
            : topImage, // fallback image
        amenities: hostel.amenities || [],
        description: hostel.description,
        hostelType: hostel.hostelType,
        distance: hostel.distance,
        ownerId: hostel.ownerId || hostel.owner?._id, // Add ownerId for chat functionality
        owner: hostel.owner, // Keep the full owner object as backup
      }));

      const filtered = processedHostels.filter(
        (hostel) =>
          (hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hostel.addressDetails
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (selectedFilters.length === 0 ||
            selectedFilters.every((filter) =>
              hostel.amenities.some((amenity) =>
                amenity.toLowerCase().includes(filter.toLowerCase())
              )
            ))
      );
      setFilteredHostels(filtered);
    } else {
      setFilteredHostels([]);
    }
  }, [hostelsFromState, searchTerm, selectedFilters]);

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);
  };

  const handleStartChat = async (hostel) => {
    try {
      console.log("Starting chat with hostel:", hostel); // Debug log

      if (!user || Object.keys(user).length === 0) {
        console.log("No user found, redirecting to login");
        navigate("/login");
        return;
      }

      const participantId = hostel?.ownerId || hostel?.owner?._id;
      console.log("Participant ID:", participantId); // Debug log

      if (!participantId) {
        console.log("No owner info available for this hostel");
        // You could show a toast notification here
        alert("Owner information not available for this hostel");
        return;
      }

      const res = await createRoom({ participantId }).unwrap();
      console.log("Chat room created:", res); // Debug log

      const roomId = res?.data?._id || res?.room?._id || res?._id;
      if (roomId) {
        navigate(`/chat?roomId=${roomId}`);
      } else {
        console.log("No room ID found in response");
        alert("Failed to create chat room");
      }
    } catch (err) {
      console.error("Failed to start chat", err);
      alert("Failed to start chat. Please try again.");
    }
  };

  const handleHostelClick = (hostel) => {
    navigate(`/hostel-details?id=${hostel.id}`, {
      state: { hostelData: hostel },
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, marginTop: 12 }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, marginTop: 12 }}>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Typography variant="h5" className="text-red-600 mb-4">
            Failed to load hostels. Please try again later.
          </Typography>
        </Box>
      </Box>
    );
  }

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
                      <Chip
                        key={value}
                        label={value}
                        sx={{
                          bgcolor: BackgroundColor, // Background color for the chip
                          color: "black", // Text color for the chip (black text)
                          borderColor: "black", // Border color for visibility
                          borderWidth: 1,
                        }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black", // Ensure text inside the select is black
                    backgroundColor: BackgroundColor, // Set background color for select input
                    "& fieldset": {
                      borderColor: "black", // Border color of the select input
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "white", // Only change the color of the dropdown arrow (icon)
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Set label text color to black
                  },
                  "& .MuiMenuItem-root": {
                    color: "black", // Option text color (black text)
                    backgroundColor: "white", // Set a background color to make options stand out
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#f5f5f5", // Slight hover effect for visibility
                  },
                }}
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

        {/* Empty State */}
        {filteredHostels.length === 0 && !isLoading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" className="text-gray-500 mb-2">
              No Hostels Found
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              {searchTerm || selectedFilters.length > 0
                ? "Try adjusting your search or filters."
                : "No hostels are currently available."}
            </Typography>
          </Box>
        )}

        {/* Hotel Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {filteredHostels.map((hostel) => (
            <Card
              key={hostel.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                bgcolor: BackgroundColor,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => handleHostelClick(hostel)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 300 },
                  height: 200,
                  objectFit: "cover",
                }}
                image={hostel.image}
                alt={hostel.name}
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
                        {hostel.name}
                      </Typography>
                      {hostel.location && (
                        <Typography
                          variant={"h6"}
                          className="text-TextColor sm:text-xs"
                        >
                          {hostel.location}
                        </Typography>
                      )}
                      {hostel.addressDetails && (
                        <Typography
                          variant={"body2"}
                          className="text-gray-400 sm:text-xs"
                        >
                          {hostel.addressDetails}
                        </Typography>
                      )}
                      {hostel.distance && (
                        <Typography
                          variant={"body2"}
                          className="text-blue-400 sm:text-xs"
                        >
                          {hostel.distance.toFixed(1)} km away
                        </Typography>
                      )}
                      {hostel.hostelType && (
                        <Typography
                          variant={"body2"}
                          className="text-blue-400 sm:text-xs mt-1"
                        >
                          {hostel.hostelType.charAt(0).toUpperCase() +
                            hostel.hostelType.slice(1)}{" "}
                          Hostel
                        </Typography>
                      )}
                    </Box>

                    <div className="flex gap-2">
                      <Button
                        text="Book Now"
                        type="button"
                        height="auto"
                        width="auto"
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full px-5 h-auto border-none flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHostelClick(hostel);
                        }}
                      />
                      <Button
                        text={creatingRoom ? "Starting..." : "Chat with Owner"}
                        type="button"
                        height="auto"
                        width="auto"
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full px-5 h-auto border-none flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartChat(hostel);
                        }}
                        disabled={!hostel?.ownerId || creatingRoom}
                      />
                    </div>
                  </Box>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < hostel.rating
                            ? "text-RatingColor"
                            : "text-AccentColor3"
                        }`}
                      />
                    ))}
                  </div>
                  {hostel.description && (
                    <Typography
                      variant={"body2"}
                      className="text-AccentColor3 mt-2 line-clamp-2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {hostel.description}
                    </Typography>
                  )}
                  <Box className="flex justify-between flex-row items-center mt-8 xxs:flex-col xxs:gap-4 xxs:items-start">
                    <Typography
                      variant={"body1"}
                      className="text-AccentColor3 sm:text-xs"
                    >
                      {hostel.rooms} Room Types
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
