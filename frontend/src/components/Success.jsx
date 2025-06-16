import React, { useRef, useEffect } from "react";
import { themeColors } from "../hooks/theme.js";
import gsap from "gsap";
const Success = ({ isSuccess, successText, successStyles }) => {
  const successRef = useRef();

  useEffect(() => {
    if (isSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -30, height: 0 },
        {
          opacity: 1,
          y: 0,
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else if (successRef.current) {
      gsap.to(successRef.current, {
        opacity: 0,
        y: -30,
        height: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isSuccess, successText]);

  return (
    <div
      style={{ minHeight: 56 }}
      className={`w-[100%] flex justify-center items-start   ${successStyles}`}
    >
      <div
        ref={successRef}
        className="w-[80%] md:w-auto text-center p-3 rounded-2xl"
        style={{
          backgroundColor: themeColors.success,
          color: themeColors.text.inverse,
          opacity: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: isSuccess ? "auto" : "none",
        }}
      >
        <h1 className="font-medium">{successText}</h1>
      </div>
    </div>
  );
};

export default Success;
