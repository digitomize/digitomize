import {
  Form,
  redirect,
  Link,
} from "react-router-dom";
import loginIcon from "@assets/fingerprint-animate-blue.svg";
import { useState } from "react";
import { MetaData } from "./CustomComponents";
import { isLoggedIn } from "../../api";

import { ToastContainer, toast } from "react-toastify";
// import welcomeBack from "@assets/welcome-back.svg"
import SignoutButton from "@user/components/SignoutButton";

// for forgot password
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { uniqueToast } from "../core/utils/unique-toast";
const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;

export async function loader({ request }) {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    return redirect("/u/dashboard");
  }
  return null;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState("");
  const [btnState, setbtnState] = useState(false); // disable feature
  const toastId = uniqueToast();

  // for forgot password
  const actionCodeSettings = {
    url: `${frontendUrl}/login`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setLinkSent(true);
      setError("Password reset email sent! Check your inbox.");
      toast.success("Password reset email sent! Check your inbox.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: toastId
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: toastId
      });
      setbtnState(false);
    } finally {
      setbtnState(false); // Make sure to disable the button even in case of success
    }
  };

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
                Forgot Password ?
              </h1>
              <p>
                Your <span className="text-custom-blue">virtual presence</span>{" "}
                was missed...
              </p>
            </div>

            <div className="email-form mx-auto">
              <Form
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
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="items-center">
                  <div className="w-full">
                    <SignoutButton
                      onClickFunction={(e) => handleSubmit}
                      isDisabled={btnState}
                      btnName={btnState ? "Reminding in..." : "Send Reset Link"}
                      backgroundColor="bg-[#4285f4]"
                    />
                  </div>

                  <div className="new-user text-center mb-4">
                    {linkSent && (
                      <Link to="/login">
                        <p className="text-custom-blue mx-1">Login</p>
                      </Link>
                    )}
                    <p>
                      new user?
                      <span className="text-custom-blue mx-1">
                        <Link to="/signup">signup</Link>
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
