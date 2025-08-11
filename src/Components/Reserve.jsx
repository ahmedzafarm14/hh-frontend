import { Box, TextField, Container, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Image from "../Assets/Images/reserve.svg";
import Typography from "../Theme/Typography";
import { useCreateBookingMutation } from "../State/Services/bookingQueries";
import { addBooking } from "../State/Slices/bookingSlice";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../State/Slices/messageHandlerSlice";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import Loader from "./Loader";

export default function ReserveForm() {
  const [roomType, setRoomType] = useState("");
  const [selectedRoomTypeData, setSelectedRoomTypeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hostelData, setHostelData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Get data from Redux store
  const user = useSelector((state) => state.user.user);
  const hostelsFromState = useSelector((state) => state.hostel.hostels);
  const errorMessage = useSelector(
    (state) => state.messageHandler.errorMessage
  );
  const successMessage = useSelector(
    (state) => state.messageHandler.successMessage
  );

  // RTK Query mutation
  const [createBooking] = useCreateBookingMutation();

  // Get hostel data from multiple sources
  useEffect(() => {
    let hostel = null;

    // First try to get from location state (passed from HostelDetails)
    if (location.state?.hostelData) {
      hostel = location.state.hostelData;
    }
    // If not available, try to get from Redux store using hostel ID
    else if (hostelsFromState && hostelsFromState.length > 0) {
      const hostelId = searchParams.get("id");
      if (hostelId) {
        hostel = hostelsFromState.find((h) => h._id === hostelId);
      }
    }

    if (hostel) {
      setHostelData(hostel);
      // Set default room type if available
      if (hostel.roomTypes && hostel.roomTypes.length > 0) {
        setRoomType(hostel.roomTypes[0].type);
        setSelectedRoomTypeData(hostel.roomTypes[0]);
      }
    }
  }, [location.state, hostelsFromState, searchParams]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage, dispatch]);

  // Handle room type change
  const handleRoomTypeChange = (event) => {
    const selectedType = event.target.value;
    setRoomType(selectedType);

    // Find the selected room type data
    const roomTypeData = hostelData?.roomTypes?.find(
      (room) => room.type === selectedType
    );
    setSelectedRoomTypeData(roomTypeData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in and has an ID
    if (!user || !user._id) {
      dispatch(setErrorMessage("Please log in to make a booking."));
      return;
    }

    if (!roomType || !hostelData) {
      dispatch(
        setErrorMessage(
          "Please select a room type and ensure hostel data is available."
        )
      );
      return;
    }

    setIsLoading(true);

    try {
      // Prepare booking data according to the required format
      const bookingData = {
        residentId: user._id, // Logged in user's ID from state.user.user._id
        hostelId: hostelData._id, // Hostel ID from the selected hostel
        ownerId: hostelData.ownerId, // Hostel owner's ID
        roomType: roomType, // Selected room type
      };

      // Send booking request to backend
      const response = await createBooking(bookingData).unwrap();

      console.log("Booking response:", response);

      // Add booking to Redux store - handle safely
      try {
        dispatch(addBooking(response));
      } catch (reduxError) {
        console.error("Error adding booking to Redux store:", reduxError);
      }

      // Show success message
      dispatch(setSuccessMessage("Booking created successfully!"));

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate("/bookings-history");
      }, 1500);
    } catch (error) {
      console.error("Booking creation failed:", error);
      dispatch(setErrorMessage(error.data?.error || "An error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  // If no hostel data is available, show error
  if (!hostelData) {
    return (
      <Box className="bg-BackgroundColor text-TextColor mt-24">
        <Container maxWidth="lg" className="py-2">
          <Box className="text-center">
            <Typography variant="h4" className="font-bold mb-2">
              No Hostel Selected
            </Typography>
            <Typography className="mb-8">
              Please select a hostel first to proceed with booking.
            </Typography>
            <Button
              text="Go Back to Hostels"
              onClick={() => navigate("/hostels")}
              height="37px"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-full px-4 h-auto border-none"
            />
          </Box>
        </Container>
      </Box>
    );
  }

  // If user is not logged in, show login prompt
  if (!user || !user._id) {
    return (
      <Box className="bg-BackgroundColor text-TextColor mt-24">
        <Container maxWidth="lg" className="py-2">
          <Box className="text-center">
            <Typography variant="h4" className="font-bold mb-2">
              Login Required
            </Typography>
            <Typography className="mb-8">
              Please log in to make a booking.
            </Typography>
            <Button
              text="Go to Login"
              onClick={() => navigate("/login")}
              height="37px"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-full px-4 h-auto border-none"
            />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <>
      {/* Message Components */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}

      {/* Loader */}
      {isLoading && <Loader />}

      <Box className="bg-BackgroundColor text-TextColor mt-24">
        <Container maxWidth="lg" className="py-2">
          <Box className="grid sm:grid-cols-1 grid-cols-2 gap-6 items-center">
            {/* Left side - Image */}
            <Box className="relative md:h-[400px] h-[600px] flex sm:hidden rounded-lg overflow-hidden">
              <img
                src={Image}
                alt="Hotel exterior"
                fill
                className="object-cover"
              />
            </Box>

            {/* Right side - Form */}
            <Box className="p-4">
              <Typography variant="h4" className="font-bold mb-2">
                Reserve Now
              </Typography>
              <Typography className="mb-8">
                Please select your room type to complete the reservation.
              </Typography>

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Hostel Name (Read-only) */}
                <TextField
                  fullWidth
                  label="Hostel/Property Name"
                  value={hostelData.name || "N/A"}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                {/* Room Type Selection - ONLY FIELD AS REQUESTED */}
                <TextField
                  select
                  fullWidth
                  label="Select Room Type"
                  value={roomType}
                  onChange={handleRoomTypeChange}
                  required
                >
                  {hostelData.roomTypes && hostelData.roomTypes.length > 0 ? (
                    hostelData.roomTypes.map((roomTypeOption) => (
                      <MenuItem
                        key={roomTypeOption.type}
                        value={roomTypeOption.type}
                      >
                        {roomTypeOption.type} - Rs.{" "}
                        {roomTypeOption.pricePerMonth?.toLocaleString()}/month
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="standard">Standard Room</MenuItem>
                  )}
                </TextField>

                {/* Room Type Details */}
                {selectedRoomTypeData && (
                  <Box className="bg-gray-100 p-4 rounded-lg">
                    <Typography variant="h6" className="font-semibold mb-2">
                      Room Details
                    </Typography>
                    <Typography className="text-sm mb-1">
                      Type: {selectedRoomTypeData.type}
                    </Typography>
                    <Typography className="text-sm mb-1">
                      Price: Rs.{" "}
                      {selectedRoomTypeData.pricePerMonth?.toLocaleString()} per
                      month
                    </Typography>
                    <Typography className="text-sm">
                      Availability: {selectedRoomTypeData.totalAvailability}{" "}
                      rooms available
                    </Typography>
                  </Box>
                )}

                {/* Total Amount */}
                <Box className="pt-4 flex justify-between items-center gap-2">
                  <div>
                    <Typography className="text-sm">Total Amount</Typography>
                    <Typography variant="h5" className="font-bold">
                      Rs.{" "}
                      {selectedRoomTypeData?.pricePerMonth?.toLocaleString() ||
                        "0"}
                    </Typography>
                  </div>
                  <Button
                    text={isLoading ? "Processing..." : "Reserve"}
                    type="submit"
                    height="37px"
                    customColor={BackgroundColor}
                    bgColor={PrimaryColor}
                    className="rounded-full px-4 h-auto border-none"
                    disabled={isLoading || !roomType}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
