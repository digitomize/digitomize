import React from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewLogOut({ btnName, isDisabled, onClickFunction }) {
  return (
    <>
      <button
        onClick={onClickFunction}
        disabled={isDisabled}
        className=" btn w-fit bg-black border-2 hover:border-[#D1E5F4] border-[#D1E5F4] shadow-[5px_5px_0px_#D1E5F4] text-white rounded-xl cursor-pointer md:text-lg font-medium flex flex-col items-center justify-center max-md:text-lg lowercase scroll-smooth flex-nowrap hover:scale-110"
      >
        <span className="">{btnName}</span>
      </button>
    </>
  );
}

export default NewLogOut;
