import Image1 from "../Assets/Images/image2svg.svg";
import Image3 from "../Assets/Images/image3.svg";
import Image2 from "../Assets/Images/image1.svg";
import Image4 from "../Assets/Images/image4.svg";
import Map from "../Assets/Images/map.png";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ReviewCarousel from "../Components/ReviewCarousel";
import { Card, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  Wifi,
  Kitchen,
  LocalLaundryService,
  People,
  AcUnit,
  LocationOn,
} from "@mui/icons-material";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Typography from "../Theme/Typography";
import { Box } from "@mui/material";

export default function HotelListing() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="text-BackgroundColor md:p-5 p-7 mt-24 space-y-4">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center gap-1">
            <StarIcon className="w-5 h-5 fill-RatingColor text-RatingColor" />
            <StarIcon className="w-5 h-5 text-AccentColor3" />
            <StarIcon className="w-5 h-5 text-AccentColor3" />
            <StarIcon className="w-5 h-5 text-AccentColor3" />
            <StarIcon className="w-5 h-5 text-AccentColor3" />
          </div>
          <Typography variant={"h1"}>Oasis Lodge</Typography>
          <Typography variant="body1" className="my-3 sm:my-2 sm:text-xs">
            Old Anarkali, Lahore
          </Typography>
        </div>

        {/* Photo Grid */}
        <div className="grid sm:grid-cols-1 grid-cols-2 gap-4">
          {/* Left Column - Stacked Images */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <img
                src={Image1}
                alt="Hotel hallway"
                fill
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden h-[200px]">
              <img
                src={Image3}
                alt="Hotel bedroom"
                fill
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Column - Large Feature Image */}
          <div className="relative rounded-lg overflow-hidden ">
            <img
              src={Image2}
              alt="Hotel exterior"
              fill
              className="object-cover h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
          <div className="relative rounded-lg overflow-hidden h-[150px]">
            <img
              src={Image1}
              alt="Sitting area"
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[150px]">
            <img
              src={Image4}
              alt="City view"
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden h-[150px]">
            <img
              src={Image3}
              alt="Bedroom view"
              className="object-cover w-full h-full"
            />
            {/* File Uploader Button */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center underline">
              <label htmlFor="file-upload" className="cursor-pointer p-4">
                <div className="text-BackgroundColor text-3xl">
                  <span>
                    {uploadedFiles.length > 0
                      ? `${uploadedFiles.length} Photos`
                      : "+10 Photos"}
                  </span>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:p-5 p-7">
        {/* Welcome Section */}
        <div className="grid col-span-12 grid-cols-12 gap-6 mb-8 text-BackgroundColor">
          <div className=" grid col-span-8 lg:col-span-12">
            <Typography variant={"body1"} className="text-md">
              Welcome to <span className="font-semibold">[Hostel Hub]</span>, a
              vibrant and welcoming haven located in the heart of [City]. Our
              hostel combines modern amenities with a cozy, communal atmosphere,
              making it the perfect spot for solo travelers, backpackers, and
              small groups alike. Relax in our comfortable rooms, enjoy
              complimentary Wi-Fi, and explore nearby attractions with ease. Our
              friendly staff is always ready to help with travel tips, local
              recommendations, and special events to enhance your stay. At
              [Hostel Hub], we're committed to making your visit unforgettable.
            </Typography>
          </div>
          <div className="relative h-[180px] grid col-span-4 lg:col-span-12 rounded-lg overflow-hidden ">
            <img
              src={Map}
              alt="Location Map"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            <div className="flex justify-center items-center absolute inset-0">
              <Button
                text="Show on Map"
                type="submit"
                height="37px"
                startIcon={<LocationOn fontSize="small" />}
                customColor={BackgroundColor}
                bgColor={PrimaryColor}
                className="rounded-full px-4 h-auto border-none "
              />
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mb-8 text-BackgroundColor">
          <Typography variant={"h5"} className="sm:text-lg font-semibold mb-4">
            Most Popular Facilities
          </Typography>
          <div className="grid md:grid-cols-2 grid-cols-5 gap-4">
            <Typography variant={"body1"} className="flex items-center gap-2">
              <Wifi fontSize="small" /> Wifi
            </Typography>
            <Typography variant={"body1"} className="flex items-center gap-2">
              <Kitchen fontSize="small" /> Kitchen
            </Typography>
            <Typography variant={"body1"} className="flex items-center gap-2">
              <LocalLaundryService fontSize="small" /> Laundry
            </Typography>
            <Typography variant={"body1"} className="flex items-center gap-2">
              <People fontSize="small" /> Common Area
            </Typography>
            <Typography variant={"body1"} className="flex items-center gap-2">
              <AcUnit fontSize="small" /> Air Condition
            </Typography>
          </div>
        </div>

        {/* Room Types Section */}
        <>
          <div className="flex justify-between items-center mb-4 text-BackgroundColor">
            <Typography variant={"h5"} className="sm:text-lg font-semibold">
              Room Types
            </Typography>
            <FormControl size="small" className="min-w-[150px]">
              <InputLabel id="filter-label" className="!text-BackgroundColor">
                Filter By:
              </InputLabel>
              <Select
                labelId="filter-label"
                label="Filter By:"
                defaultValue="air"
                className="!text-BackgroundColor !text-sm !border-BackgroundColor"
              >
                <MenuItem value="air" className="!text-sm">
                  Single Bed
                </MenuItem>
                <MenuItem value="air" className="!text-sm">
                  Double Bed
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="space-y-4 text-BackgroundColor">
            {/* Duplex Room Card */}
            <Card className="!bg-BackgroundColor !rounded-lg">
              <div className="flex justify-between items-center p-4">
                <div className="text-TextColor">
                  <Typography
                    variant={"h6"}
                    className=" font-semibold sm:text-md"
                  >
                    Duplex Room
                  </Typography>
                  <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 px-2 pt-2">
                    <Typography variant={"body1"} className="sm:text-md">
                      1 Large Bed
                    </Typography>
                    <Typography variant={"body1"} className="  sm:text-md">
                      Private Bathroom
                    </Typography>
                  </div>
                </div>
                <Button
                  text="Know More"
                  type="submit"
                  height="37px"
                  width="100%"
                  customColor={BackgroundColor}
                  bgColor={PrimaryColor}
                  className="rounded-full px-4 h-auto border-none"
                  onClick={() => navigate("/room-details")}
                />
              </div>
            </Card>

            {/* Budget Room Card */}
            <Card className="!bg-BackgroundColor !rounded-lg">
              <div className="flex justify-between items-center p-4">
                <div className="text-TextColor">
                  <Typography
                    variant={"h6"}
                    className="font-semibold sm:text-md"
                  >
                    Budget Room
                  </Typography>
                  <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 px-2 pt-2">
                    <Typography variant={"body1"} className="sm:text-md">
                      1 Single Bed
                    </Typography>
                  </div>
                </div>
                <Button
                  text="Know More"
                  type="submit"
                  height="37px"
                  width="100%"
                  customColor={BackgroundColor}
                  bgColor={PrimaryColor}
                  className="rounded-full px-4 h-auto border-none"
                  onClick={() => navigate("/room-details")}
                />
              </div>
            </Card>
          </div>
        </>
        <ReviewCarousel />
      </div>
    </Box>
  );
}
