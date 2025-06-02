import React, { useRef, useEffect } from "react";
import { themeColors } from "../hooks/theme.js";

import gsap from "gsap";

const Errors = ({ isError, errorText, errorStyles }) => {
  const errorRef = useRef();

  useEffect(() => {
    if (isError && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -30, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.5, ease: "power2.out" }
      );
    } else if (errorRef.current) {
      gsap.to(errorRef.current, {
        opacity: 0,
        y: -30,
        height: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isError, errorText]);

  return (
    <div
      style={{ minHeight: 56 }}
      className={`w-[100%] flex justify-center items-start mb-10 ${errorStyles}`}
    >
      <div
        ref={errorRef}
        className="w-[80%] md:w-[50%] text-center p-3 rounded-2xl"
        style={{
          backgroundColor: themeColors.danger,
          color: themeColors.text.inverse,
          opacity: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: isError ? "auto" : "none",
        }}
      >
        <h1 className="font-medium">{errorText}</h1>
      </div>
    </div>
  );
};

export default Errors;
