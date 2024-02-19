import React, { useState } from "react";
import SignoutButton from "../../user/components/SignoutButton";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { isLoggedIn } from "../../../api";
import { redirect } from "react-router-dom";

export async function loader() {
  const loggedIn = await isLoggedIn();
  if (loggedIn && auth.currentUser.emailVerified) {
    return redirect("/login");
  }
  return null;
}

const ResendEmailVerification = () => {
  const [btnState, setbtnState] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setbtnState(true);
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification E-Mail send", {
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
      <main className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto gap-y-1">
        <h2 className="self-start text-2xl font-bold">
          Please verify your email to continue
        </h2>
        <p className="">
          Didn't receive the verification email? Click the button below to
          resend it.
        </p>
        <div className="self-start">
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
