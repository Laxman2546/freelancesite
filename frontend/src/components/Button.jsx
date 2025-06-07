import React from "react";
import { themeColors } from "../hooks/theme.js";

const Button = ({
  children,
  styles,
  type = "button",
  text,
  onClick = () => {},
  isDisabled,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${styles} shadow-md transition duration-300 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        backgroundColor: themeColors.button.secondary,
        color: themeColors.button.text,
      }}
      onMouseOver={(e) => {
        if (!isDisabled) {
          e.target.style.backgroundColor = themeColors.button.hover;
        }
      }}
      onMouseOut={(e) => {
        if (!isDisabled) {
          e.target.style.backgroundColor = themeColors.button.base;
        }
      }}
      onClick={isDisabled || !onClick ? () => {} : onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
