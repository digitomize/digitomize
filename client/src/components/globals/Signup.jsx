import {
  Form,
  useNavigate,
  redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import {buttonState} from '@components/Login';
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
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    errors: {
      name: "",
      username: "",
      email: "",
      password: "",
      other: ""
    },
  });

  const setbtnState = useSetRecoilState(buttonState);

  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  const [passwordShow, setPasswordShow] = useState(false);

  const passwordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnState(true);
    setFormData(prev=>({
      ...prev,
      errors:{
        ...prev.errors,
        other: ""
      }
    }));
    const onError = (error)=>{
      const errorMessage = handleSignupError(error, setFormData);
      toast.error(errorMessage, {
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
    }

    try {
      await signUp(formData.email, formData.password, formData.username, formData.name);
      const token = auth.currentUser.accessToken;
      if (token) {
        axios
          .post(`${backendUrl}/user/signup`, {
            name: formData.name,
            username: formData.username,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .catch((error) => onError(error));
      }
      navigate("/login");
    } catch (error) {
      onError(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      errors:{
        ...prevData.errors,
        [name]: ""
      },
    }));
  };

  return (
    <>
      <MetaData path={"signup"} />
      <ToastContainer />
      <div className="phone:pt-4 pb-12 antialiased">
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
                      value={formData.name}
                      name="name"
                      onChange={handleInputChange}
                      pattern="^[a-zA-Z\s]*$"
                      title="Only letters and whitespaces are allowed"
                      required
                    />
                    {formData.errors.name && <h3 className="text-[#cc0000] text-center">{formData.errors.name}</h3>}
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
                      name="username"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      pattern="^[a-zA-Z]\S*$"
                      title="Username must start with a letter and contain no spaces (e.g., JohnDoe123)"
                    />
                    {formData.errors.username && <h3 className="text-[#cc0000] text-center">{formData.errors.username}</h3>}
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
                      name="email"
                      placeholder="you@mail.com"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                      {formData.errors.email && <h3 className="text-[#cc0000] text-center">{formData.errors.email}</h3>}
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
                      name="password"
                      className="bg-transparent border-none w-full input input-bordered"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="***************"
                        required
                      />
                      {formData.errors.password && <h3 className="text-[#cc0000] text-center">{formData.errors.password}</h3>}
                      {formData.password &&
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
                    {formData.errors.other && <h3 className="text-[#cc0000] text-center">{formData.errors.other}</h3>}
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

/**
 * Sets the error message of the corresponding field.
 */
const setErrorMessage = (field, message, setFormData) => {
  setFormData((prevData) => ({
    ...prevData,
    errors: {
      ...prevData.errors,
      [field]: message,
    },
  }));
};

/**
 * Is called when there is a signup error.
 */
const handleSignupError = (error, setFormData) => {
  const errorCode = error.code;
  let errorMessage = "", field = "";

  switch (errorCode) {
      case 'auth/weak-password':
          errorMessage = "The password is too weak. Please choose a stronger password.";
          field = "password"
          break;
      case 'auth/email-already-in-use':
          errorMessage = "The email address is already in use by another account.";
          field = "email"
          break;
      case 'auth/invalid-email':
          errorMessage = "The email address is invalid.";
          field = "email"
          break;
      case 'auth/operation-not-allowed':
          errorMessage = "This operation is not allowed. Please contact support.";
          field = "other"
          break;
      case 'auth/network-request-failed':
          errorMessage = "There is a network error. Please check your connection and try again.";
          field = "other"
          break;
      default:
          errorMessage = "An unknown error occurred. Please try again later.";
          field = "other"
          break;
  }
  setErrorMessage(field, errorMessage, setFormData);
  return errorMessage;
};