import React, { useState, useCallback } from "react";
import { IconButton, Chip, Box, Grid, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "../Theme/Typography.jsx";
import InputField from "./InputField.jsx";
import Button from "./Button.jsx";
import { PrimaryColor, BackgroundColor } from "../Theme/ColorBoilerplate.js";
import TextAreaComponent from "./TextArea.jsx";
import Dropdown from "./Dropdown.jsx";
import getLocation from "../utils/Location.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../State/Slices/messageHandlerSlice.js";
import { addHostel as addHostelToState } from "../State/Slices/hostelSlice.js";
import { useAddHostelMutation } from "../State/Services/hostelQueries.js";
import Loader from "./Loader.jsx";
import SuccessMessage from "./SuccessMessage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

const roomTypes = [
  { id: "1-seater", label: "1-seater", defaultPrice: 10000 },
  { id: "2-seater", label: "2-seater", defaultPrice: 15000 },
  { id: "3-seater", label: "3-seater", defaultPrice: 18000 },
  { id: "4-seater", label: "4-seater", defaultPrice: 22000 },
];

const amenitiesList = [
  "WiFi",
  "AC",
  "Heating",
  "Laundry",
  "Kitchen",
  "TV",
  "Parking",
  "Security",
  "Cleaning",
  "Study Area",
];

const hostelTypeOptions = [
  { value: "boys", label: "Boys Hostel" },
  { value: "girls", label: "Girls Hostel" },
  { value: "mixed", label: "Mixed Hostel" },
];

export default function HostelCreator({ onClose, onUpload }) {
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );
  const [addHostel, { isLoading: isAddingHostel }] = useAddHostelMutation();

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [adData, setAdData] = useState({
    name: "",
    description: "",
    hostelType: "",
    roomTypes: roomTypes.reduce((acc, type) => {
      acc[type.id] = { available: false, price: type.defaultPrice };
      return acc;
    }, {}),
    amenities: [],
    location: {
      city: "",
      district: "",
      postalCode: "",
      addressDetails: "",
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHostelTypeChange = (event) => {
    setAdData((prev) => ({ ...prev, hostelType: event.target.value }));
  };

  const handleRoomTypeChange = (roomTypeId, field, value) => {
    setAdData((prev) => ({
      ...prev,
      roomTypes: {
        ...prev.roomTypes,
        [roomTypeId]: {
          ...prev.roomTypes[roomTypeId],
          [field]: field === "price" ? parseInt(value, 10) : value,
        },
      },
    }));
  };

  const toggleAmenity = (amenity) => {
    setAdData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = 6 - files.length;

    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.slice(0, remainingSlots);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      const newPreviews = newFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleGetLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    dispatch(clearMessages());
    try {
      const location = await getLocation();
      setAdData((prev) => ({
        ...prev,
        location: {
          city: location.city,
          district: location.district,
          postalCode: location.postalCode,
          addressDetails: location.addressDetails,
          location: {
            type: "Point",
            coordinates: location.location.coordinates,
          },
        },
      }));

      dispatch(setSuccessMessage("Location fetched successfully"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    } catch (error) {
      dispatch(setErrorMessage("Failed to fetch location"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    } finally {
      setIsLoadingLocation(false);
    }
  }, [dispatch]);

  const handleSubmit = async () => {
    dispatch(clearMessages());

    if (!adData.name.trim()) {
      dispatch(setErrorMessage("Please enter hostel name"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    if (!adData.description.trim()) {
      dispatch(setErrorMessage("Please enter hostel description"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    if (!adData.hostelType) {
      dispatch(setErrorMessage("Please select hostel type"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    if (files.length === 0) {
      dispatch(setErrorMessage("Please upload at least one image"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    const hasRoomType = Object.values(adData.roomTypes).some(
      (room) => room.available
    );
    if (!hasRoomType) {
      dispatch(setErrorMessage("Please select at least one room type"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    const selectedRoomTypes = Object.entries(adData.roomTypes).filter(
      ([_, room]) => room.available
    );
    const hasAllPrices = selectedRoomTypes.every(
      ([_, room]) => room.price && parseFloat(room.price) > 0
    );
    if (!hasAllPrices) {
      dispatch(
        setErrorMessage("Please enter prices for all selected room types")
      );
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();

      // Filter out room types that are not available
      const selectedRoomTypes = Object.entries(adData.roomTypes).reduce(
        (acc, [roomTypeId, roomData]) => {
          if (roomData.available) {
            acc[roomTypeId] = roomData;
          }
          return acc;
        },
        {}
      );

      const hostelData = {
        name: adData.name,
        description: adData.description,
        hostelType: adData.hostelType,
        roomTypes: selectedRoomTypes,
        amenities: adData.amenities,
      };

      const locationData = {
        city: adData.location.city || "",
        district: adData.location.district || "",
        addressDetails: adData.location.addressDetails || "",
        postalCode: adData.location.postalCode || "",
        location: {
          type: "Point",
          coordinates: adData.location.location.coordinates,
        },
      };

      formData.append("hostel", JSON.stringify(hostelData));
      formData.append("location", JSON.stringify(locationData));

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await addHostel(formData).unwrap();
      console.log(response);
      dispatch(setSuccessMessage("Hostel created successfully!"));
      dispatch(addHostelToState(response.hostel || response));

      if (onUpload) {
        onUpload(response);
      }

      setTimeout(() => {
        dispatch(clearMessages());
        onClose();
      }, 2000);
    } catch (error) {
      let errorMsg = "Failed to create hostel. Please try again.";

      if (error?.data?.message) {
        errorMsg = error.data.message;
      } else if (error?.error) {
        errorMsg = error.error;
      } else if (error?.status === 400) {
        errorMsg = "Invalid data provided. Please check your inputs.";
      } else if (error?.status === 401) {
        errorMsg = "You are not authorized to perform this action.";
      } else if (error?.status === 403) {
        errorMsg = "Access denied. Please check your permissions.";
      } else if (error?.status === 500) {
        errorMsg = "Server error. Please try again later.";
      }

      dispatch(setErrorMessage(errorMsg));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {(isAddingHostel || isLoadingLocation) && <Loader />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <IconButton
              onClick={onClose}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
              disabled={isAddingHostel}
            >
              <ArrowBackIcon />
            </IconButton>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900">
                Create New Hostel
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Fill in the details below to create your hostel listing
              </Typography>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Basic Information
              </Typography>
            </div>

            <div className="space-y-4">
              <div>
                <Typography
                  variant="body1"
                  className="font-medium text-gray-700 mb-2"
                >
                  Hostel Name *
                </Typography>
                <InputField
                  height="48px"
                  width="100%"
                  placeholder="Enter your hostel name"
                  isRequired={true}
                  type="text"
                  name="name"
                  value={adData.name}
                  onChange={handleInputChange}
                  disabled={isAddingHostel}
                />
              </div>

              <div>
                <Typography
                  variant="body1"
                  className="font-medium text-gray-700 mb-2"
                >
                  Description *
                </Typography>
                <TextAreaComponent
                  name="description"
                  placeholder="Describe your hostel, facilities, and what makes it special..."
                  rows={4}
                  value={adData.description}
                  onChange={handleInputChange}
                  disabled={isAddingHostel}
                />
              </div>

              <div>
                <Typography
                  variant="body1"
                  className="font-medium text-gray-700 mb-2"
                >
                  Hostel Type *
                </Typography>
                <Dropdown
                  value={adData.hostelType}
                  onSelectChange={handleHostelTypeChange}
                  options={hostelTypeOptions}
                  placeholder="Select hostel type"
                />
              </div>
            </div>
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">2</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Hostel Images
              </Typography>
              <span className="text-sm text-gray-500">({files.length}/6)</span>
            </div>

            {files.length < 6 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="hostel-images"
                  accept="image/*"
                  disabled={isAddingHostel}
                />
                <label htmlFor="hostel-images" className="cursor-pointer">
                  <CloudUploadIcon
                    className="text-blue-500 mb-4"
                    style={{ fontSize: 64 }}
                  />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-700 mb-2"
                  >
                    Upload Images
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-1">
                    Drag and drop images here or click to browse
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    You can select one or multiple images at once • Max 6 images
                    • JPEG, PNG, SVG
                  </Typography>
                </label>
              </div>
            )}

            {previews.length > 0 && (
              <div>
                <Typography
                  variant="body1"
                  className="font-medium text-gray-700 mb-3"
                >
                  Uploaded Images
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <IconButton
                          onClick={() => removeImage(index)}
                          className="opacity-0 group-hover:opacity-100 bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                          size="small"
                          disabled={isAddingHostel}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">3</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Room Types & Pricing *
              </Typography>
            </div>

            <div className="space-y-3">
              {roomTypes.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`room-${room.id}`}
                      checked={adData.roomTypes[room.id].available}
                      onChange={(e) =>
                        handleRoomTypeChange(
                          room.id,
                          "available",
                          e.target.checked
                        )
                      }
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      disabled={isAddingHostel}
                    />
                    <label
                      htmlFor={`room-${room.id}`}
                      className="font-medium text-gray-700"
                    >
                      {room.label}
                    </label>
                  </div>

                  {adData.roomTypes[room.id].available && (
                    <div className="flex items-center space-x-2">
                      <Typography variant="body2" className="text-gray-600">
                        Price (Rs.):
                      </Typography>
                      <InputField
                        height="40px"
                        width="120px"
                        placeholder="0"
                        type="number"
                        value={adData.roomTypes[room.id].price}
                        onChange={(e) =>
                          handleRoomTypeChange(room.id, "price", e.target.value)
                        }
                        disabled={isAddingHostel}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">4</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Amenities
              </Typography>
            </div>

            <div className="flex flex-wrap gap-3">
              {amenitiesList.map((amenity) => (
                <Chip
                  key={amenity}
                  label={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  color={
                    adData.amenities.includes(amenity) ? "primary" : "default"
                  }
                  variant={
                    adData.amenities.includes(amenity) ? "filled" : "outlined"
                  }
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  disabled={isAddingHostel}
                />
              ))}
            </div>
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-semibold text-sm">5</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Location (Optional)
              </Typography>
            </div>

            <Button
              text={
                isLoadingLocation
                  ? "Getting Location..."
                  : "Get Current Location"
              }
              type="button"
              height="48px"
              width="100%"
              onClick={handleGetLocation}
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-lg mb-4 font-medium"
              disabled={isAddingHostel || isLoadingLocation}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div>
                  <Typography
                    variant="body2"
                    className="font-medium text-gray-700 mb-2"
                  >
                    City
                  </Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    value={adData.location.city}
                    disabled
                    type="text"
                    placeholder="Auto-filled from location"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <Typography
                    variant="body2"
                    className="font-medium text-gray-700 mb-2"
                  >
                    District
                  </Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    value={adData.location.district}
                    disabled
                    type="text"
                    placeholder="Auto-filled from location"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <Typography
                    variant="body2"
                    className="font-medium text-gray-700 mb-2"
                  >
                    Postal Code
                  </Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    value={adData.location.postalCode}
                    disabled
                    type="text"
                    placeholder="Auto-filled from location"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Typography
                    variant="body2"
                    className="font-medium text-gray-700 mb-2"
                  >
                    Full Address
                  </Typography>
                  <TextAreaComponent
                    value={adData.location.addressDetails}
                    disabled
                    rows={2}
                    placeholder="Auto-filled from location"
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">6</span>
              </div>
              <Typography variant="h6" className="font-semibold text-gray-900">
                Preview
              </Typography>
            </div>

            <div className="space-y-4">
              {previews.length > 0 ? (
                <img
                  src={previews[0].url}
                  alt="Hostel preview"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <AddPhotoAlternateIcon
                      className="text-gray-400 mb-2"
                      style={{ fontSize: 48 }}
                    />
                    <Typography variant="body2" className="text-gray-500">
                      Hostel image will appear here
                    </Typography>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Typography variant="h5" className="font-bold text-gray-900">
                  {adData.name || "Hostel Name"}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-600 leading-relaxed"
                >
                  {adData.description || "Hostel description will appear here"}
                </Typography>

                {adData.hostelType && (
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      Hostel Type
                    </Typography>
                    <Chip
                      label={
                        hostelTypeOptions.find(
                          (option) => option.value === adData.hostelType
                        )?.label || adData.hostelType
                      }
                      size="small"
                      className="bg-purple-50 text-purple-700"
                    />
                  </div>
                )}

                {Object.values(adData.roomTypes).some(
                  (room) => room.available
                ) && (
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      Available Room Types
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {roomTypes
                        .filter((room) => adData.roomTypes[room.id].available)
                        .map((room) => (
                          <Chip
                            key={room.id}
                            label={`${room.label} - Rs. ${
                              adData.roomTypes[room.id].price
                            }`}
                            size="small"
                            className="bg-blue-50 text-blue-700"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {adData.amenities.length > 0 && (
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      Amenities
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {adData.amenities.map((amenity) => (
                        <Chip
                          key={amenity}
                          label={amenity}
                          size="small"
                          className="bg-green-50 text-green-700"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {adData.location.addressDetails && (
                  <div>
                    <Typography
                      variant="subtitle2"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      Location
                    </Typography>
                    <div className="flex items-start space-x-2">
                      <LocationOnIcon
                        className="text-red-500 mt-0.5"
                        fontSize="small"
                      />
                      <Typography variant="body2" className="text-gray-600">
                        {adData.location.addressDetails}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Paper>

          <Paper elevation={2} className="p-6 rounded-xl">
            <Button
              text={isAddingHostel ? "Creating Hostel..." : "Create Hostel"}
              type="submit"
              height="56px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              onClick={handleSubmit}
              className="rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              disabled={isAddingHostel}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}
