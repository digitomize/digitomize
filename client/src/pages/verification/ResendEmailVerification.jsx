import React, { useState } from "react";
import "../../components/css/verification.css";
import SignoutButton from "../../user/components/SignoutButton";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";

const ResendEmailVerification = () => {
  const [btnState, setbtnState] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setbtnState(true);
      const a = await sendEmailVerification(auth.currentUser);
      console.log(a);
      toast.success("Verification E-Mail Send", {
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
    } catch (err) {
      setbtnState(false);
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
    }
  };
  return (
    <>
      <ToastContainer />
      <main className="resend-email-container">
        <h2 className="resend-email-heading">User Email Verification</h2>
        <p className="resend-email-content">
          Didn't receive the verification email? Click the button below to
          resend it.
        </p>
        <div className="resend-email-btn">
          <SignoutButton
            onClickFunction={handleSubmit}
            isDisabled={btnState}
            btnName={btnState ? "Resending..." : "Resend"}
            backgroundColor="bg-[#4285f4]"
          />
        </div>
      </main>
    </>
  );
};

export default ResendEmailVerification;
