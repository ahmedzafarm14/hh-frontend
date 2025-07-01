import React, { useState, useEffect } from "react";
import Typography from "../../Theme/Typography.jsx";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField.jsx";
import Button from "../../Components/Button.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Image from "../../Assets/Images/reserve.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentTab } from "../../State/Slices/tabHandlerSlice.js";
import { useLoginMutation } from "../../State/Services/userApi.js";
import Loader from "../../Components/Loader.jsx";
import SuccessMessage from "../../Components/SuccessMessage.jsx";
import ErrorMessage from "../../Components/ErrorMessage.jsx";
import { setUser } from "../../State/Slices/userSlice.js";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../../State/Slices/messageHandlerSlice.js";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );

  const currentTab = useSelector((state) => state.tabHandler.currentTab);
  useEffect(() => {
    if (currentTab) {
      dispatch(clearCurrentTab());
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    try {
      const response = await login(form).unwrap();
      if (response) {
        const data = {
          token: response.result.token,
          user: response.result.personData,
          role: response.result.personData.role,
        };
        dispatch(setUser(data));
        dispatch(setSuccessMessage(response.message || "Login successful!"));
        dispatch(clearMessages());
        if (data.role === "resident") {
          navigate("/hostels");
        } else if (data.role === "owner") {
          navigate("/management");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      dispatch(setErrorMessage(err.data?.message || "Login failed!"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex md:flex-col flex-row bg-TextColor">
      {isLoading && <Loader />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {/* Left Section */}
      <div className="relative flex-1 text-white">
        <div className="absolute inset-0">
          <img
            src={Image}
            alt="Hotel exterior"
            className="object-cover h-[100%] w-[100%]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-start justify-center md:p-8 p-12">
          <h1 className="mb-4 text-4xl font-bold">Looking for a hostel?</h1>
          <p className="mb-8 text-lg">
            You can view the list of hostels even if you&apos;re not the
            registered user.
          </p>
          <Link to="/hostels">
            <Button
              text=" View Hostels"
              type="button"
              height="40px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md px-8"
            />
          </Link>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-1 min-h-screen flex-col md:p-8 text-white p-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-1 text-BackgroundColor">
            <div className="h-4 w-4 bg-cyan-400 rounded-full ml-1"></div>
            <span className="text-lg sm:text-base font-semibold">HH</span>
          </div>
          <div className="mt-1 flex flex-row items-center gap-1">
            <Typography variant="body1">Don't have an account?</Typography>
            <Link to="/signup">
              <Typography
                variant="body1"
                className="text-cyan-400 cursor-pointer"
              >
                Sign Up!
              </Typography>
            </Link>
          </div>
        </div>
        <div className="flex justify-center my-auto flex-col items-center">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>
            <p className="text-AccentColor3">Login into your account</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-1"
          >
            <div className="text-TextColor flex flex-col gap-1">
              <InputField
                height="40px"
                width="100%"
                placeholder="Email or username"
                type="text"
                onChange={handleChange}
                name="email"
                autoComplete="email"
                onKeyPress={handleKeyPress}
              />
              <InputField
                height="40px"
                width="100%"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                name="password"
                autoComplete="password"
                onKeyPress={handleKeyPress}
              />
            </div>
            <Link to="/forgot-password">
              <Typography
                variant={"body4"}
                className={"text-AccentColor3 text-end mb-2"}
              >
                Forgot password?
              </Typography>
            </Link>
            <Button
              text="Login"
              type="submit"
              height="40px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md"
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
