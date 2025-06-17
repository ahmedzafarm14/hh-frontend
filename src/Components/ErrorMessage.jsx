import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
