import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import logo from "@assets/logo.png";
import { useUserAuth } from "@context/UserAuthContext";

import { navLinks, navLinksDashboard } from "../../components/globals/Navbar/navLinks";

export default function DashboardNavbar() {
  const { user } = useUserAuth();
  // console.log("user is", user);
  // if (user) {
  //     console.log("user is", user.displayName);
  // }
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
      <MobileNav isMenuActive={isMenuActive} toggleActive={toggleActive} />
      <div
        className="noCursor sticky inset-x-0 top-0 z-50 pt-10 hidden justify-center md:flex pointer-events-auto w-fit m-auto"
        style={navbarStyle}
      >
        {/* <div className="noCursor absolute inset-x-0 top-0 h-40 pointer-events-none -z-10 bg-gradient-to-b from-zinc-950 to-transparent"></div> */}

        <div className="noCursor flex cursor-pointer items-center gap-4 rounded-full bg-white p-2">
          <Link to="/">
            <div className="noCursor flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
              <img
                src={logo}
                alt="logo"
                className="noCursor bg-black hover:bg-blue-700 rounded-full"
              />
            </div>
          </Link>
          <div className="noCursor flex items-center">
            {navLinks.map((navLink, index) => (
              <>
                <Link
                  to={navLink.path}
                  key={index}
                  className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${location.pathname === navLink.path
                      ? "bg-zinc-400 text-zinc-950"
                      : ""
                    } hover:bg-zinc-200`}
                >
                  {navLink.title}
                </Link>
              </>
            ))}
          </div>
          <div className="noCursor flex justify-end">
            {user ? (
              <div className="noCursor dropdown dropdown-hover dropdown-bottom">
                <a href="/u/dashboard">
                  <div className="noCursor flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
                    <img
                      src={user.photoURL || logo}
                      alt="logo"
                      className="noCursor bg-black hover:bg-blue-700 rounded-full"
                    />
                  </div>
                  {/* <label tabIndex={0} className="noCursor btn">
                    Hover
                  </label>{" "} */}
                </a>
                <ul
                  tabIndex={0}
                  className="noCursor dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {navLinksDashboard.map((navLinkDashboard, index) => (
                    <>
                      <li key={index}>
                        <Link to={navLinkDashboard.path}>
                          <span>{navLinkDashboard.title}</span>
                        </Link>
                      </li>
                    </>
                  ))}
                  <li>
                    <Link to={"/logout"} className="noCursor text-custom-blue">
                      <span>{"logout"}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="noCursor group/link-new inline-flex cursor-pointer items-center transition gap-1 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-black-300 disabled:bg-white/5 disabled:text-zinc-50 bg-custom-blue text-blue-950"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
