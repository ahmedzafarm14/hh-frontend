import React, { useState, useEffect } from "react";
import { BackgroundColor, PrimaryColor } from "../../Theme/ColorBoilerplate.js";
import Button from "../../Components/Button.jsx";
import Typography from "../../Theme/Typography.jsx";
import HostelCreator from "../../Components/HostelCreator.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetHostelsForOwnerQuery,
  useDeleteHostelMutation,
} from "../../State/Services/hostelQueries.js";
import { setHostels } from "../../State/Slices/hostelSlice.js";
import Loader from "../../Components/Loader.jsx";
import SuccessMessage from "../../Components/SuccessMessage.jsx";
import ErrorMessage from "../../Components/ErrorMessage.jsx";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../../State/Slices/messageHandlerSlice.js";

export default function HostelManagement() {
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const hostelsFromState = useSelector((state) => state.hostel.hostels);
  const [deleteHostel] = useDeleteHostelMutation();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );

  const [apiLoading, setApiLoading] = useState(false);

  // Fetch hostels from backend
  const {
    data: hostelsFromAPI,
    isLoading,
    error,
  } = useGetHostelsForOwnerQuery(undefined, {
    // Skip the query if we already have hostels in state
    skip: hostelsFromState.length > 0,
  });

  const [listings, setListings] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [editingListing, setEditingListing] = useState(null);
  const [showHostelCreator, setShowHostelCreator] = useState(false);

  // Effect to handle initial data loading and state management
  useEffect(() => {
    // If we have hostels in state, use them
    if (hostelsFromState.length > 0) {
      setListings(hostelsFromState);
    }
    // If we don't have hostels in state but we have data from API, store it
    else if (hostelsFromAPI && hostelsFromAPI.length > 0) {
      dispatch(setHostels(hostelsFromAPI));
      setListings(hostelsFromAPI);
    }
  }, [hostelsFromState, hostelsFromAPI, dispatch]);

  // Effect to handle API data when it comes in
  useEffect(() => {
    if (hostelsFromAPI && hostelsFromAPI.length > 0) {
      dispatch(setHostels(hostelsFromAPI));
      setListings(hostelsFromAPI);
    }
  }, [hostelsFromAPI, dispatch]);

  // Handle Delete
  const handleDelete = async (e, hostel) => {
    e.preventDefault();
    dispatch(clearMessages());
    const hostelId = hostel._id;
    setApiLoading(true);
    try {
      const response = await deleteHostel(hostelId).unwrap();
      console.log(response);
      dispatch(
        setSuccessMessage(response.message || "Hostel Deleted Successfully")
      );

      setListings((prev) => prev.filter((listing) => listing._id !== hostelId));
      console.log(listings);
      dispatch(setHostels(listings));
      setApiLoading(false);

      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    } catch (error) {
      console.error(error);
      dispatch(setErrorMessage(error?.data?.error || "Hostel Deletion Failed"));
      setApiLoading(false);
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    }
  };

  // const handleOpen = (listing) => {
  //   setEditingListing({ ...listing });
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setEditingListing(null);
  // };

  // const handleChange = (e) => {
  //   if (!editingListing) return;
  //   const { name, value } = e.target;
  //   setEditingListing((prevData) => ({
  //     ...prevData,
  //     [name]:
  //       name === "title" || name === "description" ? value : Number(value),
  //   }));
  // };

  // const handleUpdate = () => {
  //   if (!editingListing) return;
  //   setListings((prevListings) =>
  //     prevListings.map((listing) =>
  //       listing._id === editingListing._id ? editingListing : listing
  //     )
  //   );
  //   handleClose();
  // };

  const handleHostelCreatorUpload = (response) => {
    if (response && response.hostel) {
      setListings((prevListings) => [...prevListings, response.hostel]);
    }
    setShowHostelCreator(false);
  };

  // Helper function to get the first image URL from hostel images
  const getFirstImageUrl = (hostel) => {
    if (hostel.images && hostel.images.length > 0 && hostel.images[0].url) {
      return hostel.images[0].url;
    }
    return null;
  };

  // Helper function to get minimum room price
  const getMinRoomPrice = (roomTypes) => {
    if (!roomTypes || roomTypes.length === 0) return null;

    const prices = roomTypes
      .filter((room) => room.price)
      .map((room) => room.price);

    return prices.length > 0 ? Math.min(...prices) : null;
  };

  // Helper function to get location display text
  const getLocationDisplay = (hostel) => {
    if (hostel.addressId && hostel.addressId.city) {
      return hostel.addressId.city;
    }
    if (hostel.addressId && hostel.addressId.district) {
      return hostel.addressId.district;
    }
    return "Location not specified";
  };

  return (
    <div className=" bg-LightBackground rounded-lg p-4">
      {/* Loading State */}
      {(isLoading || apiLoading) && <Loader />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {!showHostelCreator ? (
        <>
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <div className="flex sm:flex-wrap justify-between items-center">
              <Typography variant={"h3"} className="font-bold">
                Hostel Listings
              </Typography>
              <div className="flex items-center gap-2">
                {role === "owner" && (
                  <Button
                    text="Create New Hostel"
                    type="submit"
                    height="40px"
                    width="100%"
                    onClick={() => setShowHostelCreator(true)}
                    customColor={BackgroundColor}
                    bgColor={PrimaryColor}
                    className="px-3 sm:text-xs rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <Typography variant="body1">
                Failed to load hostels. Please try refreshing.
              </Typography>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && listings.length === 0 && !error && (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <Typography variant="h5" className="text-gray-500 mb-2">
                No Hostels Found
              </Typography>
              <Typography variant="body1" className="text-gray-400 mb-4">
                You haven't created any hostels yet.
              </Typography>
              {role === "owner" && (
                <Button
                  text="Create Your First Hostel"
                  type="button"
                  height="45px"
                  width="200px"
                  onClick={() => setShowHostelCreator(true)}
                  customColor={BackgroundColor}
                  bgColor={PrimaryColor}
                  className="rounded-md"
                />
              )}
            </div>
          )}

          {/* Hostels List */}
          {listings.length > 0 && (
            <div className="space-y-4">
              {listings.map((hostel) => (
                <div
                  key={hostel._id}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="flex sm:flex-wrap">
                    <img
                      src={getFirstImageUrl(hostel)}
                      alt={hostel.name}
                      className="w-40 h-auto sm:w-full object-cover"
                    />
                    <div className="flex-grow p-4">
                      <div className="flex sm:flex-wrap justify-between items-start gap-2">
                        <div>
                          <Typography variant={"h4"} className="font-bold">
                            {hostel.name}
                          </Typography>
                          <Typography variant={"body1"} className="mt-1">
                            {hostel.description}
                          </Typography>
                          {hostel.hostelType && (
                            <Typography
                              variant={"body2"}
                              className="text-blue-600 mt-1"
                            >
                              {hostel.hostelType.charAt(0).toUpperCase() +
                                hostel.hostelType.slice(1)}{" "}
                              Hostel
                            </Typography>
                          )}
                        </div>
                        {role === "owner" && (
                          <div className="flex flex-col sm:flex-row gap-2">
                            {/* <Button
                              onClick={() => handleOpen(hostel)}
                              text="Edit"
                              type="submit"
                              height="35px"
                              width="100px"
                              customColor={BackgroundColor}
                              bgColor={PrimaryColor}
                              className="sm:text-xs rounded-md"
                            />
                            */}
                            <Button
                              text="Delete"
                              type="button"
                              height="35px"
                              width="100px"
                              onClick={(e) => handleDelete(e, hostel)}
                              customColor={BackgroundColor}
                              bgColor={PrimaryColor}
                              className="sm:text-xs rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      {/* Room Types Display */}
                      {hostel.roomTypes && hostel.roomTypes.length > 0 && (
                        <div className="mt-3">
                          <Typography
                            variant="body2"
                            className="text-gray-600 mb-1"
                          >
                            Available Room Types:
                          </Typography>
                          <div className="flex flex-wrap gap-2">
                            {hostel.roomTypes.map((room, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-2 py-1 rounded text-sm"
                              >
                                {room.type} - Rs. {room.price}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        {getMinRoomPrice(hostel.roomTypes) && (
                          <span className="text-blue-600 font-bold">
                            Starting from Rs.{" "}
                            {getMinRoomPrice(hostel.roomTypes)}
                          </span>
                        )}
                        <div className="flex items-center space-x-4">
                          {hostel.amenities && hostel.amenities.length > 0 && (
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500">
                                {hostel.amenities.length} amenities
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              📍 {getLocationDisplay(hostel)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-listing-modal"
            className="flex items-center justify-center"
          >
            <Box className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md mx-4">
              <Typography
                variant={"h3"}
                id="edit-listing-modal"
                className="font-bold mb-4"
              >
                Edit Hostel Listing
              </Typography>
              {editingListing && (
                <form onSubmit={(e) => e.preventDefault()} className="gap-2">
                  <div className="flex flex-col">
                    <Typography variant={"body1"}>Title</Typography>
                    <InputField
                      height="40px"
                      isRequired={true}
                      width="100%"
                      placeholder="Title"
                      type="text"
                      name="name"
                      value={editingListing.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant={"body1"}>Description</Typography>
                    <TextAreaComponent
                      value={editingListing.description || ""}
                      onChange={handleChange}
                      name="description"
                      placeholder="Description"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={handleClose}
                      text="Cancel"
                      type="submit"
                      height="35px"
                      width="100px"
                      customColor={BackgroundColor}
                      bgColor={PrimaryColor}
                      className="sm:text-xs rounded-md"
                    />
                    <Button
                      onClick={handleUpdate}
                      text="Update"
                      type="submit"
                      height="35px"
                      width="100px"
                      customColor={BackgroundColor}
                      bgColor={PrimaryColor}
                      className="sm:text-xs rounded-md"
                    />
                  </div>
                </form>
              )}
            </Box>
          </Modal> */}
        </>
      ) : (
        <HostelCreator
          onClose={() => setShowHostelCreator(false)}
          onUpload={handleHostelCreatorUpload}
        />
      )}
    </div>
  );
}
