import React from "react";
import { themeColors } from "../../theme.js";

const Button = ({ children, styles, type, text }) => {
  return (
    <button
      type={type}
      className={`${styles} shadow-md transition duration-300`}
      style={{
        backgroundColor: themeColors.button.secondary,
        color: themeColors.button.text,
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = themeColors.button.hover;
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = themeColors.button.base;
      }}
    >
      {text}
    </button>
  );
};

export default Button;
