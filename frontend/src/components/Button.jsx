import React from "react";
import { themeColors } from "../hooks/theme.js";

const Button = ({ children, styles, type, text, onClick }) => {
  return (
    <button
      type={type}
      className={`${styles} shadow-md`}
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
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
