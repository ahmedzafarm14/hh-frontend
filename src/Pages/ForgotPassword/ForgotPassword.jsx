import React, { useState } from "react";
import Typography from "../../Theme/Typography.jsx";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField.jsx";
import Button from "../../Components/Button.jsx";
import { PrimaryColor, BackgroundColor } from "../../Theme/ColorBoilerplate.js";
import Image from "../../Assets/Images/reserve.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
} from "../../State/Slices/messageHandlerSlice.js";
import { useRequestPasswordResetMutation } from "../../State/Services/userApi.js";
import Loader from "../../Components/Loader.jsx";
import SuccessMessage from "../../Components/SuccessMessage.jsx";
import ErrorMessage from "../../Components/ErrorMessage.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageHandler
  );

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    try {
      const response = await requestPasswordReset(email).unwrap();
      if (response) {
        dispatch(
          setSuccessMessage(response.message || "OTP sent successfully!")
        );
        setTimeout(() => {
          dispatch(clearMessages());
          navigate("/enter-code", {
            state: { email, from: "reset-password" },
          });
          setEmail("");
        }, 3000);
      }
    } catch (error) {
      dispatch(setErrorMessage(error.data?.message || "An error occurred!"));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  };

  return (
    <div className="flex md:flex-col flex-row bg-TextColor">
      {isLoading && <Loader />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {/* Left Section */}
      <div className="relative flex-1 text-white">
        <div className="absolute inset-0">
          <img
            src={Image}
            alt="Hotel exterior"
            className="object-cover md:hidden h-[100%] w-[100%]"
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
            <h2 className="mb-2 text-3xl font-bold">Forget Password?</h2>
            <p className="text-AccentColor3">
              No worries, We’ll send you reset instruction.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-1"
          >
            <div className="text-TextColor flex flex-col gap-1">
              <Typography variant={"h6"} className={"text-AccentColor3"}>
                Email Address
              </Typography>
              <InputField
                height="40px"
                width="100%"
                placeholder="Enter Recovery Email"
                type="text"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <Typography variant={"body4"} className={"text-AccentColor3 mb-8"}>
              A recovery code has been sent to your email.
            </Typography>
            <Button
              text="Recover"
              type="submit"
              height="40px"
              width="100%"
              customColor={BackgroundColor}
              bgColor={PrimaryColor}
              className="rounded-md"
            />
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            <Link to="/terms">Terms and Conditions</Link> |{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
