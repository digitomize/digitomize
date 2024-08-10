import React, { useState, useRef, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Form, Link, useNavigate } from "react-router-dom";
import SignoutButton from "../../user/components/SignoutButton";
import { useUserAuth } from "@context/UserAuthContext"; // Ensure you have this import for user authentication context
import { atom, useSetRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import GoogleAuthButton from "../../components/AuthButtons/GoogleAuthButton"; 
import GithubAuthButton from "../../components/AuthButtons/GithubAuthButton"; 
import { uniqueToast } from "../../core/utils/unique-toast";

// Define your recoil states
export const buttonState = atom({
  key: "btnState",
  default: false,
});

export const errorState = atom({
  key: "errorState",
  default: "",
});

const AuthModal = ({page}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(page);
  const modalRef = useRef(null);

  const toggleLogin = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div className="flex items-center justify-center">
      <button type="button" onClick={toggleLogin} className="">
        Register Now
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          />
          <div
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-8 rounded-lg shadow-lg w-96 z-10 border-2 border-jet border-opacity-10 max-h-[90vh] overflow-auto transform transition-transform duration-300 ease-in-out scale-100 min-w-96"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-4 text-xl text-white hover:text-red-500 transition duration-300"
            >
              &times;
            </button>
            <ToastContainer />
            <div className="flex justify-center items-center mb-4">
              <button
                className={`mr-4 py-2 px-4 rounded-t-lg w-full focus:outline-none ${activeTab === "login" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"}`}
                onClick={() => handleActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`py-2 px-4 rounded-t-lg w-full focus:outline-none ${activeTab === "signup" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"}`}
                onClick={() => handleActiveTab("signup")}
              >
                Signup
              </button>
            </div>
            <div className="auth-btns flex flex-row gap-2 justify-center mt-4">
              <GoogleAuthButton />
              <GithubAuthButton />
            </div>
            <div className="divider my-4">OR</div>
            <div className="email-form mx-auto">
              {activeTab === "login" && <LoginForm />}
              {activeTab === "signup" && <SignupForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef(null);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const setbtnState = useSetRecoilState(buttonState);
  const setError = useSetRecoilState(errorState);
  const toastId = uniqueToast();

  const passwordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
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
        toastId: toastId
      });
      setError(err.code);
      } finally {
      setbtnState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col w-full mt-5 mx-auto" replace>
      <div className="flex flex-col gap-5">
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"#include"}</span>
              <span className="label-text text-custom-blue">{" <email>"}</span>
            </p>
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="input input-bordered w-full bg-black text-white border-2 border-jet"
            ref={emailRef}
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"import"}</span>
              <span className="label-text text-custom-blue">{" \"password\";"}</span>
            </p>
          </label>
          <div className="flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black text-white border-2 border-jet">
            <input
              type={passwordShow ? "text" : "password"}
              className="bg-transparent border-none w-full input input-bordered text-white"
              ref={passwordRef}
              placeholder="***************"
              required
            />
            {passwordShow ? (
              <EyeOff onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2 text-white" />
            ) : (
              <Eye onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2 text-white" />
            )}
          </div>
          <label className="label">
            <span className="label-text-alt"></span>
            <Link to="/forgot-password">
              <span className="label-text-alt text-custom-blue">forgot password?</span>
            </Link>
          </label>
        </div>
      </div>
      <div className="items-center">
        <div className="w-full">
          <SignoutButton isLoginPage={true} onClickFunction={handleSubmit} backgroundColor="bg-[#4285f4]" />
        </div>
      </div>
    </Form>
  );
}

export function SignupForm() {
  const firstNameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { signUp } = useUserAuth(); // Assuming you have a signUp function in your context
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const setbtnState = useSetRecoilState(buttonState);
  const setError = useSetRecoilState(errorState);
  const toastId = uniqueToast();

  const passwordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await signUp(emailRef.current.value, passwordRef.current.value, usernameRef.current.value, firstNameRef.current.value);
      const token = auth.currentUser.accessToken;
      if (token) {
        await axios.post(`${backendUrl}/user/signup`, {
          name: firstNameRef.current.value,
          username: usernameRef.current.value,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        toastId: toastId
      });
      setError(err.code);
      } finally {
        setbtnState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col w-full mt-5 mx-auto" replace>
      <div className="flex flex-col gap-1">
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"#include"}</span>
              <span className="label-text text-custom-blue">{" <name>"}</span>
            </p>
          </label>
          <input
            type="text"
            placeholder="your name"
            className="input input-bordered w-full bg-black text-white border-2 border-jet"
            ref={firstNameRef}
            pattern="^[a-zA-Z\s]*$"
            title="Only letters and whitespaces are allowed"
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"#include"}</span>
              <span className="label-text text-custom-blue">{" <username>"}</span>
            </p>
          </label>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full bg-black text-white border-2 border-jet"
            ref={usernameRef}
            pattern="^[a-zA-Z0-9_]+$"
            title="Username can only contain letters, numbers, and underscores"
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"#include"}</span>
              <span className="label-text text-custom-blue">{" <email>"}</span>
            </p>
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="input input-bordered w-full bg-black text-white border-2 border-jet"
            ref={emailRef}
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="label">
            <p>
              <span className="label-text">{"import"}</span>
              <span className="label-text text-custom-blue">{" \"password\";"}</span>
            </p>
          </label>
          <div className="flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black text-white border-2 border-jet">
            <input
              type={passwordShow ? "text" : "password"}
              className="bg-transparent border-none w-full input input-bordered text-white"
              ref={passwordRef}
              placeholder="***************"
              required
            />
            {passwordShow ? (
              <EyeOff onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2 text-white" />
            ) : (
              <Eye onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2 text-white" />
            )}
          </div>
        </div>
      </div>
      <div className="items-center">
        <div className="w-full">
          <SignoutButton isLoginPage={false} onClickFunction={handleSubmit} backgroundColor="bg-[#4285f4]" />
        </div>
      </div>
    </Form>
  );
}

export default AuthModal;
