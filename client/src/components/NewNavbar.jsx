import React, {
    useState,
    useEffect
} from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

import MobNav from "./MobNav";

import {
    logo
} from "./AllAssets";
import { useUserAuth } from "../context/UserAuthContext";

export default function NewNavbar({ position }) {
    const { user } = useUserAuth();
    console.log("user is", user);
    if (user) {
        console.log("user is", user.displayName);
    }
    const location = useLocation();

    const navbarStyle = {
        opacity: 1,
        transform: "none",
    };
    const [isMenuActive, setActive] = useState(false);

    const navLinks = [
        {
            title: 'account',
            path: "/user/dashboard/account",
        },
        {
            title: 'ratings',
            path: "/user/dashboard/ratings",
        },
        {
            title: 'github',
            path: "/user/dashboard/github",
        }
    ]

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
                className={`${position ? position : 'sticky'} inset-x-0 top-0 z-50 pt-10 hidden justify-center md:flex pointer-events-auto w-fit m-auto`}
                style={navbarStyle}
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
                        <Link
                            to="/home"
                            className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${location.pathname === "/home" ? "bg-zinc-400 text-zinc-950" : ""
                                } hover:bg-zinc-200`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/contests#list"
                            className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${location.pathname === "/contests"
                                ? "bg-zinc-400 text-zinc-950"
                                : ""
                                } hover:bg-zinc-200`}
                        >
                            Contests
                        </Link>
                        <a
                            href="https://github.com/pranshugupta54/digitomize"
                            className={`px-4 py-2 text-zinc-700 cursor-pointer hover:bg-zinc-200 rounded-full transition `}
                        >
                            Contribute
                        </a>
                        <Link
                            to="/user/leaderboard"
                            className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${location.pathname === "/user/leaderboard"
                                ? "bg-zinc-400 text-zinc-950"
                                : ""
                                } hover:bg-zinc-200`}
                        >
                            leaderboard
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        {user ? (
                            <div className="dropdown dropdown-hover dropdown-bottom">
                                <a href="/user/dashboard">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
                                        <img
                                            src={user.photoURL || logo}
                                            alt="logo"
                                            className="bg-black hover:bg-blue-700 rounded-full"
                                        />
                                    </div>

                                </a>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    {
                                        navLinks.map((navLink, index) => (
                                            <>
                                                <li key={index}>
                                                    <Link to={navLink.path}>
                                                        <span>{navLink.title}</span>
                                                    </Link>
                                                </li>
                                            </>
                                        ))
                                    }
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
