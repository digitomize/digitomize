import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { applyActionCode } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { uniqueToast } from "../../core/utils/unique-toast";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toastId = uniqueToast();
  let isMounted = true;
  useEffect(() => {
    const { oobCode } = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    async function verifyEmail() {
      try {
        setIsLoading((prevState)=>!prevState);

        if (isMounted) {
          await applyActionCode(auth, oobCode);
          toast.success("Verification Successfull", {
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
          await auth.currentUser.reload();
          setIsSuccess(true);
        }
      } catch (error) {
  
          setIsError(true);
          toast.error(error.code, {
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
       
      } finally {

          setIsLoading(false);

      }
    }
    verifyEmail();
    return () => {
      isMounted = false;
    };
  }, [isMounted]);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center z-30">
        <div className="text-2xl text-green-400 font-bold gap-x-4 flex">
          <div className="phonesm:text-xl  md:text-4xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-green-400 to-white font-bold font-sans text-center relative z-10">Verifying User</div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full absolute border-8 border-solid border-gray-200"/>

            <div className="w-10 h-10 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"/>
          </div>
        </div>
      </div>
    );
  }  
  if (isSuccess) {
    return (
      <>
      <div className="relative z-30">
        <ToastContainer />
        <main className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto">
          <h1 className="phonesm:text-xl  md:text-5xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-emerald-500 to-white font-bold font-sans text-center relative z-10">
            Verification Successful , Please Login
          </h1>
          <Link
            to="/login"
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
                  Login
                </span>
          </Link>
        </main>
      </div>
      </>
    );
  } 
  if (isError) {
    return (
      <>
      <div className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto z-30 relative antialiased">
        <h1 className="phonesm:text-xl  md:text-5xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-rose-600 to-white font-bold font-sans text-center relative z-10">
          Oops!! something went wrong , Please try again later
        </h1>
        <Link
            to="/"
            className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group min-w-2/5"
          >
             <span
                  className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#4285f4] rounded-md group-hover:mt-0 group-hover:ml-0"
                />
                <span className="absolute inset-0 w-full h-full bg-white rounded-md "/>
                <span
                  className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#4285f4] rounded-md opacity-0 group-hover:opacity-100 "
                />
                <span className="relative text-black transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                  Home
                </span>
          </Link>
      </div>
      </>
    );
  }
};

export default VerifyEmailPage;