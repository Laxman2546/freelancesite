import React, { useEffect } from "react";
import { themeColors } from "../../theme";
const Errors = ({ isError, errorText }) => {
  return (
    <>
      {isError && (
        <div
          className="mb-10 w-[80%] md:w-[50%] text-center p-3 rounded-2xl"
          style={{
            backgroundColor: themeColors.danger,
            color: themeColors.text.inverse,
          }}
        >
          <h1 className="font-medium">{errorText}</h1>
        </div>
      )}
    </>
  );
};

export default Errors;
