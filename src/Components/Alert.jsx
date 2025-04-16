import React, { useState, useEffect } from "react";

const Alert = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Hide the alert after 3 seconds if `type` is set
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  });

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };
  if (!visible) {
    return null;
  } else {
    return (
      <div
        className={`border px-4 py-1 rounded relative ${alertStyles[type]}`}
        role="alert"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <strong className="font-bold">
          {type === "success" ? "Success!" : "Error!"}
        </strong>
        <span
          className="ml-2 flex-1 overflow-hidden"
          style={{ wordWrap: "break-word" }}
        >
          {message}
        </span>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 mt-1 mr-1 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    );
  }
};

export default Alert;
