import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobNav from "./MobNav";

export default function NewNavbar() {
  const location = useLocation();

  const navbarStyle = {
    opacity: 1,
    transform: "none",
  };
  const [isMenuActive, setActive] = useState(false);

  function toggleActive() {
    if (window.innerWidth < 768) {
      if (isMenuActive) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }

  useEffect(() => {
    document.body.className = isMenuActive ? "overflow-hidden" : "";
  }, [isMenuActive]);

  return (
    <>
      <MobNav isMenuActive={isMenuActive} toggleActive={toggleActive} />
      <div
        className="sticky inset-x-0 top-0 z-50 pt-10 hidden justify-center md:flex pointer-events-auto w-fit m-auto"
        style={navbarStyle}
      >
        {/* <div className="absolute inset-x-0 top-0 h-40 pointer-events-none -z-10 bg-gradient-to-b from-zinc-950 to-transparent"></div> */}

        <div className="flex cursor-pointer items-center gap-4 rounded-full bg-white p-2">
          <Link to="/">
            <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
              <img
                src="/src/assets/logo.png"
                alt="logo"
                className="bg-black rounded-full"
              />
            </div>
          </Link>
          <div className="flex items-center">
            <Link
              to="/home"
              className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                location.pathname === "/home" ? "bg-zinc-400 text-zinc-950" : ""
              } hover:bg-zinc-200`}
            >
              Home
            </Link>
            <Link
              to="/contests#newHead"
              className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                location.pathname === "/contests"
                  ? "bg-zinc-400 text-zinc-950"
                  : ""
              } hover:bg-zinc-200`}
            >
              Contests
            </Link>
            <Link
              to="/contribute"
              className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                location.pathname === "/contribute"
                  ? "bg-zinc-400 text-zinc-950"
                  : ""
              } hover:bg-zinc-200`}
            >
              Contribute
            </Link>
            <Link
              to="/support"
              className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                location.pathname === "/support"
                  ? "bg-zinc-400 text-zinc-950"
                  : ""
              } hover:bg-zinc-200`}
            >
              Support
            </Link>
          </div>
          <div className="flex justify-end">
            <Link
              to="/login"
              className="group/link-new inline-flex cursor-pointer items-center transition gap-1 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-blue-250 disabled:bg-white/5 disabled:text-zinc-50 bg-blue-500 text-blue-950"
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="divider sticky"></div>
    </>
  );
}
