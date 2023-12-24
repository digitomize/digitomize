import React from "react";
import {
  AiFillStar,
  AiOutlineUsergroupAdd,
  AiFillLinkedin,
} from "react-icons/ai";
import { MetaData } from "./CustomComponents";
import { Link } from "react-router-dom";
import Contributors from "./Contributors";
import Snowfall from "react-snowfall";
import SnowFlakes from "./Home/components/SnowFlakes";

export default function About() {
  const [isSnowfallActive, setSnowfallActive] = React.useState(true);
  return (
    <>
      {isSnowfallActive && <Snowfall snowflakeCount={70} speed={[0, 0.7]} wind={[0, 0.5]} />}
      <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="top-left" />
      <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="bottom-right" />
      <MetaData path="about" />
      <div className="container w-11/12 mx-auto text-center mt-4 antialiased">
        <div className="hero">
          <div className="hero-content flex-col sm:flex-row">
            <div className="left text-center flex flex-col justify-center items-center">
              <div className="text-center w-fit">
                <h1 className="lg:text-[85px] sm:text-[50px] md:text-[65px] phone:text-[30px]  max-phone:text-5xl my-0 font-medium flex phone:flex-row max-phone:flex-col mx-auto w-full">
                  An{" "}
                  <span className="text-custom-blue font-bold mx-2 flex flex-row">
                    Open Source
                  </span>{" "}
                  project
                </h1>
                <p className="py-6 font-['Source Code Pro'] phone:text-4xl phone:text-right text-xl">
                  by and for the coders
                </p>
              </div>
              {/* <div>
                                <p className="text-xl my-4 w-3/5 mx-auto">
                                    Digitomize is designed to provide developers with a comprehensive platform for exploring coding contests and creating dynamic portfolios that showcase their coding skills and achievements.
                                </p>
                            </div> */}
              <div className="divider phone:w-2/5 max-phone:w-3/5 mx-auto"></div>
              <div className="flex flex-col md:w-4/5 lg:w-3/5  phone:w-3/5">
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
              </div>

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
            <div className="stat-value text-secondary">27k+</div>
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
              <div className="stat-value text-secondary">750+</div>
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
              <div className="stat-value text-secondary">170+</div>
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
              <div className="stat-value text-secondary">40+</div>
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
                  className="radial-progress text-primary"
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
                    className="text-primary"
                    href="https://github.com/digitomize/digitomize/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contributing Guide
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-primary"
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
                  className="radial-progress text-primary"
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
                    className="text-primary"
                    href="https://github.com/digitomize/digitomize/issues"
                    target="_blank"
                    rel="noreferrer"
                  >
                    issues page
                  </a>{" "}
                  or open a{" "}
                  <a
                    className="text-primary"
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
                  className="radial-progress text-primary"
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
                    className="text-primary"
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
