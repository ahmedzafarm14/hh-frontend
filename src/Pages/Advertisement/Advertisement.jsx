import React, { useState, useEffect } from "react";
import { BedOutlined, Bathtub, Person } from "@mui/icons-material";
import { BackgroundColor, PrimaryColor } from "../../Theme/ColorBoilerplate.js";
import Button from "../../Components/Button.jsx";
import Dropdown from "../../Components/Dropdown.jsx";
import Typography from "../../Theme/Typography.jsx";
import BedImage from "../../Assets/Images/Beds.svg";
import { Modal, Box } from "@mui/material";
import InputField from "../../Components/InputField.jsx";
import AdCreator from "../../Components/AddCreator.jsx";
import TextAreaComponent from "../../Components/TextArea.jsx";
import { useSelector, useDispatch } from "react-redux";

export default function Advertisement() {
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "2 Person Bedroom",
      description:
        "Cozy 2-person bedroom hostel offering a comfortable and friendly atmosphere for travelers. Enjoy shared amenities and a communal vibe just steps away from local attractions.",
      beds: 2,
      bath: 1,
      person: 2,
      price: 12000,
      image: BedImage,
    },
    {
      id: 2,
      title: "3 Person Bedroom",
      description:
        "Cozy 2-person bedroom hostel offering a comfortable and friendly atmosphere for travelers. Enjoy shared amenities and a communal vibe just steps away from local attractions.",
      beds: 3,
      bath: 2,
      person: 3,
      price: 16000,
      image: BedImage,
    },
    {
      id: 3,
      title: "4 Person Bedroom",
      description:
        "Cozy 2-person bedroom hostel offering a comfortable and friendly atmosphere for travelers. Enjoy shared amenities and a communal vibe just steps away from local attractions.",
      beds: 4,
      bath: 2,
      person: 4,
      price: 20000,
      image: BedImage,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listing, setListing] = useState("");
  const [showAdCreator, setShowAdCreator] = useState(false);
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

  const handleAdCreatorUpload = (newListing) => {
    setListings((prevListings) => [
      ...prevListings,
      {
        id: prevListings.length + 1,
        ...newListing,
        image: BedImage,
        beds: parseInt(newListing.beds) || 2,
        bath: parseInt(newListing.bath) || 1,
        person: parseInt(newListing.person) || 2,
        price: parseInt(newListing.price) || 0,
      },
    ]);
    setShowAdCreator(false);
  };

  return (
    <div className=" bg-LightBackground rounded-lg p-4">
      {!showAdCreator ? (
        <>
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <div className="flex sm:flex-wrap justify-between items-center">
              <Typography variant={"h3"} className="font-bold">
                Hostel
              </Typography>
              <div className="flex items-center gap-2">
                <Dropdown
                  value={listing}
                  onSelectChange={onSelectChange}
                  options={listingOptions}
                  placeholder="last 7 days"
                />
                {role === "owner" && (
                  <Button
                    text="Add New  Hostel"
                    type="submit"
                    height="40px"
                    width="100%"
                    onClick={() => setShowAdCreator(true)} // Show AdCreator component
                    customColor={BackgroundColor}
                    bgColor={PrimaryColor}
                    className="px-3 sm:text-xs rounded-md"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="flex sm:flex-wrap">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-40 h-auto sm:w-full object-cover"
                  />
                  <div className="flex-grow p-4">
                    <div className="flex sm:flex-wrap justify-between items-start gap-2">
                      <div>
                        <Typography variant={"h4"} className="font-bold">
                          {listing.title}
                        </Typography>
                        <Typography variant={"body1"} className="mt-1">
                          {listing.description}
                        </Typography>
                      </div>
                      {role === "owner" && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={() => handleOpen(listing)}
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
                      <span className="text-blue-600 font-bold">
                        {listing.price}
                      </span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <BedOutlined
                            fontSize="small"
                            className="text-gray-500"
                          />
                          <span className="ml-1 text-sm">{listing.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <Bathtub fontSize="small" className="text-gray-500" />
                          <span className="ml-1 text-sm">{listing.bath}</span>
                        </div>
                        <div className="flex items-center">
                          <Person fontSize="small" className="text-gray-500" />
                          <span className="ml-1 text-sm">{listing.person}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                Edit Listing
              </Typography>
              {editingListing && (
                <form onSubmit={(e) => e.preventDefault()} className="gap-2">
                  <div className="flex flex-col">
                    <Typography variant={"body1"}>Title</Typography>
                    <InputField
                      height="40px"
                      width="100%"
                      placeholder="Title"
                      type="text"
                      name="title"
                      value={editingListing.title}
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
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <div className="flex flex-col">
                      <Typography variant={"body1"}>Beds</Typography>
                      <InputField
                        height="40px"
                        width="100%"
                        placeholder="Beds"
                        type="number"
                        name="beds"
                        value={editingListing.beds}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography variant={"body1"}>Bath</Typography>
                      <InputField
                        height="40px"
                        width="100%"
                        placeholder="Bath"
                        type="number"
                        name="bath"
                        value={editingListing.bath}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography variant={"body1"}>Person</Typography>
                      <InputField
                        height="40px"
                        width="100%"
                        placeholder="Person"
                        type="number"
                        name="person"
                        value={editingListing.person}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Typography variant={"body1"}>Price (Rs.)</Typography>
                    <InputField
                      height="40px"
                      width="100%"
                      placeholder="Price (Rs.)"
                      type="number"
                      name="price"
                      value={editingListing.price}
                      onChange={handleChange}
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
        <AdCreator
          onClose={() => setShowAdCreator(false)}
          onUpload={handleAdCreatorUpload}
        />
      )}
    </div>
  );
}
