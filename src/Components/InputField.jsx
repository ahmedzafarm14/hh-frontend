import React, { useState, useRef } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchIcon from "@mui/icons-material/Search";

const InputField = ({
  height,
  width,
  placeholder,
  type,
  onChange,
  value,
  name,
  pattern,
  isOTP = false, // Prop to determine if this is an OTP input
  length = 6, // Number of OTP input fields
}) => {
  const [inputType, setInputType] = useState(type);
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleOTPChange = (index, event) => {
    const newValue = event.target.value.replace(/\D/g, ""); // Allow only digits
    const newValues = [...otpValues];
    newValues[index] = newValue.slice(0, 1); // Only keep the first character
    setOtpValues(newValues);
    if (onChange) {
      onChange(newValues.join(""));
    }
    // Auto focus to the next input field if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="relative w-full mb-2">
      {isOTP ? (
        <div className="flex justify-between">
          {Array(length)
            .fill(0)
            .map((_, index) => (
              <input
                required
                key={index}
                type="text"
                maxLength="1"
                value={otpValues[index]}
                onChange={(e) => handleOTPChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 border text-center outline-none border-AccentColor3"
              />
            ))}
        </div>
      ) : (
        <>
          <input
            required
            style={{ height, width }}
            className={`border border-LightBackground text-sm placeholder-AccentColor3 rounded-md w-full focus:outline-none p-2 ${
              type === "number" ? "number-input" : ""
            }`}
            placeholder={placeholder}
            type={inputType}
            value={value}
            onChange={onChange}
            name={name}
            pattern={pattern}
          />
          {type === "password" && (
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-AccentColor3"
              onClick={togglePasswordVisibility}
            >
              {inputType === "password" ? (
                <VisibilityOffOutlinedIcon style={{ fontSize: 18 }} />
              ) : (
                <RemoveRedEyeOutlinedIcon style={{ fontSize: 18 }} />
              )}
            </span>
          )}
          {type === "search" && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-AccentColor3">
              <SearchIcon />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default InputField;
