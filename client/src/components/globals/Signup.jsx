import {
  Form,
  useNavigate,
  redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { buttonState } from '@components/Login';
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
      <div className="noCursor phone:pt-4 pb-12 antialiased">
        {error && <h3 className="noCursor text-[#cc0000] text-center">{error}</h3>}
        <div className="noCursor outer w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
          <div className="noCursor left md:w-2/4 max-md:w-full phone:px-12">
            <div className="noCursor heading text-center">
              <h1 className="noCursor max-phone:mt-8">
                Create an Account
              </h1>
              <p>
                Sign Up for a{" "}
                <span className="noCursor text-custom-blue">World of Coding </span>{" "}
                Possibilities
              </p>
            </div>
            <div className="noCursor auth-btns flex flex-row gap-2 justify-center mt-4">
              <GoogleAuthButton
              />
              <GithubAuthButton
              />
            </div>
            <div className="noCursor divider mb-0">OR</div>
            <div className="noCursor email-form mx-auto my-0">
              <Form
                onSubmit={handleSubmit}
                className="noCursor flex flex-col w-full mt-5 mx-auto"
                replace
              >
                <div className="noCursor flex flex-col gap-1">
                  <div className="noCursor w-full px-3">
                    <label className="noCursor label">
                      <p>
                        <span className="noCursor label-text">{"#include"}</span>
                        <span className="noCursor label-text text-custom-blue">
                          {" <name>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="your name"
                      className="noCursor input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => firstNameRef.current = e.target.value}
                      pattern="^[a-zA-Z\s]*$"
                      title="Only letters and whitespaces are allowed"
                      required
                    />
                  </div>
                  <div className="noCursor w-full px-3">
                    <label className="noCursor label">
                      <p>
                        <span className="noCursor label-text">{"#include"}</span>
                        <span className="noCursor label-text text-custom-blue">
                          {" <username>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="noCursor input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => usernameRef.current = e.target.value}
                      required
                      pattern="^[a-zA-Z]\S*$"
                      title="Username must start with a letter and contain no spaces (e.g., JohnDoe123)"
                    />
                  </div>
                  <div className="noCursor w-full px-3">
                    <label className="noCursor label">
                      <p>
                        <span className="noCursor label-text">{"#include"}</span>
                        <span className="noCursor label-text text-custom-blue">
                          {" <email>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="email"
                      placeholder="you@mail.com"
                      className="noCursor input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => emailRef.current = e.target.value}
                      required
                    />
                  </div>
                  <div className="noCursor w-full px-3">
                    <label className="noCursor label">
                      <p>
                        <span className="noCursor label-text">{"import"}</span>
                        <span className="noCursor label-text text-custom-blue">
                          {" \"password\";"}
                        </span>
                      </p>
                    </label>
                    <div className="noCursor flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black border-2 border-jet">
                      <input
                        type={passwordShow ? "text" : "password"}
                        className="noCursor bg-transparent border-none w-full input input-bordered"
                        onChange={(e) => passwordRef.current = e.target.value}
                        placeholder="***************"
                        required
                      />
                      {passwordRef.current &&
                        (passwordShow ? (
                          <EyeOff
                            onClick={passwordToggle}
                            className="noCursor w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ) : (
                          <Eye
                            onClick={passwordToggle}
                            className="noCursor w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="noCursor items-center">
                  <div className="noCursor w-full">
                    <SignoutButton
                      onClickFunction={(e) => handleSubmit}
                      isLoginPage={false}
                      backgroundColor="bg-[#4285f4]"
                    />
                  </div>
                  <div className="noCursor new-user text-center mb-4">
                    <p>
                      already a user?
                      <span className="noCursor text-custom-blue mx-1">
                        <Link to="/login">login</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="noCursor right md:w-2/4 max-md:hidden px-12 my-auto h-full">
            <img src={loginIcon} alt="Login image" className="noCursor " />
          </div>
        </div>
      </div>
    </>
  );


}
