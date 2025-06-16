import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { AlertCircleOutline } from "react-ionicons";
const DeleteAccount = () => {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);
  return (
    <main className=" flex  rounded-3xl bg-[#F4F2EE] p-9 relative">
      <div className="absolute top-5 right-5 cursor-pointer p-2 hover:bg-gray-700 hover:rounded-4xl  hover:text-white ">
        <XMarkIcon className="size-6" />
      </div>
      <div className="w-full flex flex-row gap-2">
        <div>
          <AlertCircleOutline color={"#e50606"} height="50px" width="50px" />
        </div>
        <div className=" flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Delete Account</h1>
            <p>Are you sure you want to delete your freelance account?</p>
          </div>
          <div className="flex place-items-start flex-col">
            <h1 className="font-semibold">
              type "delete" to confirm your action
            </h1>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-[#d9d9d9] rounded-xl p-3 outline-none w-[80%]"
            />
          </div>
          <div className="w-full flex flex-row justify-end gap-3">
            <button className="p-3 rounded-xl bg-gray-700 cursor-pointer text-white">
              Cancel
            </button>
            <button
              className="p-3 rounded-xl bg-red-500 text-white cursor-pointer disabled:bg-[#d9d9d9] disabled:text-gray-600 disabled:cursor-not-allowed"
              disabled={disabled && text !== "delete"}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeleteAccount;
