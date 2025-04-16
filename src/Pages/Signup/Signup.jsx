import React, { useState, useEffect } from "react";
import Typography from "../../Theme/Typography.jsx";
import { Link } from "react-router-dom";
import InputField from "../../Components/InputField.jsx";
import Button from "../../Components/Button.jsx";
import {
  PrimaryColor,
  BackgroundColor,
  TextColor,
  LightBackground,
} from "../../Theme/ColorBoilerplate.js";
import Image from "../../Assets/Images/reserve.svg";

export default function SignupPage() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("currentTab")) {
      localStorage.removeItem("currentTab");
    }
  }, []);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !submitting) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex md:flex-col flex-row bg-TextColor">
      {/* Left Section */}
      <div className="relative flex-1 text-white">
        <div className="absolute inset-0">
          <img
            src={Image}
            alt="Hotel exterior"
            fill
            className="object-cover h-[99%] w-[100%]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-start justify-center md:p-8 p-12">
          <h1 className="mb-4 text-4xl font-bold">Looking for a hostel?</h1>
          <p className="mb-8 text-lg">
            You can view the list of hostels even if you&apos;re not the
            registered user.
          </p>
          <Button
            text=" View Hostels"
            type="button"
            height="40px"
            width="100%"
            customColor={BackgroundColor}
            bgColor={PrimaryColor}
            className="rounded-md px-8"
          />
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-1 min-h-screen flex-col md:p-8 text-white p-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-1 text-BackgroundColor">
            <div className="h-4 w-4 bg-cyan-400 rounded-full ml-1"></div>
            <span className="text-lg sm:text-base font-semibold">HMS</span>
          </div>
          <div className="mt-1 flex flex-row items-center gap-1">
            <Typography variant="body1"> Already have an account?</Typography>
            <Link to="/login">
              <Typography
                variant="body1"
                className="text-cyan-400 cursor-pointer"
              >
                Log In!
              </Typography>
            </Link>
          </div>
        </div>
        <div className="flex justify-center my-auto flex-col items-center">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Welcome!</h2>
            <p className="text-AccentColor3">Create your account</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-1"
          >
            <div className="flex gap-2 text-TextColor">
              <InputField
                height="40px"
                width="100%"
                placeholder="First Name"
                type="text"
                onChange={handleChange}
                name="firstName"
                onKeyPress={handleKeyPress}
              />
              <InputField
                height="40px"
                width="100%"
                placeholder="Last Name"
                type="text"
                onChange={handleChange}
                name="lastName"
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="text-TextColor flex flex-col gap-1">
              <InputField
                height="40px"
                width="100%"
                placeholder="Email or username"
                type="text"
                onChange={handleChange}
                name="usernameOrEmail"
                onKeyPress={handleKeyPress}
              />
              <InputField
                height="40px"
                width="100%"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                name="password"
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              text="Signup"
              type="submit"
              height="40px"
              width="100%"
              state={submitting ? true : false}
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md"
            />
            <div className="flex items-center my-2">
              <hr className="flex-grow border-t border-LightBackground" />
              <Typography variant="body1" className="mx-4 text-AccentColor3">
                Or
              </Typography>
              <hr className="flex-grow border-t border-LightBackground" />
            </div>
            <Button
              text="Google"
              type="button"
              height="40px"
              width="100%"
              customColor={TextColor}
              bgColor={LightBackground}
              onClick={() => alert("Google button clicked")}
              className="rounded-md py-2 my-2 shadow-md"
            />
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            <Link href="/terms" color="inherit" underline="hover">
              Terms and Conditions
            </Link>
            |
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
