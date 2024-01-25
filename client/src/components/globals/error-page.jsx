import { useRouteError, Link } from "react-router-dom";
import Navbar from "./NewNavbar";
import { Helmet } from "react-helmet";
import { MetaData } from "../CustomComponents";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const contentDescription = "ERROR 404".toLowerCase();
  return (
    <>
      <MetaData path="error" />
      <Navbar />
      <div className=" min-h-[75vh] flex justify-center items-center justify-items-center">
        <div className="h-full w-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-6xl md:text-[90px]">Oops!</h1>
          <p className="text-2xl md:text-[40px] text-center">Sorry, an unexpected error has occurred.</p>
          <p className="text-2xl md:text-[40px] text-center">
            <i>{error.statusText && `Error : ${error.statusText}`}</i>
          </p>
          <button className="appearance-none bg-gray-100 border border-gray-300 rounded-lg shadow-md box-border text-gray-700 cursor-pointer inline-block font-sans text-sm md:text-base font-semibold leading-5 list-none py-2 px-6 md:py-3 md:px-8 relative transition duration-200 ease-in-out select-none whitespace-nowrap hover:bg-gray-300 hover:text-gray-800 focus:outline-none disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed active:bg-gray-200 active:shadow-none ">
            <Link className="text-gray-900 no-underline text-lg" to="/discord">Report on Discord</Link>
          </button>
        </div>
      </div>
    </>
  );
}
