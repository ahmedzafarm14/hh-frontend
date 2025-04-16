import React, { useState } from "react";
import Card from "../../Components/Card";
import InputField from "../../Components/InputField.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "../../Theme/Typography.jsx";
import Dropdown from "../../Components/Dropdown.jsx";
import FileUploader from "../../Components/FileUploader.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Button from "../../Components/Button.jsx";
import { Role } from "../../Utlis/constants";

const Registration = ({ role = Role }) => {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  // const [alertMessage, setAlertMessage] = useState(message || "");
  // const [alertType, setAlertType] = useState(message ? "success" : "");
  const navigate = useNavigate();

  //   const [login] = useLoginMutation();

  // Handle alert close
  const handleAlertClose = () => {
    // setAlertMessage("");
    // setAlertType("");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // setAlertMessage("");
    // setAlertType("");

    try {
      //   const response = await login(form).unwrap();
      //   setAlertMessage(response.message);
      // setAlertType("success");
      setTimeout(() => {
        navigate("/dashboard/analytics");
      }, 2000);
    } catch (error) {
      if (error.data && error.data.error) {
        // setAlertMessage(error.data.error);
      } else {
        // setAlertMessage("System Error");
      }
      // setAlertType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !submitting) {
      handleSubmit(e);
    }
  };
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [location, setlocation] = useState("");
  const [charge, setcharge] = useState("");

  const onSelectChange = (event) => {
    setGender(event.target.value);
  };

  const selectChange = (event) => {
    setNationality(event.target.value);
  };
  const selectLocation = (event) => {
    setlocation(event.target.value);
  };
  const selectCharge = (event) => {
    setcharge(event.target.value);
  };

  // Define options to pass as props
  const genderOptions = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
  ];
  const nationalityOptions = [
    { value: 1, label: "Pakistani" },
    { value: 2, label: "American" },
  ];
  const locationOptions = [
    { value: 1, label: "lahore" },
    { value: 2, label: "multan" },
  ];
  const chargeOptions = [
    { value: 1, label: "2000" },
    { value: 2, label: "3000" },
  ];

  return (
    <div>
      {role === "owner" ? (
        <>
          <Card title="Owner Information" className="col-span-12">
            <div className="my-2 p-2">
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>First Name</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="Your First Name"
                    type="text"
                    onChange={handleChange}
                    name="firstname"
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Last Name</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="Your Last Name"
                    type="text"
                    onChange={handleChange}
                    name="lastname"
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Email</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Phone Number</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="Phone Number"
                    type="number"
                    onChange={handleChange}
                    name="phoneNumber"
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Gender</Typography>
                  <Dropdown
                    value={gender}
                    onSelectChange={onSelectChange}
                    options={genderOptions}
                    placeholder="Select Gender"
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Nationality</Typography>
                  <Dropdown
                    value={nationality}
                    onSelectChange={selectChange}
                    options={nationalityOptions}
                    placeholder="Select Nationality"
                  />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>CNIC Front Picture</Typography>
                  <FileUploader fileName="Upload CNIC Front Picture" />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>CNIC Back Picture</Typography>
                  <FileUploader fileName="Upload CNIC Back Picture" />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Profile Picture</Typography>
                  <FileUploader fileName="Upload Your Picture" />
                </div>
                <div className=" w-full"></div>
              </div>
            </div>
          </Card>
          <Card title="Hostel Information" className="col-span-12">
            <div className=" my-2 p-2">
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Hostel Name</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="Hostel Name"
                    type="text"
                    onChange={handleChange}
                    name="hostelName"
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Founded Date</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="00-00-000"
                    type="text"
                    onChange={handleChange}
                    name="foundedDate"
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Location</Typography>
                  <Dropdown
                    value={location}
                    onSelectChange={selectLocation}
                    options={locationOptions}
                    placeholder="Select Location"
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Average Charge</Typography>
                  <Dropdown
                    value={charge}
                    onSelectChange={selectCharge}
                    options={chargeOptions}
                    placeholder="Select Average Charge"
                  />
                </div>
              </div>
              <div className="flex sm:flex-wrap gap-2">
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>About</Typography>
                  <InputField
                    height="40px"
                    width="100%"
                    placeholder="About"
                    type="text"
                    onChange={handleChange}
                    name="about"
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex-col w-full">
                  <Typography variant={"body1"}>Logo</Typography>
                  <FileUploader fileName="Upload Your Logo" />
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card title="Client Information" className="col-span-12">
          <div className="my-2 p-2">
            <div className="flex sm:flex-wrap gap-2">
              <div className="flex-col w-full">
                <Typography variant={"body1"}>First Name</Typography>
                <InputField
                  height="40px"
                  width="100%"
                  placeholder="Your First Name"
                  type="text"
                  onChange={handleChange}
                  name="firstname"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Last Name</Typography>
                <InputField
                  height="40px"
                  width="100%"
                  placeholder="Your Last Name"
                  type="text"
                  onChange={handleChange}
                  name="lastname"
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="flex sm:flex-wrap gap-2">
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Email</Typography>
                <InputField
                  height="40px"
                  width="100%"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Phone Number</Typography>
                <InputField
                  height="40px"
                  width="100%"
                  placeholder="Phone Number"
                  type="number"
                  onChange={handleChange}
                  name="phoneNumber"
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="flex sm:flex-wrap gap-2">
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Gender</Typography>
                <Dropdown
                  value={gender}
                  onSelectChange={onSelectChange}
                  options={genderOptions}
                  placeholder="Select Gender"
                />
              </div>
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Nationality</Typography>
                <Dropdown
                  value={nationality}
                  onSelectChange={selectChange}
                  options={nationalityOptions}
                  placeholder="Select Nationality"
                />
              </div>
            </div>
            <div className="flex sm:flex-wrap gap-2">
              <div className="flex-col w-full">
                <Typography variant={"body1"}>CNIC Front Picture</Typography>
                <FileUploader fileName="Upload CNIC Front Picture" />
              </div>
              <div className="flex-col w-full">
                <Typography variant={"body1"}>CNIC Back Picture</Typography>
                <FileUploader fileName="Upload CNIC Back Picture" />
              </div>
            </div>
            <div className="flex sm:flex-wrap gap-2">
              <div className="flex-col w-full">
                <Typography variant={"body1"}>Profile Picture</Typography>
                <FileUploader fileName="Upload Your Picture" />
              </div>
              <div className=" w-full"></div>
            </div>
          </div>
        </Card>
      )}
      <div className="text-center">
        <Button
          text="Update"
          type="submit"
          height="40px"
          width="50%"
          customColor={BackgroundColor}
          bgColor={PrimaryColor}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Registration;
