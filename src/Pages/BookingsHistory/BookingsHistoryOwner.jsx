import React, { useEffect } from "react";
import {
  CalendarToday,
  Hotel,
  Payment,
  Person,
  AccountCircle,
} from "@mui/icons-material";
import Typography from "../../Theme/Typography.jsx";
import Loader from "../../Components/Loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetOwnerBookingsQuery } from "../../State/Services/bookingQueries.js";
import { setOwnerBookings } from "../../State/Slices/bookingSlice.js";
import {
  setErrorMessage,
  clearMessages,
} from "../../State/Slices/messageHandlerSlice.js";
import ErrorMessage from "../../Components/ErrorMessage.jsx";

export default function BookingsHistoryOwner() {
  const dispatch = useDispatch();

  // Get user from Redux store
  const user = useSelector((state) => state.user.user);
  const ownerBookings = useSelector((state) => state.booking.ownerBookings);
  const errorMessage = useSelector(
    (state) => state.messageHandler.errorMessage
  );

  // RTK Query hook for fetching owner bookings
  const {
    data: bookingsData,
    isLoading,
    error,
  } = useGetOwnerBookingsQuery(user?._id, {
    skip: !user?._id, // Skip if user is not logged in
  });

  // Update Redux store when data is fetched
  useEffect(() => {
    if (bookingsData) {
      dispatch(setOwnerBookings(bookingsData));
    }
  }, [bookingsData, dispatch]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      console.error("Error fetching owner bookings:", error);
      dispatch(
        setErrorMessage("Failed to load booking history. Please try again.")
      );
    }
  }, [error, dispatch]);

  // Clear error messages after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // If user is not logged in, show login prompt
  if (!user || !user._id) {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarToday className="w-8 h-8 text-gray-400" />
            </div>
            <Typography variant="h5" className="text-gray-500 mb-2">
              Login Required
            </Typography>
            <Typography variant="body1" className="text-gray-400 mb-4">
              Please log in to view your booking history.
            </Typography>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is not an owner, show access denied
  if (user.role !== "owner") {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Person className="w-8 h-8 text-red-400" />
            </div>
            <Typography variant="h5" className="text-gray-500 mb-2">
              Access Denied
            </Typography>
            <Typography variant="body1" className="text-gray-400 mb-4">
              This page is only accessible to hostel owners.
            </Typography>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* Error Message Component */}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="pt-20 pb-8 px-4 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="text-center">
              <Typography variant="h3" className="font-bold text-gray-800 mb-2">
                Hostel Bookings Management
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Track all bookings for your hostels
              </Typography>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <Typography variant="body1">
                Failed to load booking history. Please try again.
              </Typography>
            </div>
          )}

          {/* Empty State */}
          {ownerBookings && ownerBookings.length === 0 && !error && (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarToday className="w-8 h-8 text-gray-400" />
              </div>
              <Typography variant="h5" className="text-gray-500 mb-2">
                No Bookings Found
              </Typography>
              <Typography variant="body1" className="text-gray-400">
                No bookings have been made for your hostels yet.
              </Typography>
            </div>
          )}

          {/* Bookings List */}
          {ownerBookings && ownerBookings.length > 0 && (
            <div className="space-y-6">
              {ownerBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Hostel Image */}
                    <div className="lg:w-48 h-48 lg:h-auto">
                      <img
                        src={
                          booking.firstImageUrl ||
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
                        }
                        alt={booking.hostelName || "Hostel"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-grow p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-grow">
                          {/* Hostel Name */}
                          <div className="mb-3">
                            <Typography
                              variant="h4"
                              className="font-bold text-gray-800"
                            >
                              {booking.hostelName || "Unknown Hostel"}
                            </Typography>
                          </div>

                          {/* Resident Information - Beautiful Display */}
                          {booking.residentName && (
                            <div className="mb-4">
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <AccountCircle className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <Typography
                                      variant="body2"
                                      className="text-blue-600 font-medium mb-1"
                                    >
                                      Booked by Resident
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      className="font-semibold text-gray-800"
                                    >
                                      {booking.residentName}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Room Type and Price */}
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Hotel className="w-4 h-4" />
                              <span>{booking.roomType} Room</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Payment className="w-4 h-4" />
                              <span className="font-semibold text-green-600">
                                {formatCurrency(booking.price)}
                              </span>
                            </div>
                          </div>

                          {/* Booking Date */}
                          <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
                            <CalendarToday className="w-4 h-4" />
                            <span>
                              Booked on: {formatDate(booking.createdAt)}
                            </span>
                          </div>

                          {/* Booking ID */}
                          <div className="mb-2">
                            <Typography
                              variant="body2"
                              className="text-gray-500"
                            >
                              Booking ID: {booking.bookingId}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {ownerBookings && ownerBookings.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6 mt-8">
              <Typography variant="h5" className="font-bold mb-4 text-center">
                Booking Summary
              </Typography>
              <div className="text-center">
                <Typography
                  variant="h4"
                  className="font-bold text-blue-600 mb-2"
                >
                  {ownerBookings.length}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Total Bookings
                </Typography>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
