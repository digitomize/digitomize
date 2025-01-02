import React from "react";
import {
  AiFillStar,
  AiOutlineUsergroupAdd,
  AiFillLinkedin,
} from "react-icons/ai";
import { MetaData } from "@components/CustomComponents";
import { Link } from "react-router-dom";
import Contributors from "./Contributors";
import Programs from "./Programs";
import { about_us } from "./assets/assets";
import MuiTimeline from "./Timeline";
import { motion } from "framer-motion";
export default function About() {
  return (
    <>
      <MetaData path="about" />
      <div className=" w-11/12 mx-auto text-center mt-4 antialiased font-outfit ">
        <div className="hero">
          <div className="hero-content flex-col sm:flex-row">
            <div className="left text-center flex flex-col justify-center items-center">
              <div className="w-full flex flex-row justify-between  text-white phone:mt-[80px] max-phone:mt-4">
                <div className="flex flex-col lg:max-w-[50%] text-left">
                  <div className="mb-[50px]">

                    <motion.div
                      initial={{ opacity: 0, x: -150 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 100,
                        delay: 0.5,
                      }}
                      className="heading mb-8 w-fit"
                    >
                      <h1 className="mt-2 text-white max-md:text-4xl md:text-6xl">
                        <span>Digitomize’s Platform</span>
                      </h1>
                      <h3 className="text-left text-custom-blue">
                        Your Gateway to Coding Success!
                      </h3>
                    </motion.div>
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
                      className="text-[20px]"
                    >
                      At Digitomize, we believe coding isn't just a skill, it's
                      a superpower. It's the language of innovation, the key to
                      unlocking countless possibilities, and the fuel that
                      drives the digital world. We're here to empower coders of
                      all levels to take control of their coding journey,
                      showcase their talent, and achieve their full potential.
                    </motion.p>
                  </div>
                  <div className="">
                    <motion.h2
                      initial={{ opacity: 0, x: -150 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 100,
                        delay: 2,
                      }}
                      className="mb-[18px] font-semibold text-5xl"
                    >

                      Our Mission
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -150 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 100,
                        delay: 2.5,
                      }}
                      className="text-[20px]"
                    >
                      Our mission is simple: to be the ultimate coder's
                      companion, providing the tools and resources you need to
                      level up your skills, compete with the best, and build a
                      career you love.
                    </motion.p>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0, y: 150 }}
                  whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 1.5,
                  }}
                  className="lg:w-[50%] h-full lg:flex justify-end max-lg:hidden"
                >
                  <img src={about_us} className="object-contain h-[525px]" alt="" /></motion.div>
              </div>
              <div className="mt-[70px]">
                <motion.h2
                  initial={{ opacity: 0, x: -150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.5,
                  }}
                  className="font-semibold text-5xl text-left  text-white"
                >
                  {" "}
                  What we do
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.7,
                  }}
                  className="flex flex-row justify-between mt-[50px] flex-wrap gap-y-[25px] gap-x-[25px] "
                >
                  <div className="hover:scale-110 hover:transition transition border-[1px] flex-1 border-solid border-white bg-[#0e0f10] min-w-[225px] text-white rounded-[12px] py-[30px] px-[25px] text-center">
                    <h3 className="font-semibold text-2xl mb-[20px]">
                      Contests
                    </h3>
                    <p className="text-[1rem]">
                      Explore a curated selection of upcoming coding contests
                      from renowned platforms like LeetCode, Codeforces,
                      CodeChef, and more. Filter contests based on your skill
                      level, preferred format, and available time. Dive into
                      detailed contest descriptions, track leaderboards, and
                      stay ahead of the competition.
                    </p>
                  </div>

                  <div className="hover:scale-110 hover:transition transition border-[1px] flex-1 border-solid border-white min-w-[225px] bg-[#0e0f10] text-white rounded-[12px] py-[30px] px-[25px] text-center">
                    <h3 className="font-semibold text-2xl mb-[20px]">
                      Portfolio
                    </h3>
                    <p className="text-[1rem]">
                      Forget manual updates and tedious formatting. Simply
                      connect your user handles from different platforms, and
                      watch your portfolio blossom with your latest ratings,
                      achievements, and coding history. Impress potential
                      employers, collaborators, and the tech community with your
                      dynamic skill showcase.
                    </p>
                  </div>
                  <div className="hover:scale-110 hover:transition transition border-[1px] flex-1  border-solid border-white min-w-[225px] bg-[#0e0f10] text-white rounded-[12px] py-[30px] px-[25px] text-center">
                    <h3 className="font-semibold text-2xl mb-[20px]">
                      Open Source
                    </h3>
                    <p className="text-[1rem]">
                      We believe in the power of collaboration. Digitomize is an
                      open-source project, meaning anyone can contribute to its
                      growth and evolution. Share your ideas, code, and
                      expertise to make it an even more powerful resource for
                      coders worldwide.
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0, y: 0 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 4,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.5,
                }}
                className="stats stats-vertical lg:stats-horizontal shadow mt-14"
              >
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">total views</div>
                  <div className="stat-value text-secondary">80k+</div>
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>
                <Link
                  to={"https://www.linkedin.com/company/digitomize"}
                  className="stat p-0"
                >
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                      <AiFillLinkedin className="w-8 h-8" />
                    </div>
                    <div className="stat-title">linkedin followers</div>
                    <div className="stat-value text-secondary">1100+</div>
                    {/* <div className="stat-desc">21% more than last month</div> */}
                  </div>
                </Link>
                <Link
                  to={"https://github.com/digitomize/digitomize/stargazers"}
                  className="stat p-0"
                >
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                      <AiFillStar className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Github Stars</div>
                    <div className="stat-value text-secondary">500+</div>
                    {/* <div className="stat-desc">21% more than last month</div> */}
                  </div>
                </Link>
                <Link
                  to={"https://github.com/digitomize/digitomize#contributors-"}
                  className="stat p-0"
                >
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <AiOutlineUsergroupAdd className="w-8 h-8" />
                    </div>
                    <div className="stat-title">contributors</div>
                    <div className="stat-value text-secondary">65+</div>
                    {/* <div className="stat-desc">21% more than last month</div> */}
                  </div>
                </Link>
              </motion.div>
              <div className="mt-[70px]">
                {/* <h2 className="font-[500] text-5xl text-center mb-[75px] text-white">
                  Milestones of Digitomize
                </h2> */}
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
                  className="my-4 py-4 text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center"
                >
                  <span className="block mt-1 md:mt-6">
                    <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">Milestones</span>
                    of Digitomize
                  </span>
                </motion.h1>
                <MuiTimeline></MuiTimeline>
              </div>

              <div className="w-[80vw]">
                <Programs />
              </div>

              <div className="w-[80vw]">
                <Contributors />
              </div>
            </div>
          </div>
        </div>


        <div className="sm:w-10/12 mx-auto">
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
            className="w-full text-left py-2 mb-4"
          >How to contribute</motion.h1>
          <div className="parts flex sm:flex-row text-left max-sm:flex-col">
            <div className="sm:w-1/3  phone:space-x-2 sm:space-x-0  flex sm:flex-col max-sm:flex-row">
              <div>
                <motion.div
                  initial={{ "--value": 0 }}
                  whileInView={{ "--value": 33 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.5,
                  }}
                  className="radial-progress text-digitomize-bg"
                  role="progressbar"
                >
                  1
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.5,
                }}
                className="p-2 sm:mt-4"
              >
                <h4 className="text-2xl font-medium leading-tight">
                  Read the docs
                </h4>
                <p className="mt-2 text-base font-book leading-snug text-gray-9">
                  Start by reading digitomize's{" "}
                  <a
                    className="text-digitomize-bg"
                    href="https://github.com/digitomize/digitomize/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contributing Guide
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-digitomize-bg"
                    href="https://github.com/digitomize/digitomize/blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    README
                  </a>
                  .
                </p>
              </motion.div>
            </div>
            <div className="sm:w-1/3  phone:space-x-2 sm:space-x-0  flex sm:flex-col max-sm:flex-row">
              <div>
              <motion.div
                  initial={{ "--value": 0 }}
                  whileInView={{ "--value": 66 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 1,
                  }}
                  className="radial-progress text-digitomize-bg"
                  role="progressbar"
                >
                  2
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  delay: 1,
                }}
                className="p-2 sm:mt-4"
              >
                <h4 className="text-2xl font-medium leading-tight">
                  Pick an issue
                </h4>
                <p className="mt-2 text-base font-book leading-snug text-gray-9">
                  Head over to{" "}
                  <a
                    className="text-digitomize-bg"
                    href="https://github.com/digitomize/digitomize/issues"
                    target="_blank"
                    rel="noreferrer"
                  >
                    issues page
                  </a>{" "}
                  or open a{" "}
                  <a
                    className="text-digitomize-bg"
                    href="https://github.com/digitomize/digitomize/issues/new"
                    target="_blank"
                    rel="noreferrer"
                  >
                    new issue
                  </a>
                  , Comment on it and we will assign it to you.
                </p>
              </motion.div>
            </div>
            <div className="sm:w-1/3 phone:space-x-2 sm:space-x-0 flex sm:flex-col max-sm:flex-row">
              <div>
              <motion.div
                  initial={{ "--value": 0 }}
                  whileInView={{ "--value": 100 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 1.5,
                  }}
                  className="radial-progress text-digitomize-bg"
                  role="progressbar"
                >
                  3
                </motion.div>
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
                className="p-2 sm:mt-4"
              >
                <h4 className="text-2xl font-medium leading-tight">Fix it</h4>
                <p className="mt-2 text-base font-book leading-snug text-gray-9">
                  Solve the issue and create a Pull Request. Join us on{" "}
                  <a
                    className="text-digitomize-bg"
                    href="https://digitomize.com/discord"
                  >
                    Discord
                  </a>{" "}
                  for help.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        </div>
      <div className="divider w-0"></div>
      {/* <Footer /> */}
    </>
  );
}
