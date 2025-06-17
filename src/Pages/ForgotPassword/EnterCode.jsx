import React, { useState, useEffect } from "react";
import Typography from "../../Theme/Typography.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField.jsx";
import Button from "../../Components/Button.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Image from "../../Assets/Images/reserve.svg";
import ErrorMessage from "../../Components/ErrorMessage.jsx";
import SuccessMessage from "../../Components/SuccessMessage.jsx";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../../State/Slices/messageHandlerSlice.js";
import { clearCurrentTab } from "../../State/Slices/tabHandlerSlice.js"; // Added import
import {
  useVerifyOTPMutation,
  useResendOTPMutation,
} from "../../State/Services/userApi.js"; // Added resend OTP mutation
import Loader from "../../Components/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    from: "",
    otp: "",
  });
  const [resendLoading, setResendLoading] = useState(false); // Added for resend OTP loading state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation(); // Added for resend OTP
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );
  const currentTab = useSelector((state) => state.tabHandler.currentTab);

  const location = useLocation();

  // Handle location.state validation and form initialization
  useEffect(() => {
    if (!location.state || !location.state.email || !location.state.from) {
      dispatch(setErrorMessage("Invalid access. Please request a new OTP."));
      setTimeout(() => dispatch(clearMessages()), 5000);
      navigate("/login"); // Redirect if state is invalid
    } else {
      const { email, from } = location.state;
      setForm((prevForm) => ({
        ...prevForm,
        email,
        from,
      }));
    }
  }, [location.state, navigate, dispatch]);

  // Clear currentTab if it exists
  useEffect(() => {
    if (currentTab) {
      dispatch(clearCurrentTab());
    }
  }, [currentTab, dispatch]); // Added currentTab to dependencies

  // Handle form input changes
  const handleChange = (e) => {
    const value =
      e.target.name === "otp"
        ? e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());

    // Validate OTP
    if (!form.otp || form.otp.length !== 6 || isNaN(form.otp)) {
      dispatch(setErrorMessage("Please enter a valid 6-digit OTP"));
      setTimeout(() => dispatch(clearMessages()), 5000);
      return;
    }

    try {
      await verifyOTP({
        otp: form.otp,
        email: form.email,
        from: form.from,
      }).unwrap();
      dispatch(setSuccessMessage("OTP verified successfully!"));
      const { email, from } = form;
      setForm({ email: "", from: "", otp: "" });

      // Navigate based on 'from' value
      if (from === "reset-password") {
        setTimeout(() => {
          dispatch(clearMessages());
          navigate("/reset-password", { state: { email } });
        }, 2500);
      } else if (from === "signup") {
        setTimeout(() => {
          dispatch(clearMessages());
          navigate("/login");
        }, 2500);
      }
    } catch (error) {
      dispatch(setErrorMessage(error.data?.error || "Failed to verify OTP"));
      setTimeout(() => dispatch(clearMessages()), 5000);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setResendLoading(true);
    dispatch(clearMessages());
    try {
      await resendOTP(location.state.email).unwrap();
      dispatch(setSuccessMessage("OTP resent successfully!"));
      setTimeout(() => dispatch(clearMessages()), 5000);
    } catch (error) {
      dispatch(setErrorMessage(error.data?.error || "Failed to resend OTP"));
      setTimeout(() => dispatch(clearMessages()), 5000);
    } finally {
      setResendLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex md:flex-col flex-row bg-TextColor">
      {/* Left Section */}
      {(errorMessage || successMessage) && (
        <div className="message-container">
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {successMessage && <SuccessMessage message={successMessage} />}
        </div>
      )}
      {(isLoading || resendLoading) && <Loader />}
      <div className="relative flex-1 text-white">
        <div className="absolute inset-0">
          <img
            src={Image}
            alt="Exterior view of a hotel building"
            className="object-cover md:hidden h-full w-full"
          />
          <div className="absolute inset-0 bg-black/40" />
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
          <div className="mb-10 text-center">
            <Typography
              id="otp-form-title"
              variant="h2"
              className="mb-2 text-3xl font-bold"
            >
              {location.state.from === "reset-password"
                ? "Reset Password"
                : "Verify Your Email"}
            </Typography>
            <Typography variant="body1" className="text-AccentColor3">
              We sent a code to {location.state?.email || "your email"}
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-1"
            aria-labelledby="otp-form-title"
          >
            <div className="text-TextColor flex flex-col gap-1">
              <Typography variant="h6" className="text-AccentColor3">
                Enter Code
              </Typography>
              <InputField
                height="40px"
                width="100%"
                placeholder="000000"
                type="text" // Changed to text for better control
                onChange={handleChange}
                name="otp"
                value={form.otp}
                onKeyPress={handleKeyPress}
                aria-label="Enter 6-digit OTP"
                aria-describedby="otp-error"
              />
            </div>
            <Typography variant="body4" className="text-AccentColor3 mb-8">
              A recovery code has been sent to your email.
            </Typography>
            <Button
              text="Continue"
              type="submit"
              height="40px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md"
            />
          </form>
          <div className="mt-1 flex flex-row items-center gap-1">
            <Typography variant="body1" className="text-AccentColor3">
              Didn't receive the email?
            </Typography>
            <button
              type="button"
              className={`text-BackgroundColor cursor-pointer ${
                resendLoading ? "opacity-50" : ""
              }`}
              onClick={handleResend}
              disabled={resendLoading}
              aria-label="Resend OTP"
            >
              {resendLoading ? "Sending..." : "Send Again"}
            </button>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <Link to="/terms" className="text-gray-500 hover:underline">
              Terms and Conditions
            </Link>
            {" | "}
            <Link to="/privacy" className="text-gray-500 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
