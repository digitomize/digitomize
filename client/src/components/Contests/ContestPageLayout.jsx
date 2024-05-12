import React from "react";
import { LockOutlined, TrendingUp } from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";
import { Swords } from "lucide-react";

const activeLinks = [
    {
        name: "Contests",
        icon: <TrendingUp />,
        link: "contests",
    },
    {
        name: "Challenges",
        icon: (
            <>
                <Swords /> <div className="noCursor badge badge-warning">new</div>
            </>),
        link: "/challenges",
    },
    {
        name: "Hackathons",
        icon: <TrendingUp />,
        link: "/hackathons",
    },
];

const inactiveLinks = [
    {
        name: "Internships",
        icon: (
            <>
                <div className="noCursor badge badge-error">soon</div>
            </>
        ),
        link: "/internships",
    },
    {
        name: "Jobs",
        icon: (
            <>
                <div className="noCursor badge badge-error">soon</div>
            </>
        ),
        link: "/jobs",
    },
];

const ContestPageLayout = () => {
    return (
        <>
            <div className="noCursor w-11/12 mx-auto antialiased">
                <div className="noCursor heading w-4/5 mx-auto text-center my-4">
                    <h1 className="noCursor text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
                        <span>All at</span>
                        <span className="noCursor block mt-1 md:mt-6">
                            <span className="noCursor bg-digitomize-bg mx-2 px-1 rounded-lg">one</span>
                            place
                        </span>
                    </h1>

                </div>
                <div className="noCursor buttons flex gap-4 justify-center mt-8 flex-wrap">
                    {
                        activeLinks.map((link, idx) => {
                            return (
                                <NavLink key={idx} to={link.link} className={({ isActive }) => isActive ? "btn bg-custom-blue text-white" : "btn btn-outline"} >
                                    {link.name}
                                    {link.icon}
                                </NavLink>
                            );
                        })
                    }
                    {
                        inactiveLinks.map((link, idx) => {
                            return (
                                <NavLink aria-disabled key={idx} to={link.link} className={({ isActive }) => isActive ? "btn bg-custom-blue text-gray-700 max-sm:hidden" : "btn btn-outline btn-disabled max-sm:hidden"} style={{ color: "#7a7a7a" }}>
                                    {link.name}
                                    {link.icon}
                                </NavLink>
                            );
                        })
                    }
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default ContestPageLayout;