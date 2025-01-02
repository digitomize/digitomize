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
import holopin from "./svgs/holopin.svg";
import netlify from "./svgs/netlify.svg";
import googlecloud from "./svgs/googlecloud.svg";
import { cn } from "../../lib/utils";
import AnimatedGradientText from "../../components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import AuthModal from "../globals/AuthModal";
import Marquee from "react-fast-marquee";


export default function SectionOne() {

  const { user } = useUserAuth();
  return (
    <div className="font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center phone:mt-16">
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
        <Link to={"https://github.com/digitomize/digitomize"}>
          <div className="z-10 flex min-h-[2rem] items-center justify-center">
            <AnimatedGradientText>
              <span
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline animate-gradient bg-gradient-to-r from-[#f0f8ff] via-[#f0f8ff] to-[#f0f8ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent flex justify-center items-center",
                )}>
                  We're Open Source 
                  <hr className="mx-2 h-4 w-[0.5px] bg-[#f0f8ff]" />
                  Star Now!
              </span>
              &nbsp;
              <Star fontSize="small" sx={{color:"gold"}}/>
              <ChevronRight
              className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
              style={{ color: "#f0f8ff" }}
              />
            </AnimatedGradientText>
          </div>
        </Link>
      </motion.div>
      <div className="w-10/12">
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
          className="mt-2 text-white max-md:text-4xl md:text-7xl"
        >
          <span>One place for all your</span>
          <span className="block mt-1 md:mt-6 relative">
            <span className="bg-digitomize-bg px-2 relative">
              <span className="relative z-10">
                {/* <img src={santaHat} className="absolute -rotate-45 transform h-16 w-16 -left-2 top-[-10%]" alt="Santa Hat" /> */}
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
          className="text-description max-sm:text-sm sm:text-md md:text-xl mt-6"
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
        className="flex justify-center phone:mt-16 mt-8"
      >
        {user ? (
          <Link
            to="/u/dashboard"
            className="btn px-5 py-2  border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border"
          >
            <div className="flex justify-center items-center gap-1">
              Welcome {user.displayName}
              <GoArrowUpRight />
            </div>
          </Link>
        ) : (
            <div className="flex justify-center items-center gap-1  px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border">
              <AuthModal page={"signup"}/>
              <MdPlayArrow />
            </div>
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
        className="mt-14"
      >
        <span>
          <p className="text-lg text-powered">Supported By</p>
        </span>
        <Marquee gradient gradientColor="#06090E" pauseOnHover className="max-w-xl md:max-w-2xl lg:max-w-3xl">
        <span className="flex flex-row flex-wrap gap-4 px-2 items-center justify-center">
          <a href="https://m.do.co/c/db7dbc698e16">
            <img
              className="max-md:w-36 md:w-44"
              src={digitalOcean}
              draggable={false}
              alt="microsoft"
            />
          </a>
          <a href="https://www.microsoft.com/en-us/startups">
          <img
            className="max-md:w-32 md:w-40"
            src={microsoft}
            draggable={false}
            alt="microsoft"
          />
        </a>
        <a href="https://www.gitbook.com/">
          <img
            className="max-md:w-32 md:w-40"
            src={gitbook}
            draggable={false}
            alt="gitbook"
          />
        </a>
        <a href="https://msme.gov.in/">
          <img
            className="w-15 sm:w-25 md:w-30"
            src={msme}
            draggable={false}
            alt="msme"
          />
        </a>
        <a href="https://github.com/digitomize/digitomize">
          <img
            className="max-md:w-32 md:w-40"
            src={meltcd}
            draggable={false}
            alt="meltcd"
          />
        </a>
        <a href="https://www.netlify.com">
          <img
            className="max-md:w-32 md:w-40"
            src={netlify}
            draggable={false}
            alt="netlify"
          />
        </a>
        <a href="https://cloud.google.com/startup">
          <img
            className="max-md:w-32 md:w-40"
            src={googlecloud}
            draggable={false}
            alt="googlecloud"
          />
        </a>
        <a href="https://www.holopin.io/">
          <img
            className="max-md:w-32 md:w-40"
            src={holopin}
            draggable={false}
            alt="holopin"
          />
        </a>
        </span>
        </Marquee>
      </motion.div>
    </div>
  );
}
