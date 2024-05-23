import {
  Form,
  useNavigate,
  redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import {buttonState} from "@components/Login";
import { useState } from "react";
import { isLoggedIn } from "../../../api";
import { auth } from "../../../firebase";
import { useUserAuth } from "@context/UserAuthContext";
import { MetaData } from "../CustomComponents";
import GoogleAuthButton from "../AuthButtons/GoogleAuthButton";
import GithubAuthButton from "../AuthButtons/GithubAuthButton";
import { ToastContainer, toast } from "react-toastify";
import loginIcon from "@assets/fingerprint-animate-blue.svg";
import { Eye, EyeOff } from "lucide-react";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
import SignoutButton from "@user/components/SignoutButton";
import { useSetRecoilState } from "recoil";
import { SignupForm } from "./AuthModal";

export async function loader() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    return redirect("/login");
  }
  return null;
}

export default function Signup() {
  const firstNameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const setbtnState = useSetRecoilState(buttonState);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  const [passwordShow, setPasswordShow] = useState(false);

  const passwordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await signUp(emailRef.current, passwordRef.current, usernameRef.current, firstNameRef.current);
      const token = auth.currentUser.accessToken;
      if (token) {
        axios
          .post(`${backendUrl}/user/signup`, {
            name: firstNameRef.current,
            username: usernameRef.current,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          .catch((err) => setError(err.code));
      }
      navigate("/login");
    } catch (err) {
      toast.error(err.code, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setbtnState(false);
      setError(err.code);
    }
  };

  return (
    <>
      <MetaData path={"signup"} />
      <ToastContainer />
      <div className="phone:pt-4 pb-12 antialiased">
        {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
        <div className="outer w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
          <div className="left md:w-2/4 max-md:w-full phone:px-12">
            <div className="heading text-center">
              <h1 className="max-phone:mt-8">
                Create an Account
              </h1>
              <p>
                Sign Up for a{" "}
                <span className="text-custom-blue">World of Coding </span>{" "}
                Possibilities
              </p>
            </div>
            <div className="auth-btns flex flex-row gap-2 justify-center mt-4">
              <GoogleAuthButton
              />
              <GithubAuthButton
              />
            </div>
            <div className="divider mb-0">OR</div>
            <div className="email-form mx-auto my-0">
             <SignupForm/>
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
