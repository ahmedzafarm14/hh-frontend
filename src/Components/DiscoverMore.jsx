import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from "@mui/material";
import Button from "../Components/Button";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate";
import Typography from "../Theme/Typography";
import { useGetHostelsForResidentQuery } from "../State/Services/hostelQueries.js";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { residentHostels } from "../State/Slices/hostelSlice.js";

export default function DiscoverMore({ userLocation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostelsFromState = useSelector((state) => state.hostel.hostels);

  // Fetch hostels from API with location - skip first 3 for DiscoverMore section
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

  // Process hostels data - show remaining hostels (skip first 3)
  const processedHostels = hostelsFromState
    ? hostelsFromState.slice(3).map((hostel) => ({
        id: hostel._id,
        name: hostel.name,
        location: hostel.address?.city || "",
        addressDetails: hostel.address?.addressDetails || "",
        image:
          hostel.images && hostel.images.length > 0
            ? hostel.images[0].url
            : "https://via.placeholder.com/300x200?text=Hostel+Image",
        description:
          hostel.description ||
          "Experience comfort and luxury with personalized service, prime locations, and breathtaking views – where unforgettable memories are made.",
        hostelType: hostel.hostelType,
        distance: hostel.distance,
      }))
    : [];

  const handleHostelClick = (hostel) => {
    // Navigate with hostel data
    navigate(`/hostel-details?id=${hostel.id}`, {
      state: { hostelData: hostel },
    });
  };

  return (
    <div className="md:py-4 py-6">
      <Container maxWidth="lg">
        <div className="mx-auto">
          <div className="flex justify-center items-center flex-col mb-8">
            <Typography
              variant={"h1"}
              className="text-BackgroundColor font-bold mb-4"
            >
              Discover More
            </Typography>
            <Typography
              variant={"body1"}
              className="text-AccentColor3 text-center max-w-[260px]"
            >
              Explore exclusive promotions and limited-time offers tailored just
              for you.
            </Typography>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <Typography variant="h6" className="text-red-400 mb-2">
                Failed to load hostels
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Please try again later
              </Typography>
            </div>
          )}

          {/* Hostels Grid */}
          {!isLoading && !error && (
            <div className="grid lg:grid-cols-2 xxm:grid-cols-1 grid-cols-3 gap-6">
              {processedHostels.length > 0 ? (
                processedHostels.map((hostel) => (
                  <Card
                    key={hostel.id}
                    className="group relative overflow-hidden rounded-2xl bg-transparent cursor-pointer h-64 md:h-56"
                    onClick={() => handleHostelClick(hostel)}
                  >
                    <CardActionArea className="h-full">
                      <CardMedia
                        component="img"
                        image={hostel.image}
                        alt={hostel.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                      <CardContent className="p-6 absolute bottom-0 left-0 right-0 text-white">
                        <Typography
                          variant={"h6"}
                          component="div"
                          className="font-semibold mb-2"
                        >
                          {hostel.name}
                        </Typography>
                        {hostel.location && (
                          <Typography
                            variant={"body2"}
                            className="text-gray-300 text-xs mb-1"
                          >
                            {hostel.location}
                          </Typography>
                        )}
                        {hostel.addressDetails && (
                          <Typography
                            variant={"body2"}
                            className="text-gray-400 text-xs mb-1"
                          >
                            {hostel.addressDetails}
                          </Typography>
                        )}
                        {hostel.distance && (
                          <Typography
                            variant={"body2"}
                            className="text-blue-300 text-xs mb-2"
                          >
                            {hostel.distance.toFixed(1)} km away
                          </Typography>
                        )}
                        {hostel.hostelType && (
                          <Typography
                            variant={"body2"}
                            className="text-blue-400 text-xs mb-2"
                          >
                            {hostel.hostelType.charAt(0).toUpperCase() +
                              hostel.hostelType.slice(1)}{" "}
                            Hostel
                          </Typography>
                        )}

                        <div className="flex justify-between items-end">
                          <Typography
                            variant={"body3"}
                            color="textSecondary"
                            className="text-LightBackground"
                          >
                            {hostel.description}
                          </Typography>
                          <Button
                            type="submit"
                            height="34px"
                            width="34px"
                            startIcon={<ArrowOutwardIcon fontSize="small" />}
                            customColor={BackgroundColor}
                            bgColor={PrimaryColor}
                            className="rounded-full h-auto md:text-sm border-none flex justify-center items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHostelClick(hostel);
                            }}
                          />
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    No more hostels available
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    Check back later for new listings
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
