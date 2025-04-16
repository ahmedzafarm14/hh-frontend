import React from "react";

const styles = {
  h1: "text-h1 sm:text-[22px] sm:font-semibold xs:text-[20px] xs:font-normal",
  h2: "text-h2 sm:text-[20px] sm:font-medium xs:text-[18px] xs:font-normal",
  h3: "text-h3 sm:text-[18px] sm:font-medium xs:text-[16px] xs:font-normal",
  h4: "text-h4 sm:text-[16px] sm:font-medium xs:text-[14px] xs:font-normal",
  h5: "text-h5 sm:text-[14px] sm:font-medium xs:text-[12px] xs:font-normal",
  h6: "text-h6 sm:text-[14px] xs:text-[12px]",
  body1:
    "text-body1 sm:text-[14px] sm:font-normal xs:text-[12px] xs:font-light",
  body2:
    "text-body2 sm:text-[14px] sm:font-normal xs:text-[12px] xs:font-light",
  body3:
    "text-body3 sm:text-[14px] sm:font-normal xs:text-[12px] xs:font-light",
  body4:
    "text-body4 sm:text-[14px] sm:font-normal xs:text-[12px] xs:font-light",
  body5:
    "text-body5 sm:text-[14px] sm:font-normal xs:text-[12px] xs:font-light",
};

const Typography = ({ variant, children, colors, className }) => {
  return (
    <div
      className={`${styles[variant]} ${styles[colors]} ${className} font-montserrat`}
    >
      {children}
    </div>
  );
};

export default Typography;
