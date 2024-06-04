import {
  Form,
  useNavigate,
  redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
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

export async function loader() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    return redirect("/login");
  }
  if (loggedIn && auth.currentUser && auth.currentUser.emailVerified) {
    return redirect("/u/dashboard");
  }
  return null;
}

export default function Signup() {
  //useRef() has been updated with useState()
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const inputFirstName = firstName.trim();
    const inputUsername = username.trim();

    // Validation for name and username inputs
    const namePattern = /^(?!\s*$)[a-zA-Z\s]+$/;
    const usernamePattern = /^[a-zA-Z]\S*$/;

    if (!namePattern.test(inputFirstName)) {
      toast.error("Invalid name. Only letters and whitespaces are allowed.", {
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
      return;
    }

    if (!usernamePattern.test(inputUsername)) {
      toast.error("Invalid username. Must start with a letter and contain no spaces", {
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
      return;
    }

    try {
      await signUp(email, password, username, firstName);
      const token = auth.currentUser.accessToken;
      if (token) {
        axios
          .post(`${backendUrl}/user/signup`, {
            name: inputFirstName,
            username: inputUsername,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          .catch((err) => setError(err.code));
      }
      toast.success("Verification link sent to email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login", { replace: true });
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
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col w-full mt-5 mx-auto"
                replace
              >
                <div className="flex flex-col gap-1">
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"#include"}</span>
                        <span className="label-text text-custom-blue">
                          {" <name>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="your name"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setFirstName(e.target.value)}
                      pattern="^[a-zA-Z\s]*$"
                      title="Only letters and whitespaces are allowed"
                      required
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"#include"}</span>
                        <span className="label-text text-custom-blue">
                          {" <username>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      pattern="^[a-zA-Z]\S*$"
                      title="Username must start with a letter and contain no spaces (e.g., JohnDoe123)"
                    />
                  </div>
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
                      placeholder="you@mail.com"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="***************"
                        required
                      />
                      {password &&
                        (passwordShow ? (
                          <EyeOff
                            onClick={passwordToggle}
                            className="w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ) : (
                          <Eye
                            onClick={passwordToggle}
                            className="w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="items-center">
                  <div className="w-full">
                    <SignoutButton
                      onClickFunction={(e) => handleSubmit}
                      isLoginPage={false}
                      backgroundColor="bg-[#4285f4]"
                    />
                  </div>
                  <div className="new-user text-center mb-4">
                    <p>
                      already a user?
                      <span className="text-custom-blue mx-1">
                        <Link to="/login">login</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
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
