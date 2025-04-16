import React from "react";
import Typography from "../Theme/Typography";

const Card = ({ title, style, children }) => {
  return (
    <div className={`bg-LightBackground p-4 mb-3 rounded-lg`} style={style}>
      <Typography variant="h5" className="text-TextColor">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Card;
