import React, { useState, useEffect } from "react";

import { Form, Link } from "react-router-dom";

import Checkbox from "../components/Checkbox";
import UserDashboard from "./UserDashboard";
import { submitUserFormData, userDashboardDetails } from "../../../api";

import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import NewNavbar from "../../components/globals/Navbar/NewNavbar";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "@components/globals/Footer";
import LoadingScreen from "@components/globals/LoadingScreen";

import leetcode from "@assets/leetcode.svg";
import codechef from "@assets/codechef.svg";
import codeforces from "@assets/codeforces.svg";
import geeksforgeeks from "@assets/geeksforgeeks.svg";
import codingninjas from "@assets/codingninjas.png";
import { MetaData } from "@components/CustomComponents";
import { uniqueToast } from "../../core/utils/unique-toast";

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
];
const platforms = [
  "leetcode",
  "codingninjas",
  "geeksforgeeks",
  "codechef",
  "codeforces",
];

export async function loader() {
  try {
    const res = userDashboardDetails();
    if (!res.data) {
      return null;
    } else {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function UserDashRatings() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const toastId = uniqueToast();
  const [isDisabled, setIsDisabled] = useState(false);
  let ratingsData = data?.ratings;
  // console.log("RATINGGSS:", ratingsData);
  const username = data?.personal_data.username;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          setData(res.data);
          ratingsData = res.data.ratings;
          // console.log("HM", ratingsData);
          setFormData({
            username: username,
            codeforces: {
              username: ratingsData?.codeforces.data || "",
              showOnWebsite: ratingsData?.codeforces?.showOnWebsite || true,
            },
            codechef: {
              username: ratingsData?.codechef.data || "",
              showOnWebsite: ratingsData?.codechef?.showOnWebsite || true,
            },

            leetcode: {
              username: ratingsData?.leetcode.data || "",
              showOnWebsite: ratingsData?.leetcode?.showOnWebsite || true,
            },
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    username: username,
    codeforces: {
      username: ratingsData?.codeforces.data || "",
      showOnWebsite: ratingsData?.codeforces?.showOnWebsite || true,
    },
    codechef: {
      username: ratingsData?.codechef.data || "",
      showOnWebsite: ratingsData?.codechef?.showOnWebsite || true,
    },

    leetcode: {
      username: ratingsData?.leetcode.data || "",
      showOnWebsite: ratingsData?.leetcode?.showOnWebsite || true,
    },
  });

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  // console.log(ratingsData);

  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        username: value,
      },
    }));
  };
  const updateShowOnWebsite = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        showOnWebsite: value,
      },
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    const res = await submitUserFormData(formData)
      .then(() => {
        setIsDisabled(false);
        toast.success("updated successfully!", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: toastId
        });
      })
      .catch((err) => {
        toast.error(
          err.response
            ? err.response.data.error
            : err.request
              ? err.request
              : err.message,
          {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: toastId
          },
        );
        console.error(err);
        setIsDisabled(false);
      });
    // console.log(res);
  }

  if (data) {
    return (
      <>
        <MetaData path="u/dashboard/ratings" />
        <ToastContainer />

        {/* <div className="max-phone:hidden">

      <UserDashboard/>
        </div> */}
        <div className="max-md:py-20 md:py-12 min-h-[60vh] mt-12 w-11/12 m-auto">
          {/* <div className="w-full flex justify-center md:justify-end mb-12 md:mb-8">
        <Checkbox />
      </div> */}

          <ul className="menu menu-xs bg-base-200 rounded-lg w-fit mx-8 border border-jet my-auto md:scale-150">
            <li>
              <Link to={"/u/dashboard/account"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                account.js
              </Link>
            </li>

            <li>
              <ul>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 inline mr-2 -ml-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
                my ratings
                <ul />
                {/* codeforces */}
                <li>
                  <details open>
                    <summary>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      my.codeforces
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a
                              href="https://codeforces.com/profile"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img
                                  src={platformsIcon[4]}
                                  className="inpt-xs w-full h-full p-1"
                                />
                              </div>
                            </a>
                            <input
                              type="text"
                              className="input input-bordered join-item input-xs"
                              placeholder="username"
                              name="codeforces"
                              id="codeforces"
                              value={formData.codeforces.username}
                              onChange={handleInputChangeObjData}
                            />
                          </div>
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* codechef */}
                <li>
                  <details open>
                    <summary>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      my.codechef
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a
                              href="https://www.codechef.com/dashboard"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img
                                  src={platformsIcon[3]}
                                  className="inpt-xs w-full h-full"
                                />
                              </div>
                            </a>
                            <input
                              className="input input-bordered join-item input-xs"
                              placeholder="username"
                              name="codechef"
                              id="codechef"
                              value={formData.codechef.username}
                              onChange={handleInputChangeObjData}
                            />
                          </div>
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* leetcode */}
                <li>
                  <details open>
                    <summary>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      my.leetcode
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a
                              href="https://leetcode.com/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img
                                  src={platformsIcon[0]}
                                  className="inpt-xs w-full h-full p-1"
                                />
                              </div>
                            </a>
                            <input
                              className="input input-bordered join-item input-xs"
                              placeholder="username"
                              name="leetcode"
                              id="leetcode"
                              value={formData.leetcode.username}
                              onChange={handleInputChangeObjData}
                            />
                          </div>
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* geeksforgeeks */}
                <li>
                  <details open>
                    <summary>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      my.geeksforgeeks
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a href="#">
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img
                                  src={platformsIcon[2]}
                                  className="inpt-xs w-full h-full"
                                />
                              </div>
                            </a>
                            {/* <div className="tooltip" data-tip="hello"> */}
                            <input
                              className="input input-bordered join-item input-xs"
                              placeholder="coming soon..."
                              name="geeksforgeeks"
                              id="geeksforgeeks"
                              value={formData.geeksforgeeks?.username}
                              onChange={handleInputChangeObjData}
                              disabled
                            />
                            {/* </div> */}
                          </div>
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
                {/*                   
                  <li><a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    Project-final-2.psd
                  </a></li>
                  <li>
                    <details open>
                      <summary>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                        Images
                      </summary>
                      <ul>
                        <li><a>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                          Screenshot1.png
                        </a></li>
                        <li><a>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                          Screenshot2.png
                        </a></li>
                        <li>
                          <details open>
                            <summary>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                              Others
                            </summary>
                            <ul>
                              <li><a>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                Screenshot3.png
                              </a></li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </details>
                  </li> */}
                <ul />
              </ul>
            </li>

            <li>
              <Link to={"/u/leaderboard"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                ranks.board
              </Link>
            </li>

            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              type="submit"
              className={`mx-auto text-black bg-white font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center my-2 self-center ${isDisabled ? "cursor-not-allowed opacity-20" : null
                }`}
            >
              {isDisabled ? "Updating..." : "Update"}
            </button>
          </ul>

          {/* <Form className="flex flex-col items-center" onSubmit={handleSubmit}>

            <div className="join">
              <div>
                <div>
                  <input className="input input-bordered join-item" placeholder="https://codeforces.com/profile/" value="https://codeforces.com/profile/" readOnly />
                </div>
              </div>
              <div>
                <div>
                  <input className="input input-bordered join-item" placeholder="Search" />
                </div>
              </div>
            </div>


            <div className="relative z-0 w-full md:w-3/4 mb-12 group">
              <div className="avatar">
                <div className="w-4 mx-2">
                  <img src={platformsIcon[4]} />
                </div>
                </div>*/}
          {/* <input
                type="text"
                name="codeforces"
                id="codeforces"
                className="block py-2.5 px-0 w-1/2 text-md text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={formData.codeforces.username}
                onChange={handleInputChangeObjData}
              />
              <label
                htmlFor="codeforces"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Codeforces
              </label>
              <Checkbox isCheckedState={formData.codeforces.showOnWebsite} setState={updateShowOnWebsite('codeforces')} /> */}

          {/* </div><div className="relative z-0 w-full md:w-3/4 mb-12 group">
          <input
            type="text"
            name="geeksForGeeks"
            id="geeksForGeeks"
            className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label
            htmlFor="geeksForGeeks"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Geeks For Geeks
          </label>
        </div> */}
          {/* <div className="relative z-0 w-full md:w-3/4 mb-12 group">
              <input
                type="text"
                name="leetcode"
                id="leetcode"
                className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={formData.leetcode.username}
                onChange={handleInputChangeObjData}
              />
              <label
                htmlFor="leetcode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Leetcode
              </label>
              <Checkbox isCheckedState={formData.leetcode.showOnWebsite} setState={updateShowOnWebsite('leetcode')} />
            </div>
            <div className="relative z-0 w-full md:w-3/4 mb-6 group">
              <input
                type="text"
                name="codechef"
                id="codechef"
                className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={formData.codechef.username}
                onChange={handleInputChangeObjData}
              />
              <label
                htmlFor="codechef"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Codechef
              </label>
              <Checkbox isCheckedState={formData.codechef.showOnWebsite} setState={updateShowOnWebsite('codechef')} />
            </div>
            <button
              type="submit"
              className="text-black bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-8 "
            >
              Update
            </button>
          </Form> */}
        </div>
        <div className="flex justify-center py-12">
          <div className="divider w-3/5"></div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}
