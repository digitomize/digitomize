import React from "react";

const MobNav = ({ isMenuActive, toggleActive }) => {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 py-4 md:hidden border-b border-b-white/5 bg-zinc-950`}
    >
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex">
            <a href="/" className="group">
              <svg
                height="30"
                viewBox="0 0 1631 472"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-flex-shrink-0 text-3xl"
              >
                <path
                  d="M0.421875 412.975C78.5269 491.079 205.16 491.079 283.265 412.975C361.369 334.87 361.369 208.237 283.265 130.132L247.909 165.487C306.488 224.066 306.488 319.041 247.909 377.619C189.331 436.198 94.3559 436.198 35.7769 377.619L0.421875 412.975Z"
                  fill="#00E9A3"
                ></path>
              </svg>
            </a>
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-2 opacity-60"
          >
            <div
              className="flex items-center justify-center p-2 opacity-60"
              onClick={toggleActive} // Directly call toggleActive in the onClick handler
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
              isMenuActive ? "opacity-100" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <a
              target="_self"
              className="group/link-new inline-flex cursor-pointer items-center transition gap-1 px-5 rounded-full hover:bg-emerald-400 hover:text-emerald-950 disabled:bg-white/5 disabled:text-zinc-50 justify-center py-3 text-lg font-medium bg-emerald-400 font-display text-zinc-950"
              href="/login"
            >
              <span>Login</span>
            </a>
            <div className="flex flex-col mt-6 divide-y divide-white/5 border-y border-y-white/5">
              <a
                className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                href="/contests"
                onClick={toggleActive}
              >
                Contests
              </a>
              <a
                className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                href="/about"
                onClick={toggleActive}
              >
                About
              </a>
              <a
                className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                href="/blog"
                onClick={toggleActive}
              >
                Blog
              </a>
              <a
                className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                href="https://upstash.com/discord"
                onClick={toggleActive}
              >
                Discord
              </a>
              <a
                className="flex items-center gap-2 py-4 font-display text-lg font-medium"
                href="/docs"
                onClick={toggleActive}
              >
                Docs
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MobNav;
