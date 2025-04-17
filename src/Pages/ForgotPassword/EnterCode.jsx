import React, { useState, useEffect } from "react";
import Typography from "../../Theme/Typography.jsx";
import { Link } from "react-router-dom";
import InputField from "../../Components/InputField.jsx";
import Button from "../../Components/Button.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Image from "../../Assets/Images/reserve.svg";

export default function LoginPage() {
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
            className="object-cover md:hidden h-[99%] w-[100%]"
          />
          <div className="absolute inset-0 bg-black/40" />
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
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Password Reset</h2>
            <p className="text-AccentColor3">We sent a code to @xyzgmail.com</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-1"
          >
            <div className="text-TextColor flex flex-col gap-1">
              <Typography variant={"h6"} className={"text-AccentColor3"}>
                Enter Code
              </Typography>
              <InputField
                height="40px"
                width="100%"
                placeholder="000000"
                type="number"
                onChange={handleChange}
                name="code"
                onKeyPress={handleKeyPress}
              />
            </div>

            <Typography variant={"body4"} className={"text-AccentColor3 mb-8"}>
              A recovery code has been sent to your email.
            </Typography>
            <Link to="/reset-password">
              <Button
                text="Continue"
                type="submit"
                height="40px"
                width="100%"
                state={submitting ? true : false}
                customColor={BackgroundColor}
                bgColor={PrimaryColor}
                className="rounded-md"
              />
            </Link>
          </form>
          <div className="mt-1 flex flex-row items-center gap-1">
            <Typography variant="body1" className="text-AccentColor3">
              Didn’t receive the email?
            </Typography>
            <Link to="">
              <Typography
                variant="body1"
                className="text-BackgroundColor cursor-pointer"
              >
                Send Again
              </Typography>
            </Link>
          </div>

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
