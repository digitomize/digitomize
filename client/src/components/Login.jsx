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

function LoginForm(){
  const emailRef = useRef("");
  const passwordRef = useRef(null);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const setbtnState = useSetRecoilState(buttonState);
  const setError = useSetRecoilState(errorState);
  const passwordToggle = () =>{
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await logIn(emailRef.current, passwordRef.current);
      navigate("/u/dashboard");
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
  return <Form
  onSubmit={handleSubmit}
  className="flex flex-col w-full mt-5 mx-auto"
  replace
>
  <div className="flex flex-col gap-5">
    <div className="w-full px-3">
      <label className="label">
        <p>
          <span className="label-text">{"#include"}</span>
          <span className="label-text text-custom-blue">
            {" <email>"}
          </span>
        </p>
      </label>
      <input
        type="email"
        placeholder="you@email.com"
        className="input input-bordered w-full bg-black border-2 border-jet"
        onChange={(e) => emailRef.current=e.target.value}
        required
      />
    </div>
    <div className="w-full px-3">
      <label className="label">
        <p>
          <span className="label-text">{"import"}</span>
          <span className="label-text text-custom-blue">
            {" \"password\";"}
          </span>
        </p>
      </label>
      <div className="flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black border-2 border-jet">
        <input
          type={passwordShow ? "text" : "password"}
          className="bg-transparent border-none w-full input input-bordered"
          onChange={(e) => passwordRef.current=e.target.value}
          placeholder="***************"
          required
        />
        {passwordRef.current && (passwordShow ?
        <EyeOff onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2"/> :
        <Eye onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2"/>)}
      </div>
      <label className="label">
        <span className="label-text-alt"></span>
        {/* // ! TO ADD being added by nakul30*/}
        <Link to="/forgot-password" >
        <span className="label-text-alt text-custom-blue">forgot password?</span>
        </Link>
      </label>
    </div>
  </div>
  <div className="items-center">
    <div className="w-full">
      <SignoutButton
        isLoginPage = {true}
        onClickFunction={(e) => handleSubmit}
        backgroundColor="bg-[#4285f4]"
      />
    </div>
    <div className="new-user text-center mb-4">
      <p>
        new user?
        <span className="text-custom-blue mx-1">
          <Link to="/signup">signup</Link>
        </span>
      </p>
    </div>
  </div>
</Form>;
}
