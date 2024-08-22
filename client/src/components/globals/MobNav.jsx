import React from "react";
import { logo } from "../AllAssets";
import { useUserAuth } from "../../context/UserAuthContext";

const MobNav = ({ isMenuActive, toggleActive }) => {
  const { user } = useUserAuth();

  const dashboardLink = {
    title: "Dashboard",
    path: "/u/dashboard",
  };
  const navLinks = [
    {
      title: "Contests",
      path: "/contests",
    },
    {
      title: "Blogs",
      path: "https://blogs.digitomize.com/",
    },
    {
      title: "Discord",
      path: "/discord",
    },
    {
      title: "Leaderboard",
      path: "/u/leaderboard",
    },
  ];

  return (
    <>
      <header
        className={
          "relative inset-x-0 top-0 z-50 py-4 md:hidden border-b border-b-white/5 bg-zinc-950"
        }
      >
        <div className="mx-auto max-w-screen-xl px-6 md:px-10">
          <div className="flex items-center justify-between">
            <div className="flex">
              <a href="/" className="group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-700">
                  <img src={logo} alt="logo" className="rounded-full" />
                </div>
              </a>
            </div>
            <button
              type="button"
              className="flex items-center justify-center p-2 opacity-60"
            >
              <div
                className="flex items-center justify-center p-2 opacity-60"
                onClick={toggleActive}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  className="inline-flex shrink-0 text-3xl"
                >
                  {isMenuActive ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="8" x2="20" y2="8"></line>
                      <line x1="4" y1="16" x2="20" y2="16"></line>
                    </>
                  )}
                </svg>
              </div>
            </button>
            <nav
              className={`duration-500 absolute inset-x-0 top-full z-10 mt-px flex-col p-6 pb-24 bg-zinc-950 shadow-2xl flex transition-[opacity] ${
                isMenuActive
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none z-0"
              }`}
            >
              <div className="flex flex-col  divide-y divide-white/5 border-y border-y-white/5">
                {user && (
                  <a
                    className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                    href={dashboardLink.path}
                    onClick={toggleActive}
                  >
                    {dashboardLink.title}
                  </a>
                )}
                {navLinks.map((navLink, index) => (
                  <a
                    className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                    key={index}
                    href={navLink.path}
                    onClick={toggleActive}
                  >
                    {navLink.title}
                  </a>
                ))}
              </div>
              <div className="py-4"></div>
              <a
                target="_self"
                className="group/link-new inline-flex cursor-pointer items-center transition gap-1 px-5 rounded-full hover:bg-emerald-400 hover:text-emerald-950 disabled:bg-white/5 disabled:text-zinc-50 justify-center py-3 text-lg font-medium bg-custom-blue font-display text-zinc-950"
                href={user ? "/logout" : "/login"}
              >
                <span>{user ? "logout" : "login"}</span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* {user && <Novu user={user} />} */}
    </>
  );
};

export default MobNav;
