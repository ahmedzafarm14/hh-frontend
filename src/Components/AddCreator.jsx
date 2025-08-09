import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "../Theme/Typography";
import InputField from "../Components/InputField.jsx";
import Button from "./Button.jsx";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate.js";
import TextAreaComponent from "../Components/TextArea.jsx";
import MapImage from "../Assets/Images/map.svg";

export default function AdCreator({ onClose, onUpload }) {
  const [files, setFiles] = useState([]);
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    beds: 2,
    bath: 1,
    person: 2,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    onUpload(adData);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    if (uploadedFiles.length > 0) {
      setFiles(uploadedFiles);
    }
  };

  const handleBrowse = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length > 0) {
      setFiles(uploadedFiles);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container mx-auto p-2">
      <IconButton onClick={onClose}>
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <div className="flex md:flex-col flex-row gap-8">
        {/* AdCreator content */}
        <div className="md:w-full w-1/2 space-y-3">
          <Typography variant="h5" className="font-bold">
            Media Upload
          </Typography>
          <Typography variant="body1" className="mb-3 text-AccentColor3">
            Add your documents here, and you can upload up to 5 files max
          </Typography>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              multiple
              onChange={handleBrowse}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <CloudUploadIcon className="text-PrimaryColor mb-2" />
              <Typography variant="body1">
                Drag your file(s) or browse
              </Typography>
            </label>
            <Typography variant="body1" className="mt-2 text-AccentColor3">
              Max 10 MB files are allowed
            </Typography>
            <div className="mt-4">
              {files.length > 0 && (
                <Typography variant="body2">
                  {files.map((file) => file.name).join(", ")}
                </Typography>
              )}
            </div>
          </div>
          <Typography variant="body1" className="text-AccentColor3">
            Only support .jpg .png and .svg and zip files
          </Typography>
          <div className="flex-col w-full">
            <Typography variant={"body1"}>AD Title</Typography>
            <InputField
              height="40px"
              width="100%"
              placeholder="Enter Your Ad Title"
              isRequired={true}
              type="text"
              onChange={handleInputChange}
              name="title"
              value={adData.title}
            />
          </div>
          <div className="flex flex-col">
            <Typography variant={"body1"}>Description</Typography>
            <TextAreaComponent
              name="description"
              placeholder="Description"
              rows={5}
              onChange={handleInputChange}
              value={adData.description}
            />
          </div>
          <div>
            <Typography variant="subtitle1" className="mb-2">
              Persons
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {["01", "02", "03", "04", "More"].map((item) => (
                <Chip key={item} label={item} variant="outlined" />
              ))}
            </div>
          </div>
          <div className="flex-col w-full">
            <Typography variant={"body1"}>Price</Typography>
            <InputField
              height="40px"
              width="100%"
              isRequired={true}
              placeholder="Enter Your Price"
              type="text"
              onChange={handleInputChange}
              name="price"
              value={adData.price}
            />
          </div>
          <div>
            <Typography variant="subtitle1" className="mb-2">
              Age
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {["5-10", "10-18", "18-24", "24-45", "45-60"].map((range) => (
                <Chip key={range} label={range} variant="outlined" />
              ))}
            </div>
          </div>
          <div className="flex-col w-full">
            <Typography variant={"body1"}>Location</Typography>
            <InputField
              height="40px"
              width="100%"
              isRequired={true}
              placeholder="Enter Location"
              type="text"
              onChange={handleInputChange}
              name="location"
              value={adData.location}
            />
          </div>

          <img src={MapImage} className="w-full" alt="mapImage" />
          <Button
            text="Upload"
            type="submit"
            height="40px"
            width="100%"
            customColor={BackgroundColor}
            bgColor={PrimaryColor}
            onClick={handleUpload}
          />
        </div>

        {/* Right Column */}
        <div className="md:w-full w-1/2 space-y-4">
          <Typography variant="h5" component="h2" className="font-bold mb-4">
            Preview
          </Typography>
          <div className="bg-BackgroundColor rounded-lg h-96 sm:h-60 flex items-center justify-center">
            <Typography variant="h4" color="textSecondary">
              Your Ad
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className="mb-2">
              Reach
            </Typography>
            <Chip label="1k-10k" variant="outlined" />
          </div>
          <div>
            <Typography variant="subtitle1" className="mb-2">
              Location
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {Array(5)
                .fill("Lahore")
                .map((city, index) => (
                  <Chip key={index} label={city} variant="outlined" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
