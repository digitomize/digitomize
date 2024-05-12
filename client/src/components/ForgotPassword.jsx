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
      <div className="noCursor phone:mt-12 antialiased">
        {error && <h3 className="noCursor text-[#cc0000] text-center">{error}</h3>}
        <div className="noCursor outer w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
          <div className="noCursor left md:w-2/4 max-md:w-full phone:px-12">
            <div className="noCursor heading text-center">
              <h1 className="noCursor max-phone:mt-8">
                {/* <img src={welcomeBack} alt="" className="noCursor text-white" /> */}
                Forgot Password ?
              </h1>
              <p>
                Your <span className="noCursor text-custom-blue">virtual presence</span>{" "}
                was missed...
              </p>
            </div>

            <div className="noCursor email-form mx-auto">
              <Form
                onSubmit={handleSubmit}
                className="noCursor flex flex-col w-full mt-5 mx-auto"
                replace
              >
                <div className="noCursor flex flex-col gap-5">
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
                      placeholder="you@email.com"
                      className="noCursor input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="noCursor items-center">
                  <div className="noCursor w-full">
                    <SignoutButton
                      onClickFunction={(e) => handleSubmit}
                      isDisabled={btnState}
                      btnName={btnState ? "Reminding in..." : "Send Reset Link"}
                      backgroundColor="bg-[#4285f4]"
                    />
                  </div>

                  <div className="noCursor new-user text-center mb-4">
                    {linkSent && (
                      <Link to="/login">
                        <p className="noCursor text-custom-blue mx-1">Login</p>
                      </Link>
                    )}
                    <p>
                      new user?
                      <span className="noCursor text-custom-blue mx-1">
                        <Link to="/signup">signup</Link>
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
