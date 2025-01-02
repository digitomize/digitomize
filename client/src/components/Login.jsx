import {
  Form,
  redirect,
  Link,
  useNavigate,
} from "react-router-dom";
import loginIcon from "@assets/fingerprint-animate-blue.svg";
import { useRef, useState } from "react";
import { MetaData } from "./CustomComponents";
import { useUserAuth } from "@context/UserAuthContext";

import { isLoggedIn } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import SignoutButton from "@user/components/SignoutButton";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import GithubAuthButton from "./AuthButtons/GithubAuthButton";
import { Eye, EyeOff } from "lucide-react";
import { LoginForm } from "./globals/AuthModal";

export async function loader({ request }) {
  const message = new URL(request.url).searchParams.get("message");
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
      return redirect("/u/dashboard");
  }

  return message;
}


export const buttonState = atom({
  key: "btnState",
  default: false,
});

export const errorState = atom({
  key: "errorState",
  default: "",
});

export default function Login() {
  const error = useRecoilValue(errorState);
   // disable feature
  return (
    <>
      <MetaData path={"login"} />
      <ToastContainer />
      <div className="phone:mt-12 antialiased">
        {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
        <div className="outer w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
          <div className="left md:w-2/4 max-md:w-full phone:px-12">
            <div className="heading text-center">
              <h1 className="max-phone:mt-8">
                {/* <img src={welcomeBack} alt="" className="text-white" /> */}
                Welcome back!
              </h1>
              <p>
                Your <span className="text-custom-blue">virtual presence</span>{" "}
                was missed...
              </p>
            </div>
            <div className="auth-btns flex flex-row gap-2 justify-center mt-4">
              <GoogleAuthButton
              />
              <GithubAuthButton
              />
            </div>
            <div className="divider">OR</div>
            <div className="email-form mx-auto">
            <LoginForm/>
            </div>
          </div>
          <div className="right md:w-2/4 max-md:hidden px-12 my-auto h-full">
            <img src={loginIcon} alt="Login image" className="" />
          </div>
        </div>
      </div>
    </>
  );
}

