import React from "react";
import {buttonState} from '@components/Login'
import { useRecoilValue } from "recoil";

function SignoutButton({
  isLoginPage,
  onClickFunction,
  backgroundColor,
}) {
  const btnState = useRecoilValue(buttonState);

  return (
    <div className="w-full flex justify-center px-4 py-4">
      <button
        onClick={onClickFunction}
        disabled={btnState}
        className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group min-w-2/5"
      >
        <span
          className={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out ${backgroundColor} rounded-md group-hover:mt-0 group-hover:ml-0`}
        ></span>
        <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
        <span
          className={`absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 ${backgroundColor} rounded-md opacity-0 group-hover:opacity-100 `}
        ></span>
        <span className="relative text-black transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
        {isLoginPage ? (btnState ? 'Logging in...' : 'Log in') :(btnState ? "Joining in..." : "Join the coders")}
        </span>
      </button>
    </div>
  );
}

export default SignoutButton;
