import React from "react";

const TextAreaComponent = ({ value, onChange, name, placeholder, rows }) => {
  return (
    <textarea
      className="border border-LightBackground text-sm placeholder-AccentColor3 rounded-md w-full focus:outline-none p-2 resize-none"
      rows={rows}
      placeholder={placeholder}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextAreaComponent;
