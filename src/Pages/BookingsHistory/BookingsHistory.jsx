import React, { useState, useEffect } from "react";
import {
  CalendarToday,
  LocationOn,
  Hotel,
  Payment,
  Star,
} from "@mui/icons-material";
import { BackgroundColor, PrimaryColor } from "../../Theme/ColorBoilerplate.js";
import Typography from "../../Theme/Typography.jsx";
import Loader from "../../Components/Loader.jsx";

export default function BookingsHistory() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock booking data - replace with actual API response
        const mockBookings = [
          {
            id: "1",
            hostelName: "Student Haven Hostel",
            hostelImage:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            roomType: "2-Seater",
            checkIn: "2024-01-15",
            checkOut: "2024-06-15",
            totalAmount: 45000,
            bookingDate: "2024-01-10",
            location: "Lahore, Punjab",
            amenities: ["WiFi", "AC", "Laundry"],
            rating: 4.5,
            review:
              "Great hostel with excellent facilities and friendly staff.",
          },
          {
            id: "2",
            hostelName: "University Plaza",
            hostelImage:
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
            roomType: "1-Seater",
            checkIn: "2023-08-01",
            checkOut: "2023-12-31",
            totalAmount: 35000,
            bookingDate: "2023-07-25",
            location: "Islamabad, Federal",
            amenities: ["WiFi", "Kitchen", "Study Room"],
            rating: 4.2,
            review: "Good location and clean rooms. Would recommend.",
          },
          {
            id: "3",
            hostelName: "Campus Comfort",
            hostelImage:
              "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
            roomType: "3-Seater",
            checkIn: "2023-03-01",
            checkOut: "2023-07-31",
            totalAmount: 28000,
            bookingDate: "2023-02-20",
            location: "Karachi, Sindh",
            amenities: ["WiFi", "AC", "Security"],
            rating: null,
            review: null,
          },
        ];

        setBookings(mockBookings);
        setError(null);
      } catch (err) {
        setError("Failed to load booking history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="text-center">
            <Typography variant="h3" className="font-bold text-gray-800 mb-2">
              My Booking History
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Track all your hostel bookings and reservations
            </Typography>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <Typography variant="body1">{error}</Typography>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && !error && (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarToday className="w-8 h-8 text-gray-400" />
            </div>
            <Typography variant="h5" className="text-gray-500 mb-2">
              No Bookings Found
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              You haven't made any bookings yet.
            </Typography>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Hostel Image */}
                  <div className="lg:w-48 h-48 lg:h-auto">
                    <img
                      src={booking.hostelImage}
                      alt={booking.hostelName}
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
                            {booking.hostelName}
                          </Typography>
                        </div>

                        {/* Room Type and Location */}
                        <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Hotel className="w-4 h-4" />
                            <span>{booking.roomType} Room</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <LocationOn className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Payment className="w-4 h-4" />
                            <span>{formatCurrency(booking.totalAmount)}</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        {booking.amenities && booking.amenities.length > 0 && (
                          <div className="mb-3">
                            <Typography
                              variant="body2"
                              className="text-gray-600 mb-1"
                            >
                              Amenities:
                            </Typography>
                            <div className="flex flex-wrap gap-1">
                              {booking.amenities.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rating and Review */}
                        {booking.rating && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">
                                {booking.rating}/5
                              </span>
                            </div>
                          </div>
                        )}

                        {booking.review && (
                          <Typography
                            variant="body2"
                            className="text-gray-600 italic"
                          >
                            "{booking.review}"
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <Typography variant="h5" className="font-bold mb-4 text-center">
              Booking Summary
            </Typography>
            <div className="text-center">
              <Typography variant="h4" className="font-bold text-blue-600 mb-2">
                {bookings.length}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total Bookings
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
