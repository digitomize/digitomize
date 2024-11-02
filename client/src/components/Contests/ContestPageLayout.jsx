import React from "react";
import { LockOutlined, TrendingUp } from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";
import { Swords } from "lucide-react";
import { motion } from "framer-motion";

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
                <Swords /> <div className="badge badge-warning">new</div>
            </>
        ),
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
                <div className="badge badge-error">soon</div>
            </>
        ),
        link: "/internships",
    },
    {
        name: "Jobs",
        icon: (
            <>
                <div className="badge badge-error">soon</div>
            </>
        ),
        link: "/jobs",
    },
];

const ContestPageLayout = () => {
    return (
        <motion.div 
            className="w-11/12 mx-auto antialiased"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <motion.div 
                className="heading w-4/5 mx-auto text-center my-4"
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
            >
                <h1 className="text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
                    <span>All at</span>
                    <span className="block mt-1 md:mt-6">
                        <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">one</span>
                        place
                    </span>
                </h1>
            </motion.div>
            
            <motion.div 
                className="buttons flex gap-4 justify-center mt-8 flex-wrap"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                {activeLinks.map((link, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                    >
                        <NavLink 
                            to={link.link} 
                            className={({ isActive }) => isActive ? "btn bg-custom-blue text-white" : "btn btn-outline"}
                        >
                            {link.name}
                            {link.icon}
                        </NavLink>
                    </motion.div>
                ))}
                
                {inactiveLinks.map((link, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.15 }}
                    >
                        <NavLink 
                            aria-disabled 
                            to={link.link} 
                            className={({ isActive }) => isActive ? "btn bg-custom-blue text-gray-700 max-sm:hidden" : "btn btn-outline btn-disabled max-sm:hidden"} 
                            style={{ color: "#7a7a7a" }}
                        >
                            {link.name}
                            {link.icon}
                        </NavLink>
                    </motion.div>
                ))}
            </motion.div>
            <Outlet />
        </motion.div>
    );
};

export default ContestPageLayout;
