import {
  AiFillStar,
  AiOutlineUsergroupAdd,
  AiFillLinkedin,
} from "react-icons/ai"
import { Avatar, Skeleton } from "@mui/material"
import { Link } from "react-router-dom"
import Contributors from "./Contributors"
export default function About() {
  return (
    <>
      <div className='container w-11/12 mx-auto mt-4 text-center'>
        <div className='hero'>
          <div className='flex-col hero-content sm:flex-row'>
            <div className='flex flex-col items-center justify-center text-center left'>
              <div className='text-center w-fit'>
                <h1 className='flex w-full mx-auto my-0 font-medium sm:text-8xl max-sm:text-5xl phone:flex-row max-phone:flex-col'>
                  An{" "}
                  <span className='flex flex-row mx-2 font-bold text-custom-blue'>
                    Open Source
                  </span>{" "}
                  project
                </h1>
                <p className="py-6 font-['Source Code Pro'] phone:text-4xl phone:text-right text-xl">
                  by and for the coders
                </p>
              </div>
              {/* <div>
                                <p className="w-3/5 mx-auto my-4 text-xl">
                                    Digitomize is designed to provide developers with a comprehensive platform for exploring coding contests and creating dynamic portfolios that showcase their coding skills and achievements.
                                </p>
                            </div> */}
              <div className='mx-auto divider phone:w-2/5 max-phone:w-3/5'></div>
              <div className='flex flex-col phone:w-3/5'>
                <div className='flex one phone:flex-row max-phone:flex-col'>
                  <div className='left phone:w-2/5'>
                    <h1 className='m-0 phone:text-left'>contests</h1>
                  </div>
                  <div className='right phone:w-3/5 phone:text-left'>
                    Explore upcoming coding contests from platforms like
                    LeetCode, Codeforces, CodeChef, and more. Filter contests
                    based on various criteria and view contest details such as
                    remaining time, duration, and more
                  </div>
                </div>
                <div className='flex mt-4 two phone:flex-row max-phone:flex-col'>
                  <div className='left phone:w-2/5'>
                    <h1 className='m-0 phone:text-left'>portfolio</h1>
                  </div>
                  <div className='right phone:w-3/5 phone:text-left'>
                    Create your developer portfolio by providing user handles
                    for different coding platforms. The platform dynamically
                    fetches and displays your updated ratings, achievements, and
                    coding history.
                  </div>
                </div>
              </div>

              <div className='mx-auto divider phone:w-2/5 max-phone:w-3/5'></div>
              <div className='w-[80vw]'>
                <Contributors />
              </div>

              {/* <div className="flex-shrink-0 w-full max-w-sm p-2 shadow-2xl lg:hidden card bg-base-100">
                                <div className="">
                                    <div className="border mockup-browser bg-base-300">
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
                                                    className="self-center mb-2 bg-custom-blue"
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
                                                    className="mx-2 mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>

        <div className='shadow stats stats-vertical lg:stats-horizontal'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>total views</div>
            <div className='stat-value text-secondary'>16k+</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          <Link
            to={"https://www.linkedin.com/company/digitomize"}
            className='p-0 stat'
          >
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                <AiFillLinkedin className='w-8 h-8' />
              </div>
              <div className='stat-title'>linkedin followers</div>
              <div className='stat-value text-secondary'>550+</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </Link>
          <Link
            to={"https://github.com/digitomize/digitomize/stargazers"}
            className='p-0 stat'
          >
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                <AiFillStar className='w-8 h-8' />
              </div>
              <div className='stat-title'>Github Stars</div>
              <div className='stat-value text-secondary'>80+</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </Link>
          <Link
            to={"https://github.com/digitomize/digitomize#contributors-"}
            className='p-0 stat'
          >
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <AiOutlineUsergroupAdd className='w-8 h-8' />
              </div>
              <div className='stat-title'>contributors</div>
              <div className='stat-value text-secondary'>30+</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </Link>
        </div>
        <div className='mx-auto phone:w-10/12'>
          <h1 className='w-full py-2 text-left'>How to contribute</h1>
          <div className='flex text-left parts phone:flex-row max-phone:flex-col'>
            <div className='flex phone:w-1/3 phone:flex-col max-phone:flex-row'>
              <div>
                <div
                  className='radial-progress text-primary'
                  style={{ "--value": 33 }}
                  role='progressbar'
                >
                  1
                </div>
              </div>
              <div className='p-2 phone:mt-4'>
                <h4 className='text-2xl font-medium leading-tight'>
                  Read the docs
                </h4>
                <p className='mt-2 text-base leading-snug font-book text-gray-9'>
                  Start by reading digitomize's{" "}
                  <a
                    className='text-primary'
                    href='https://github.com/digitomize/digitomize/blob/main/CONTRIBUTING.md'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Contributing Guide
                  </a>{" "}
                  and{" "}
                  <a
                    className='text-primary'
                    href='https://github.com/digitomize/digitomize/blob/main/README.md'
                    target='_blank'
                    rel='noreferrer'
                  >
                    README
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className='flex phone:w-1/3 phone:flex-col max-phone:flex-row'>
              <div>
                <div
                  className='radial-progress text-primary'
                  style={{ "--value": 66 }}
                  role='progressbar'
                >
                  2
                </div>
              </div>
              <div className='p-2 phone:mt-4'>
                <h4 className='text-2xl font-medium leading-tight'>
                  Pick an issue
                </h4>
                <p className='mt-2 text-base leading-snug font-book text-gray-9'>
                  Head over to{" "}
                  <a
                    className='text-primary'
                    href='https://github.com/digitomize/digitomize/issues'
                    target='_blank'
                    rel='noreferrer'
                  >
                    issues page
                  </a>{" "}
                  or open a{" "}
                  <a
                    className='text-primary'
                    href='https://github.com/digitomize/digitomize/issues/new'
                    target='_blank'
                    rel='noreferrer'
                  >
                    new issue
                  </a>
                  , Comment on it and we will assign it to you.
                </p>
              </div>
            </div>
            <div className='flex phone:w-1/3 phone:flex-col max-phone:flex-row'>
              <div>
                <div
                  className='radial-progress text-primary'
                  style={{ "--value": 100 }}
                  role='progressbar'
                >
                  3
                </div>
              </div>
              <div className='p-2 phone:mt-4'>
                <h4 className='text-2xl font-medium leading-tight'>Fix it</h4>
                <p className='mt-2 text-base leading-snug font-book text-gray-9'>
                  Solve the issue and create a Pull Request. Join us on{" "}
                  <a
                    className='text-primary'
                    href='https://digitomize.com/discord'
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
      <div className='w-0 divider'></div>
    </>
  )
}
