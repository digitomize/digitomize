import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { applyActionCode } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  let isMounted = true;
  useEffect(() => {
    const { oobCode } = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    async function verifyEmail() {
      try {
        setIsLoading(true);

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
          });
          await auth.currentUser.reload();
          setIsSuccess(true);
        }
      } catch (error) {
        if (isMounted) {
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
          });
        }
      } finally {

          setIsLoading(false);

      }
    }
    verifyEmail();
    return () => {
      isMounted = false;
    };
  }, []);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center z-30">
        <div className="text-2xl text-green-400 font-bold gap-x-4 flex">
          <div className="phonesm:text-xl  md:text-4xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-green-400 to-white font-bold font-sans text-center relative z-10">Verifying User</div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full absolute border-8 border-solid border-gray-200"></div>

            <div className="w-10 h-10 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
          </div>
        </div>
      </div>
    );
  } else if (isSuccess) {
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
            className="text-black bg-white hover:bg-[#4285f4] phonesm:text-md  md:text-2xl hover:text-white transition py-2 px-4 rounded-md self-center"
          >
            Login
          </Link>
        </main>
      </div>
      </>
    );
  } else if (isError) {
    return (
      <>
      <div className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto z-30 relative antialiased">
        <h1 className="phonesm:text-xl  md:text-5xl bg-clip-text text-transparent pb-4 bg-gradient-to-tr from-rose-600 to-white font-bold font-sans text-center relative z-10">
          Oops!! something went wrong , Please try again later
        </h1>
        <Link
          to="/"
          className="text-black bg-white hover:bg-[#4285f4] hover:text-white transition py-2 px-4 phonesm:text-md  md:text-2xl rounded-md self-center"
        >
          Home
        </Link>
      </div>
      </>
    );
  }

  return null;
};

export default VerifyEmailPage;