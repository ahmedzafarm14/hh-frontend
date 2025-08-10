import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import Button from "./Button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ReviewCarousel from "../Components/ReviewCarousel";
import { Card, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  Wifi,
  Kitchen,
  LocalLaundryService,
  People,
  AcUnit,
} from "@mui/icons-material";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Typography from "../Theme/Typography";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "./Loader.jsx";

export default function HotelListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [hostelData, setHostelData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get hostel data from Redux store or location state
  const hostelsFromState = useSelector((state) => state.hostel.hostels);
  const hostelId = searchParams.get("id");

  useEffect(() => {
    if (hostelsFromState && hostelId) {
      const hostel = hostelsFromState.find((h) => h._id === hostelId);
      if (hostel) {
        setHostelData(hostel);
      } else if (location.state?.hostelData) {
        setHostelData(location.state.hostelData);
      }
      setLoading(false);
    } else if (location.state?.hostelData) {
      setHostelData(location.state.hostelData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [hostelsFromState, hostelId, location.state]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (!hostelData) {
    return (
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          mt: 24,
        }}
      >
        <Typography variant="h5" className="text-red-600 mb-4">
          Hostel not found
        </Typography>
        <Button
          text="Go Back"
          type="submit"
          height="37px"
          width="100%"
          customColor={BackgroundColor}
          bgColor={PrimaryColor}
          className="rounded-full px-5 h-auto border-none"
          onClick={() => navigate(-1)}
        />
      </Box>
    );
  }

  // Get hostel images and create dynamic layout
  const hostelImages = hostelData.images || [];
  const imageCount = hostelImages.length;

  // Function to render images based on count
  const renderImages = () => {
    if (imageCount === 0) {
      return (
        <div className="text-center py-12">
          <Typography variant="h6" className="text-gray-400">
            No images available
          </Typography>
        </div>
      );
    }

    if (imageCount === 1) {
      return (
        <div className="grid grid-cols-1 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[400px]">
            <img
              src={hostelImages[0].url}
              alt={`${hostelData.name} - Image 1`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      );
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[300px]">
            <img
              src={hostelImages[0].url}
              alt={`${hostelData.name} - Image 1`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[300px]">
            <img
              src={hostelImages[1].url}
              alt={`${hostelData.name} - Image 2`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      );
    }

    if (imageCount === 3) {
      return (
        <div className="grid grid-cols-3 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[250px]">
            <img
              src={hostelImages[0].url}
              alt={`${hostelData.name} - Image 1`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[250px]">
            <img
              src={hostelImages[1].url}
              alt={`${hostelData.name} - Image 2`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[250px]">
            <img
              src={hostelImages[2].url}
              alt={`${hostelData.name} - Image 3`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      );
    }

    if (imageCount === 4) {
      return (
        <div className="space-y-4">
          {/* Main grid for first 4 images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden h-[300px]">
              <img
                src={hostelImages[0].url}
                alt={`${hostelData.name} - Image 1`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden h-[300px]">
              <img
                src={hostelImages[1].url}
                alt={`${hostelData.name} - Image 2`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <img
                src={hostelImages[2].url}
                alt={`${hostelData.name} - Image 3`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <img
                src={hostelImages[3].url}
                alt={`${hostelData.name} - Image 4`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      );
    }

    // For 5 or more images
    return (
      <div className="space-y-4">
        {/* Main grid for first 4 images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[300px]">
            <img
              src={hostelImages[0].url}
              alt={`${hostelData.name} - Image 1`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[300px]">
            <img
              src={hostelImages[1].url}
              alt={`${hostelData.name} - Image 2`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[200px]">
            <img
              src={hostelImages[2].url}
              alt={`${hostelData.name} - Image 3`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[200px]">
            <img
              src={hostelImages[3].url}
              alt={`${hostelData.name} - Image 4`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[200px]">
            <img
              src={hostelImages[4].url}
              alt={`${hostelData.name} - Image 5`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        {/* Show remaining images if any */}
        {imageCount > 5 && (
          <div className="grid grid-cols-4 gap-4">
            {hostelImages.slice(5, 9).map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-[150px]"
              >
                <img
                  src={image.url}
                  alt={`${hostelData.name} - Image ${index + 6}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="text-BackgroundColor md:p-5 p-7 mt-24 space-y-4">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          
          <Typography variant={"h1"}>{hostelData.name}</Typography>
          <Typography variant="body1" className="my-3 sm:my-2 sm:text-xs">
            {hostelData.address?.district || ""}
          </Typography>
          {hostelData.address?.addressDetails && (
            <Typography variant="body2" className="text-gray-400 sm:text-xs">
              {hostelData.address.addressDetails}
            </Typography>
          )}
          {hostelData.distance && (
            <Typography variant="body2" className="text-blue-400 sm:text-xs">
              {hostelData.distance.toFixed(1)} km away
            </Typography>
          )}
        </div>

        {/* Dynamic Photo Grid */}
        <div className="mb-8">{renderImages()}</div>
      </div>

      <div className="md:p-5 p-7">
        {/* Welcome Section */}
        <div className="mb-8 text-BackgroundColor">
          <Typography variant={"body1"} className="text-md">
            {hostelData.description ||
              `Welcome to ${
                hostelData.name
              }, a vibrant and welcoming haven located in the heart of ${
                hostelData.address?.city || "the city"
              }. Our hostel combines modern amenities with a cozy, communal atmosphere, making it the perfect spot for solo travelers, backpackers, and small groups alike.`}
          </Typography>
        </div>

        {/* Facilities Section */}
        <div className="mb-8 text-BackgroundColor">
          <Typography variant={"h5"} className="sm:text-lg font-semibold mb-4">
            Most Popular Facilities
          </Typography>
          <div className="grid md:grid-cols-2 grid-cols-5 gap-4">
            {hostelData.amenities && hostelData.amenities.length > 0 ? (
              hostelData.amenities.map((amenity, index) => (
                <Typography
                  key={index}
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  {amenity.toLowerCase().includes("wifi") && (
                    <Wifi fontSize="small" />
                  )}
                  {amenity.toLowerCase().includes("kitchen") && (
                    <Kitchen fontSize="small" />
                  )}
                  {amenity.toLowerCase().includes("laundry") && (
                    <LocalLaundryService fontSize="small" />
                  )}
                  {amenity.toLowerCase().includes("common") && (
                    <People fontSize="small" />
                  )}
                  {amenity.toLowerCase().includes("air") && (
                    <AcUnit fontSize="small" />
                  )}
                  {amenity}
                </Typography>
              ))
            ) : (
              <>
                <Typography
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  <Wifi fontSize="small" /> Wifi
                </Typography>
                <Typography
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  <Kitchen fontSize="small" /> Kitchen
                </Typography>
                <Typography
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  <LocalLaundryService fontSize="small" /> Laundry
                </Typography>
                <Typography
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  <People fontSize="small" /> Common Area
                </Typography>
                <Typography
                  variant={"body1"}
                  className="flex items-center gap-2"
                >
                  <AcUnit fontSize="small" /> Air Condition
                </Typography>
              </>
            )}
          </div>
        </div>

        {/* Room Types Section */}
        <div className="mb-8">
          <div className="mb-4 text-BackgroundColor">
            <Typography variant={"h5"} className="sm:text-lg font-semibold">
              Room Types
            </Typography>
          </div>

          <div className="space-y-4 text-BackgroundColor">
            {hostelData.roomTypes && hostelData.roomTypes.length > 0 ? (
              hostelData.roomTypes.map((roomType, index) => (
                <Card key={index} className="!bg-BackgroundColor !rounded-lg">
                  <div className="flex justify-between items-center p-4">
                    <div className="text-TextColor">
                      <Typography
                        variant={"h6"}
                        className="font-semibold sm:text-md"
                      >
                        {roomType.type}
                      </Typography>
                      <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 px-2 pt-2">
                        <Typography variant={"body1"} className="sm:text-md">
                          Rs. {roomType.pricePerMonth?.toLocaleString()} per
                          month
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="!bg-BackgroundColor !rounded-lg">
                <div className="flex justify-between items-center p-4">
                  <div className="text-TextColor">
                    <Typography
                      variant={"h6"}
                      className="font-semibold sm:text-md"
                    >
                      Standard Room
                    </Typography>
                    <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 px-2 pt-2">
                      <Typography variant={"body1"} className="sm:text-md">
                        Contact for pricing
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Booking Button Section */}
        <div className="text-center mb-8">
          <Button
            text="Book Now"
            type="submit"
            height="50px"
            width="200px"
            customColor={BackgroundColor}
            bgColor={PrimaryColor}
            className="rounded-full px-8 h-auto border-none text-lg font-semibold"
            onClick={() =>
              navigate("/reserve", {
                state: { hostelData: hostelData },
              })
            }
          />
        </div>

      </div>
    </Box>
  );
}
