import { Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Button from "./Button";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate";
import topImage from "../Assets/Images/topimage.svg";
import Typography from "../Theme/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useGetHostelsForResidentQuery } from "../State/Services/hostelQueries.js";
import Loader from "./Loader.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { residentHostels } from "../State/Slices/hostelSlice.js";

export default function Component({ userLocation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostelsFromState = useSelector((state) => state.hostel.hostels);

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

  const stats = [
    {
      number: "2+",
      title: "Years of Experience",
      description: "Reliable & proven excellence",
    },
    {
      number: "50+",
      title: "Students Satisfied",
      description: "Enjoy safe & clean environment",
    },
    {
      number: hostelsFromState?.length || "50+",
      title: "Hostels Available",
      description: "Find your perfect stay today",
    },
  ];

  // Process hostels data - show first 3 for Explore section
  const processedHostels = hostelsFromState
    ? hostelsFromState.slice(0, 3).map((hostel) => ({
        id: hostel._id,
        name: hostel.name,
        location: hostel.address?.city || "",
        addressDetails: hostel.address?.addressDetails || "",
        image:
          hostel.images && hostel.images.length > 0
            ? hostel.images[0].url
            : topImage,
        rating: hostel.rating || 0,
        description: hostel.description,
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
    <div className="md:pt-6 pt-8">
      {/* Stats Section */}
      <Container maxWidth="lg">
        <div className="bg-white/10 rounded-full sm:rounded-3xl md:p-4 p-8 mb-12">
          <div className="grid sm:grid-cols-1 grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <Typography
                  variant={"h3"}
                  className="text-BackgroundColor font-bold mb-2"
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant={"h4"}
                  className="text-BackgroundColor font-semibold md:text-base mb-1"
                >
                  {stat.title}
                </Typography>
                <Typography variant={"body1"} className="text-LightBackground">
                  {stat.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-12">
          <div className="flex justify-center items-center flex-col">
            <Typography
              variant={"h1"}
              className="mb-4 text-center text-BackgroundColor font-bold"
            >
              Explore Top Listing
            </Typography>
            <Typography
              variant={"body1"}
              className="text-AccentColor3 text-center max-w-72"
            >
              Hostels for Unmatched Comfort and Memorable Experiences
            </Typography>
          </div>
          <div className="flex justify-end items-end mb-4">
            <Button
              text="View All"
              type="submit"
              height="37px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md px-5 h-auto border-none"
              onClick={() => navigate("/hostels")}
            />
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
            <div className="grid xxm:grid-cols-1 grid-cols-3 gap-6">
              {processedHostels.length > 0 ? (
                processedHostels.map((hostel, index) => (
                  <Card
                    key={hostel.id || index}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleHostelClick(hostel)}
                  >
                    <img
                      src={hostel.image}
                      alt={hostel.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <Typography
                        variant={"h4"}
                        className="md:text-base font-semibold mb-1"
                      >
                        {hostel.name}
                      </Typography>
                      {hostel.location && (
                        <Typography
                          variant={"h6"}
                          className="text-AccentColor3 md:text-xs mb-1"
                        >
                          {hostel.location}
                        </Typography>
                      )}
                      {hostel.addressDetails && (
                        <Typography
                          variant={"body2"}
                          className="text-gray-500 md:text-xs mb-1"
                        >
                          {hostel.addressDetails}
                        </Typography>
                      )}
                      {hostel.distance && (
                        <Typography
                          variant={"body2"}
                          className="text-blue-400 md:text-xs mb-2"
                        >
                          {hostel.distance.toFixed(1)} km away
                        </Typography>
                      )}
                      {hostel.hostelType && (
                        <Typography
                          variant={"body2"}
                          className="text-blue-400 md:text-xs mb-2"
                        >
                          {hostel.hostelType.charAt(0).toUpperCase() +
                            hostel.hostelType.slice(1)}{" "}
                          Hostel
                        </Typography>
                      )}
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
                    </CardContent>
                    <div className="px-4 pb-4 flex justify-end">
                      <Button
                        text="More Details"
                        type="submit"
                        height="37px"
                        width="140px"
                        startIcon={
                          <ArrowOutwardIcon className="ml-2" fontSize="small" />
                        }
                        customColor={BackgroundColor}
                        bgColor={PrimaryColor}
                        className="rounded-full px-2 h-auto md:text-sm border-none flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHostelClick(hostel);
                        }}
                      />
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    No hostels available
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
