import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { applyActionCode } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  console.log(isError);
  useEffect(() => {
    const { oobCode } = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    async function verifyEmail() {
      try {
        setIsLoading(true);

        await applyActionCode(auth, oobCode);
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
      } catch (error) {
        toast.error(errr.code, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    verifyEmail();
  }, []);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-green-400 font-bold gap-x-4 flex">
          <div className="text-center mt-1">Verifying User</div>
          <div class="relative">
            <div class="w-10 h-10 rounded-full absolute border-8 border-solid border-gray-200"></div>

            <div class="w-10 h-10 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto">
        <h1 className="text-2xl text-rose-600 font-bold">
          Oops!! something went wrong , Please try again later
        </h1>
        <Link
          to="/"
          className="text-black bg-white hover:bg-[#4285f4] hover:text-white transition py-2 px-4 rounded-md self-start"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <main className="h-screen flex flex-col items-center justify-center w-fit ml-auto mr-auto">
        <h1 className="text-2xl text-green-400 font-bold">
          Verification Successful , Please Login
        </h1>
        <Link
          to="/login"
          className="text-black bg-white hover:bg-[#4285f4] hover:text-white transition p-2 rounded-md self-start"
        >
          Login
        </Link>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
