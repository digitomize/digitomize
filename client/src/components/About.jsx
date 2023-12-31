import React from "react";
import {
  AiFillStar,
  AiOutlineUsergroupAdd,
  AiFillLinkedin,
} from "react-icons/ai";
import { MetaData } from "./CustomComponents";
import { Link } from "react-router-dom";
import Contributors from "./Contributors";
import { about_us, logo } from "./AllAssets";
import MuiTimeline from "./Timeline";
export default function About() {
  return (
    <>
      <MetaData path="about" />
      <div className=" w-11/12 mx-auto text-center mt-4 antialiased font-outfit ">
        <div className="hero">
          <div className="hero-content flex-col sm:flex-row">
            <div className="left text-center flex flex-col justify-center items-center">
              {/* <div className="text-center w-fit">
                <h1 className="lg:text-[83px] sm:text-[50px] md:text-[61px] phone:text-[30px] items-center text-white justify-center  max-phone:text-5xl my-0 font-medium flex phone:flex-row max-phone:flex-col mx-auto w-full">
                  An{" "}
                  <span className="bg-digitomize-bg phone:hidden py-[2px] sm:py-1 rounded-md font-bold sm:ml-2 w-fit">
                    Open
                  </span> <span className="bg-digitomize-bg phone:hidden py-[2px] sm:py-1 my-1 rounded-md font-bold sm:mr-2 w-fit">
                    Source
                  </span>
                  <span className="bg-digitomize-bg max-phone:hidden py-[2px] sm:py-1 rounded-md font-bold mx-2">
                    Open Source
                  </span>
                  {" "}

                  project
                </h1>
                <p className="py-6 font-['Source Code Pro'] phone:text-4xl phone:text-right text-xl">
                  by and for the coders
                </p>
              </div> */}
              {/* <div>
                                <p className="text-xl my-4 w-3/5 mx-auto">
                                    Digitomize is designed to provide developers with a comprehensive platform for exploring coding contests and creating dynamic portfolios that showcase their coding skills and achievements.
                                </p>
                            </div> */}
              <div className="w-full flex flex-row justify-between  text-white mt-[80px]">
                <div className="flex flex-col lg:max-w-[50%] text-left">
                  <div className="mb-[50px]">
                    <h2 className="mb-[50px] font-semibold text-5xl">
                      Digitomize’s Platform
                    </h2>
                    <p className="text-[20px]">
                      At Digitomize, we believe coding isn't just a skill, it's
                      a superpower. It's the language of innovation, the key to
                      unlocking countless possibilities, and the fuel that
                      drives the digital world. We're here to empower coders of
                      all levels to take control of their coding journey,
                      showcase their talent, and achieve their full potential.
                    </p>
                  </div>
                  <div className="">
                    <h2 className="mb-[18px] font-semibold text-5xl">
                      Our Mission
                    </h2>
                    <p className="text-[20px]">
                      Our mission is simple: to be the ultimate coder's
                      companion, providing the tools and resources you need to
                      level up your skills, compete with the best, and build a
                      career you love.
                    </p>
                  </div>
                </div>
                <div className="w-full h-full hidden lg:block "><img src={about_us} className="object-contain max-h-[525px]" alt="" /></div>
              </div>
              <div className="mt-[70px]">
                <h2 className="font-semibold text-5xl text-left  text-white">
                  {" "}
                  What we do
                </h2>
                <div className="flex flex-row justify-between mt-[50px] flex-wrap gap-y-[25px] gap-x-[25px] ">
                  <div className="border-[1px] flex-1 border-solid border-white bg-[#0e0f10] min-w-[225px] text-white rounded-[12px] py-[30px] px-[25px] text-center">
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

                  <div className="border-[1px] flex-1 border-solid border-white min-w-[225px] bg-[#0e0f10] text-white rounded-[12px] py-[30px] px-[25px] text-center">
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
                  <div className="border-[1px] flex-1  border-solid border-white min-w-[225px] bg-[#0e0f10] text-white rounded-[12px] py-[30px] px-[25px] text-center">
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
                </div>
              </div>
              <div className="mt-[70px]">
                <h2 className="font-[500] text-5xl text-center mb-[75px] text-white">
                  Milestones of Digitomize
                </h2>
                <MuiTimeline></MuiTimeline>
              </div>
              {/* <div className="flex flex-col md:w-4/5 lg:w-3/5  phone:w-3/5">
                <div className="one flex md:flex-row max-md:flex-col">
                  <div className="left md:w-2/5">
                    <h1 className="m-0 md:text-left">contests</h1>
                  </div>
                  <div className="right md:w-3/5 md:text-left">
                    Explore upcoming coding contests from platforms like
                    LeetCode, Codeforces, CodeChef, and more. Filter contests
                    based on various criteria and view contest details such as
                    remaining time, duration, and more
                  </div>
                </div>
                <div className="two flex md:flex-row max-md:flex-col mt-4">
                  <div className="left md:w-2/5">
                    <h1 className="m-0 md:text-left">portfolio</h1>
                  </div>
                  <div className="right md:w-3/5 md:text-left">
                    Create your developer portfolio by providing user handles
                    for different coding platforms. The platform dynamically
                    fetches and displays your updated ratings, achievements, and
                    coding history.
                  </div>
                </div>
              </div> */}

              <div className="divider phone:w-2/5 max-phone:w-3/5 mx-auto"></div>
              <div className="w-[80vw]">
                <Contributors />
              </div>

              {/* <div className="lg:hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-2">
                                <div className="">
                                    <div className="mockup-browser border bg-base-300">
                                        <div className="mockup-browser-toolbar">
                                            <div
                                                className="input text-custom-blue"
                                                style={{ width: "fit-content" }}
                                            >
                                                digitomize.com/profile
                                            </div>
                                        </div>
                                        <div className="flex flex-row px-4 py-4 bg-base-200">
                                            <div className="flex flex-col w-2/4">
                                                <Avatar
                                                    src="/src/assets/hacker.png"
                                                    className="bg-custom-blue mb-2 self-center"
                                                    sx={{ padding: "6%", width: 40, height: 40 }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                                                />
                                            </div>
                                            <div className="flex flex-col w-2/4">
                                                <Skeleton
                                                    variant="rounded"
                                                    sx={{ bgcolor: "grey.600" }}
                                                    width={"100%"}
                                                    height={"60%"}
                                                    className="mx-2"
                                                />
                                                <Skeleton
                                                    variant="rounded"
                                                    sx={{ bgcolor: "grey.600" }}
                                                    width={"100%"}
                                                    height={"70%"}
                                                    className="mt-2 mx-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow">
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
            <div className="stat-value text-secondary">32k+</div>
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
              <div className="stat-value text-secondary">800+</div>
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
              <div className="stat-value text-secondary">200+</div>
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
              <div className="stat-value text-secondary">50+</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </Link>
        </div>
        <div className="sm:w-10/12 mx-auto">
          <h1 className="w-full text-left py-2">How to contribute</h1>
          <div className="parts flex sm:flex-row text-left max-sm:flex-col">
            <div className="sm:w-1/3  phone:space-x-2 sm:space-x-0  flex sm:flex-col max-sm:flex-row">
              <div>
                <div
                  className="radial-progress text-digitomize-bg"
                  style={{ "--value": 33 }}
                  role="progressbar"
                >
                  1
                </div>
              </div>
              <div className="p-2 sm:mt-4">
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
              </div>
            </div>
            <div className="sm:w-1/3  phone:space-x-2 sm:space-x-0  flex sm:flex-col max-sm:flex-row">
              <div>
                <div
                  className="radial-progress text-digitomize-bg"
                  style={{ "--value": 66 }}
                  role="progressbar"
                >
                  2
                </div>
              </div>
              <div className="p-2 sm:mt-4">
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
              </div>
            </div>
            <div className="sm:w-1/3 phone:space-x-2 sm:space-x-0 flex sm:flex-col max-sm:flex-row">
              <div>
                <div
                  className="radial-progress text-digitomize-bg"
                  style={{ "--value": 100 }}
                  role="progressbar"
                >
                  3
                </div>
              </div>
              <div className="p-2 sm:mt-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider w-0"></div>
      {/* <Footer /> */}
    </>
  );
}
