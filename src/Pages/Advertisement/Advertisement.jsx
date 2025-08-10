import React, { useState, useEffect } from "react";
import { BedOutlined, Bathtub, Person } from "@mui/icons-material";
import { BackgroundColor, PrimaryColor } from "../../Theme/ColorBoilerplate.js";
import Button from "../../Components/Button.jsx";
import Dropdown from "../../Components/Dropdown.jsx";
import Typography from "../../Theme/Typography.jsx";
import BedImage from "../../Assets/Images/Beds.svg";
import { Modal, Box } from "@mui/material";
import InputField from "../../Components/InputField.jsx";
import HostelCreator from "../../Components/HostelCreator.jsx";
import TextAreaComponent from "../../Components/TextArea.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetHostelsForOwnerQuery } from "../../State/Services/hostelQueries.js";
import { setHostels } from "../../State/Slices/hostelSlice.js";
import Loader from "../../Components/Loader.jsx";

export default function Advertisement() {
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const hostelsFromState = useSelector((state) => state.hostel.hostels);

  // Fetch hostels from backend
  const {
    data: hostelsFromAPI,
    isLoading,
    error,
    refetch,
  } = useGetHostelsForOwnerQuery(undefined, {
    // Skip the query if we already have hostels in state
    skip: hostelsFromState.length > 0,
  });

  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listing, setListing] = useState("");
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

  useEffect(() => {
    // Create a ResizeObserver instance with an empty callback
    const resizeObserver = new ResizeObserver(() => {});

    // Observe the document body
    resizeObserver.observe(document.body);

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Intentionally left empty to avoid undelivered notifications
    });

    document.querySelectorAll(".resize-observe").forEach((el) => {
      resizeObserver.observe(el);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleOpen = (listing) => {
    setEditingListing({ ...listing });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingListing(null);
  };

  const handleChange = (e) => {
    if (!editingListing) return;
    const { name, value } = e.target;
    setEditingListing((prevData) => ({
      ...prevData,
      [name]:
        name === "title" || name === "description" ? value : Number(value),
    }));
  };

  const handleUpdate = () => {
    if (!editingListing) return;
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === editingListing.id ? editingListing : listing
      )
    );
    handleClose();
  };

  const onSelectChange = (event) => {
    setListing(event.target.value);
  };

  const listingOptions = [
    { value: 1, label: "last 7 days" },
    { value: 2, label: "last week" },
    { value: 3, label: "last month" },
  ];

  const handleHostelCreatorUpload = (response) => {
    // The new hostel is already added to the state by the HostelCreator component
    // We just need to update our local listings state
    if (response && response.hostel) {
      setListings((prevListings) => [...prevListings, response.hostel]);
    }
    setShowHostelCreator(false);
  };

  // Function to refresh hostels from backend
  const handleRefreshHostels = () => {
    refetch();
  };

  return (
    <div className=" bg-LightBackground rounded-lg p-4">
      {/* Loading State */}
      {isLoading && <Loader />}

      {!showHostelCreator ? (
        <>
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <div className="flex sm:flex-wrap justify-between items-center">
              <Typography variant={"h3"} className="font-bold">
                Hostel Listings
              </Typography>
              <div className="flex items-center gap-2">
                <Dropdown
                  value={listing}
                  onSelectChange={onSelectChange}
                  options={listingOptions}
                  placeholder="last 7 days"
                />
                {role === "owner" && (
                  <>
                    <Button
                      text="Refresh"
                      type="button"
                      height="40px"
                      width="100px"
                      onClick={handleRefreshHostels}
                      customColor={BackgroundColor}
                      bgColor={PrimaryColor}
                      className="px-3 sm:text-xs rounded-md"
                    />
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
                  </>
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
                  key={hostel._id || hostel.id}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="flex sm:flex-wrap">
                    <img
                      src={
                        hostel.images && hostel.images.length > 0
                          ? hostel.images[0]
                          : BedImage
                      }
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
                            <Button
                              onClick={() => handleOpen(hostel)}
                              text="Edit"
                              type="submit"
                              height="35px"
                              width="100px"
                              customColor={BackgroundColor}
                              bgColor={PrimaryColor}
                              className="sm:text-xs rounded-md"
                            />
                            <Button
                              text="Delete"
                              type="submit"
                              height="35px"
                              width="100px"
                              customColor={BackgroundColor}
                              bgColor={PrimaryColor}
                              className="sm:text-xs rounded-md"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        {hostel.roomTypes &&
                          Object.values(hostel.roomTypes).some(
                            (room) => room.available
                          ) && (
                            <span className="text-blue-600 font-bold">
                              Starting from Rs.{" "}
                              {Math.min(
                                ...Object.values(hostel.roomTypes)
                                  .filter((room) => room.available)
                                  .map((room) => room.price)
                              )}
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
                          {hostel.location && hostel.location.city && (
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500">
                                📍 {hostel.location.city}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          <Modal
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
                      name="title"
                      value={editingListing.name || editingListing.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant={"body1"}>Description</Typography>
                    <TextAreaComponent
                      value={editingListing.description}
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
          </Modal>
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
