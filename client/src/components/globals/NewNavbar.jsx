import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobNav from "./MobNav";
import { logo } from "../AllAssets";
import { useUserAuth } from "../../context/UserAuthContext";
import { useUserDetails } from "../../context/UserContext";
import { ROLE } from "../../core/utils/const";

export default function NewNavbar({ position }) {
  const { user } = useUserAuth();
  const { userDetails } = useUserDetails();
  const location = useLocation();

  const [scrollPos, setScrollPos] = useState(0);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMenuActive, setActive] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({
    opacity: 1,
    transform: "translateY(0)",
    transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
  });

  const navLinks = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Contests",
      path: "/contests",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Leaderboard",
      path: "/u/leaderboard",
    },
  ];

  const navLinksDashboard = [
    {
      title: "account",
      path: "/u/dashboard/account",
    },
    {
      title: "ratings",
      path: "/u/dashboard/ratings",
    },
    {
      title: "github",
      path: "/u/dashboard/github",
    },
  ];

  const toggleActive = () => {
    if (window.innerWidth < 768) {
      setActive((prevActive) => !prevActive);
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    setScrollPos(currentScrollPos);

    // Check the scroll direction
    if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
      // Scrolling down, hide the navbar
      setNavbarStyle({
        opacity: 0,
        transform: "translateY(-100%)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      });
    } else {
      // Scrolling up or at the top, show the navbar
      setNavbarStyle({
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      });
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuActive, prevScrollPos]);

  useEffect(() => {
    document.body.className = isMenuActive ? "overflow-hidden" : "";
  }, [isMenuActive]);

  const renderAdminLink = () => {
    if (
      userDetails &&
      userDetails.personal_data.role === ROLE.ADMIN
    ) {
      return (
        <Link
          to="/admin/user"
          className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
            location.pathname.includes("/admin")
              ? "bg-zinc-400 text-zinc-950"
              : ""
          } hover:bg-zinc-200`}
        >
          <div className="dropdown  dropdown-bottom">
            <label tabIndex={0}>Admin</label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow text-zinc-300 bg-base-100 rounded-box w-52 mt-2"
            >
              <li>
                <Link to={"/admin/user"}>
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/contest"}>
                  <span>Contests</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/community"}>
                  <span>Community</span>
                </Link>
              </li>
            </ul>
          </div>
        </Link>
      );
    }
  };

  return (
    <>
      <MobNav isMenuActive={isMenuActive} toggleActive={toggleActive} />
      <div
        className={`${
          position ? position : "sticky"
        } inset-x-0 top-0 relative z-50 pt-10 hidden justify-center md:flex pointer-events-auto w-fit m-auto`}
        style={{ ...navbarStyle }}
      >
        <div className="flex cursor-pointer items-center gap-4 rounded-full bg-white p-2">
          <Link to="/">
            <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
              <img
                src={logo}
                alt="logo"
                className="bg-black hover:bg-blue-700 rounded-full"
              />
            </div>
          </Link>
          <div className="flex items-center">
            {navLinks.map((navLink, index) => (
              <Link
                to={navLink.path}
                key={index}
                className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                  location.pathname === navLink.path
                    ? "bg-zinc-400 text-zinc-950"
                    : ""
                } hover:bg-zinc-200`}
              >
                {navLink.title}
              </Link>
            ))}
            {renderAdminLink()}
          </div>
          <div className="flex justify-end">
            {user ? (
              <div className="dropdown dropdown-hover dropdown-bottom">
                <a href="/u/dashboard">
                  <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-zinc-100">
                    <img
                      src={user.photoURL || logo}
                      alt="logo"
                      className="bg-black object-fill hover:bg-blue-700 rounded-full"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </a>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {navLinksDashboard.map((navLinkDashboard, index) => (
                    <li key={index}>
                      <Link to={navLinkDashboard.path}>
                        <span>{navLinkDashboard.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to={"/logout"} className="text-custom-blue">
                      <span>{"logout"}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="group/link-new inline-flex cursor-pointer items-center transition gap-1 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-black-300 disabled:bg-white/5 disabled:text-zinc-50 bg-custom-blue text-blue-950"
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