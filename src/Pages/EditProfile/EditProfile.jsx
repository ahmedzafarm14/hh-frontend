import React, { useState, useEffect } from "react";
import Card from "../../Components/Card.jsx";
import InputField from "../../Components/InputField.jsx";
import Typography from "../../Theme/Typography.jsx";
import Dropdown from "../../Components/Dropdown.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Button from "../../Components/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import getLocation from "../../utils/Location.js";
import Loader from "../../Components/Loader.jsx";
import SuccessMessage from "../../Components/SuccessMessage.jsx";
import ErrorMessage from "../../Components/ErrorMessage.jsx";
import {
  clearMessages,
  setErrorMessage,
  setSuccessMessage,
} from "../../State/Slices/messageHandlerSlice.js";
import { updateUserData } from "../../State/Slices/userSlice.js";
import { useUpdateProfileMutation } from "../../State/Services/userQueries.js";

const EditProfile = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user);
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Initialize form state with fallback values
  const [form, setForm] = useState({
    userName: user?.userName || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    cnic: user?.cnic || "",
    phoneNumber: user?.contact || "", // Correct reference to user.contact
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Image preview for selected file
  const [gender, setGender] = useState(user?.gender || "");

  // Initialize location state with user data
  const [location, setLocation] = useState({
    city: user?.address?.city || "",
    district: user?.address?.district || "",
    postalCode: user?.address?.postalCode || "",
    addressDetails: user?.address?.addressDetails || "",
    location: user?.address?.location || { type: "Point", coordinates: [0, 0] },
  });

  // Ensure data is updated on user object change
  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        cnic: user.cnic || "",
        phoneNumber: user.contact || "", // Update contact with correct value
      });
      setGender(user.gender || "");
      setLocation({
        city: user.address?.city || "",
        district: user.address?.district || "",
        postalCode: user.address?.postalCode || "",
        addressDetails: user.address?.addressDetails || "",
        location: user.address?.location || {
          type: "Point",
          coordinates: [0, 0],
        },
      });
      setProfileImage(null); // Reset image on load
      setImagePreview(null); // Reset preview
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image immediately after selection
    }
  };

  const handleLocationUpdate = async () => {
    dispatch(clearMessages());
    try {
      const currentLocation = await getLocation();
      setLocation(currentLocation);
      dispatch(setSuccessMessage("Location updated successfully"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    } catch (err) {
      dispatch(setErrorMessage("Failed to fetch location."));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    const formData = new FormData();

    // Only append changed fields to the formData
    if (form.userName !== user.userName) {
      formData.append("userName", form.userName);
    }

    if (form.firstName !== user.firstName) {
      formData.append("firstName", form.firstName);
    }

    if (form.lastName !== user.lastName) {
      formData.append("lastName", form.lastName);
    }

    if (form.cnic !== user.cnic) {
      formData.append("cnic", form.cnic);
    }

    if (gender !== user.gender) {
      formData.append("gender", gender);
    }

    if (form.phoneNumber !== user.contact) {
      // Correct reference to user.contact
      formData.append("contact", form.phoneNumber);
    }

    // Only update location if there is a change
    if (
      location.city !== user.address?.city ||
      location.district !== user.address?.district ||
      location.postalCode !== user.address?.postalCode ||
      location.addressDetails !== user.address?.addressDetails ||
      location.location?.coordinates[0] !==
        user.address?.location?.coordinates[0] ||
      location.location?.coordinates[1] !==
        user.address?.location?.coordinates[1]
    ) {
      formData.append("address", JSON.stringify(location)); // Update location properly
    }

    // Only append the profile image if it has been changed
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      console.log("Profile updated successfully:", response);
      dispatch(updateUserData(response.user));
      dispatch(setSuccessMessage("Profile updated successfully"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    } catch (err) {
      dispatch(
        setErrorMessage(
          err?.data?.message || "Failed to update profile. Please try again."
        )
      );
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    }
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="p-4">
      {isLoading && <Loader />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}

      <Card title="Edit Profile" className="col-span-12">
        <form onSubmit={handleSubmit} className="my-2 p-2">
          {/* Profile Image */}
          <div className="flex justify-start mb-4">
            <label htmlFor="profileImage" className="cursor-pointer">
              {/* Check if there's a preview or fallback to image in redux state */}
              {imagePreview || user?.image?.url ? (
                <img
                  src={imagePreview || user?.image?.url} // Show preview or redux state image
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt="Default Avatar"
                  src="" // Show default avatar if no image is set
                />
              )}
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Username */}
          <div className="flex sm:flex-wrap gap-4 mb-4">
            <div className="flex-col w-full">
              <Typography variant="body1">Username</Typography>
              <InputField
                height="40px"
                width="100%"
                isRequired={true}
                value={form.userName}
                onChange={handleChange}
                name="userName"
                type="text"
              />
            </div>
          </div>

          {/* Names */}
          <div className="flex sm:flex-wrap gap-4 mb-4">
            <div className="flex-col w-full">
              <Typography variant="body1">First Name</Typography>
              <InputField
                height="40px"
                width="100%"
                isRequired={true}
                value={form.firstName}
                onChange={handleChange}
                name="firstName"
                type="text"
              />
            </div>
            <div className="flex-col w-full">
              <Typography variant="body1">Last Name</Typography>
              <InputField
                height="40px"
                width="100%"
                isRequired={true}
                value={form.lastName}
                onChange={handleChange}
                name="lastName"
                type="text"
              />
            </div>
          </div>

          {/* CNIC & Gender */}
          <div className="flex sm:flex-wrap gap-4 mb-4">
            <div className="flex-col w-full">
              <Typography variant="body1">CNIC</Typography>
              <InputField
                height="40px"
                width="100%"
                value={form.cnic}
                onChange={handleChange}
                name="cnic"
                type="text"
              />
            </div>
            <div className="flex-col w-full">
              <Typography variant="body1">Gender</Typography>
              <Dropdown
                value={gender}
                onSelectChange={onSelectChange}
                options={genderOptions}
                placeholder="Select Gender"
              />
            </div>
          </div>

          {/* Location Fields */}
          <div className="mb-4">
            <Typography variant="body1" className="mb-2 font-semibold">
              Location Details
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              {["city", "district", "postalCode", "addressDetails"].map(
                (field) => (
                  <div key={field} className="flex flex-col w-full">
                    <Typography variant="body2" className="mb-1">
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                    </Typography>
                    <InputField
                      height="40px"
                      width="100%"
                      value={location[field]}
                      disabled
                      name={field}
                      type="text"
                    />
                  </div>
                )
              )}

              <div className="flex justify-center sm:justify-start w-full">
                <Button
                  text="Get Current Location"
                  type="button"
                  height="40px"
                  width="200px"
                  onClick={handleLocationUpdate}
                  customColor={BackgroundColor}
                  bgColor={PrimaryColor}
                  className="rounded-md flex items-center justify-center gap-2"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex sm:flex-wrap gap-4 mb-4">
            <div className="flex-col w-full">
              <Typography variant="body1">Email</Typography>
              <InputField
                height="40px"
                width="100%"
                value={user?.email || ""}
                disabled
                type="email"
              />
            </div>
            <div className="flex-col w-full">
              <Typography variant="body1">Phone Number</Typography>
              <InputField
                height="40px"
                isRequired={true}
                width="100%"
                value={form.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                type="number"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <Button
              text="Update Profile"
              type="submit"
              height="40px"
              width="50%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
