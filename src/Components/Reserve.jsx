import { Box, TextField, Container, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import Button from "./Button";
import { BackgroundColor, PrimaryColor } from "../Theme/ColorBoilerplate";
import Image from "../Assets/Images/reserve.svg";
import Typography from "../Theme/Typography";

export default function ReserveForm() {
  const [checkIn, setCheckIn] = useState(dayjs());
  const [checkOut, setCheckOut] = useState(dayjs());

  const roomTypes = ["Duplex Room", "Single Room", "Double Room", "Suite"];

  return (
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
          <Box className=" p-4  ">
            <Typography variant="h4" className="font-bold mb-2">
              Reserve Now
            </Typography>
            <Typography className=" mb-8">
              Please fill in the form to reserve a room.
            </Typography>

            {/* Form */}
            <Box className="space-y-6">
              <TextField
                fullWidth
                label="Hostel/Property Name"
                defaultValue="Oasis Lodge"
                InputProps={{
                  readOnly: true,
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Check-In Date"
                  value={checkIn}
                  onChange={(newValue) => setCheckIn(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />

                <DatePicker
                  label="Check-Out Date"
                  value={checkOut}
                  onChange={(newValue) => setCheckOut(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </LocalizationProvider>

              <TextField
                select
                fullWidth
                label="Select Room Type"
                defaultValue="Duplex Room"
              >
                {roomTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              {/* Total Amount */}
              <Box className="pt-4 flex justify-between items-center gap-2">
                <div>
                  <Typography className="text-sm ">Total Amount</Typography>
                  <Typography variant="h5" className="font-bold">
                    Rs. 8,000
                  </Typography>
                </div>
                <Button
                  text="Reserve"
                  type="submit"
                  height="37px"
                  customColor={BackgroundColor}
                  bgColor={PrimaryColor}
                  className="rounded-full px-4 h-auto border-none "
                  // onClick={() => navigate("/reserve")}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
