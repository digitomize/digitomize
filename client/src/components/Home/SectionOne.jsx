// import { Element } from "react-scroll";

import meltcd from "@assets/meltcd.png";
import { useUserAuth } from "@context/UserAuthContext";
import { Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import gitbook from "./svgs/GitBookLight.svg";
import msme from "./svgs/MSME.svg";
import digitalOcean from "./svgs/digitalOcean.svg";
import microsoft from "./svgs/microsoft4strp.svg";
export default function SectionOne() {
  const { user } = useUserAuth();
  return (
    <div className="noCursor font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center phone:mt-16 ">
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0,
        }}
      >
        <Link
          to="https://github.com/digitomize/digitomize"
          className="noCursor flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs"
        >
          We're open source | Star Now! <Star fontSize="small" />
        </Link>
      </motion.div>
      <div className="noCursor w-10/12">
        <motion.h1
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="noCursor mt-2 text-white max-md:text-4xl md:text-7xl"
        >
          <span>One place for all your</span>
          <span className="noCursor block mt-1 md:mt-6 relative">
            <span className="noCursor bg-digitomize-bg px-2 relative">
              <span className="noCursor relative z-10">
                {/* <img src={santaHat} className="noCursor absolute -rotate-45 transform h-16 w-16 -left-2 top-[-10%]" alt="Santa Hat" /> */}
                coding platforms
              </span>
            </span>{" "}
            needs
          </span>{" "}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 1,
          }}
          className="noCursor text-description max-sm:text-sm sm:text-md md:text-xl mt-6"
        >
          Elevate your coding and development journey with digitomize
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 1.5,
        }}
        className="noCursor flex justify-center phone:mt-16 mt-8"
      >
        {user ? (
          <Link
            to="/u/dashboard"
            className="noCursor btn px-5 py-2  border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border"
          >
            <div className="noCursor flex justify-center items-center gap-1">
              Welcome {user.displayName}
              <GoArrowUpRight />
            </div>
          </Link>
        ) : (
          <Link
            to="/signup"
            className="noCursor btn px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border
            noCursor
            "
          >
            <div className="noCursor flex justify-center items-center gap-1">
              Register Now
              <MdPlayArrow />
            </div>
          </Link>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 2,
        }}
        className="noCursor mt-14"
      >
        <span>
          <p className="noCursor text-lg text-powered">Supported By</p>
        </span>
        <span className="noCursor flex flex-row flex-wrap gap-4 items-center justify-center">
          <a href="https://m.do.co/c/db7dbc698e16">
            <img
              className="noCursor max-md:w-36 md:w-44"
              src={digitalOcean}
              draggable={false}
              alt="microsoft"
            />
          </a>
          <a href="https://www.microsoft.com/en-us/startups">
            <img
              className="noCursor max-md:w-32 md:w-40"
              src={microsoft}
              draggable={false}
              alt="microsoft"
            />
          </a>
          <a href="https://www.gitbook.com/">
            <img
              className="noCursor max-md:w-32 md:w-40"
              src={gitbook}
              draggable={false}
              alt="gitbook"
            />
          </a>
          <a href="https://msme.gov.in/">
            <img
              className="noCursor w-15 sm:w-25 md:w-30"
              src={msme}
              draggable={false}
              alt="msme"
            />
          </a>
          <a href="https://github.com/digitomize/digitomize">
            <img
              className="noCursor max-md:w-32 md:w-40"
              src={meltcd}
              draggable={false}
              alt="meltcd"
            />
          </a>
        </span>
      </motion.div>
    </div>
  );
}
