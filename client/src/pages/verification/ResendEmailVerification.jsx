import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { isLoggedIn } from "../../../api";
import { redirect } from "react-router-dom";
import { uniqueToast } from "../../core/utils/unique-toast";


export async function loader() {
  const loggedIn = await isLoggedIn();
  if (loggedIn && auth.currentUser.emailVerified) {
    return redirect("/u/dashboard");
  }else if (!loggedIn ) {
    return redirect("/login");
  }
  return null;
}

const ResendEmailVerification = () => {
  const [btnState, setbtnState] = useState(false);
  const toastId = uniqueToast();
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
        toastId: toastId
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
        toastId: toastId
      });
    }
  };
  return (
    <>
      <ToastContainer />
        
     
      <main className="h-screen  flex flex-col items-center justify-center w-fit ml-auto mr-auto gap-y-1 z-30 antialiased relative">
        <h2 className="phonesm:text-xl  md:text-5xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-[#4285f4] to-white font-bold font-sans text-center relative z-10">
          Please verify your email to continue
        </h2>
        <p className="text-neutral-500 text-xl max-w-lg mx-auto my-2  text-center relative z-10">
          Didn't receive the verification email? Click the button below to
          resend it.
        </p>
        <div className="">
        
           <div className="w-full flex justify-center px-4 py-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={btnState}
                className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group min-w-2/5"
              >
                <span
                  className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#4285f4] rounded-md group-hover:mt-0 group-hover:ml-0"
                />
                <span className="absolute inset-0 w-full h-full bg-white rounded-md "/>
                <span
                  className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#4285f4] rounded-md opacity-0 group-hover:opacity-100"
                />
                <span className="relative text-black transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                 {btnState ? 'Sending...' : 'Resend Email'}
                </span>
              </button>
        </div>
          
        </div>
      </main>
    </>
  );
};

export default ResendEmailVerification;