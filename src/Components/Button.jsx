import React from "react";
import Typography from "../Theme/Typography";
import { ReactComponent as Google } from "../Assets/Images/Google.svg";
// import Loader from "./Loader";

const Button = ({
  state,
  text,
  onClick,
  height,
  width,
  customColor,
  bgColor,
  startIcon,
  className = "",
}) => {
  const isGoogleLogin = text === "Google";

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Typography variant="body1">
      <button
        style={{
          height,
          width,
          backgroundColor: bgColor,
          color: customColor,
          display: isGoogleLogin ? "flex" : "",
          justifyContent: isGoogleLogin ? "center" : "",
          gap: isGoogleLogin ? "10px" : "",
        }}
        onClick={handleClick}
        className={`${className}`}
      >
        {/* {state ? <Loader /> : null} */}
        {isGoogleLogin && <Google />}
        {text}
        {startIcon}
      </button>
    </Typography>
  );
};

export default Button;
