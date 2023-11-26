import React, {
  useState,
  useEffect
} from 'react'

import {
  Form,
  Link
} from 'react-router-dom'

import Checkbox from '../components/Checkbox'
import UserDashboard from "./UserDashboard"
import { submitUserFormData, userDashboardDetails } from '../../../api'
// import { useUserAuth } from '../../context/UserAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import { Skeleton } from "@mui/material"
import NewNavbar from "../../components/NewNavbar"
import DashboardNavbar from "../components/DashboardNavbar"
import NewFooter from "../../components/NewFooter";
import LoadingScreen from "../../components/LoadingScreen";


import leetcode from "../../assets/leetcode.svg";
import codechef from "../../assets/codechef.svg";
import codeforces from "../../assets/codeforces.svg";
import geeksforgeeks from "../../assets/geeksforgeeks.svg";
import codingninjas from "../../assets/codingninjas.png";




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
    const res = userDashboardDetails()
    if (!res.data) {
      return null;
    }
    else {
      return res.data;
    }
  } catch (err) {
    console.log(err)
    return null
  }

}

export default function UserDashRatings() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  let ratingsData = data?.ratings
  // console.log("RATINGGSS:", ratingsData);
  const username = data?.personal_data.username

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
            }
          })
        }
      } catch (err) {
        console.log(err);
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
    }
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
    const res = await submitUserFormData(formData)
      .then(() => {
        toast.success('updated successfully!', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }).catch(err => {
        toast.error('error updating', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(err)
      })
    console.log(res);
  }

  if (data) {
    return (
      <>
        <ToastContainer />
        <div className="md:py-20 h-fit mt-24 w-11/12 mx-auto">

          <ul className="menu menu-xs bg-base-200 rounded-lg w-fit mx-auto my-auto md:scale-150">

            <li>
              <Link to={"/u/dashboard/account"}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                account.js
              </Link>
            </li>

            <li>
              <ul>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline mr-2 -ml-4 "><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                My ratings
                <ul />

                {/* codeforces */}
                <li>
                  <details open>
                    <summary>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      my.codeforces
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a href="https://codeforces.com/profile" target="_blank">
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img src={platformsIcon[4]} className="inpt-xs w-full h-full p-1" />
                              </div>
                            </a>
                            <input type="text" className="input input-bordered join-item input-xs" placeholder="username" name="codeforces" id="codeforces" value={formData.codeforces.username} onChange={handleInputChangeObjData} />
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      my.codechef
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a href="https://www.codechef.com/dashboard" target="_blank">
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img src={platformsIcon[3]} className="inpt-xs w-full h-full" />
                              </div>
                            </a>
                            <input className="input input-bordered join-item input-xs" placeholder="username" name="codechef" id="codechef" value={formData.codechef.username} onChange={handleInputChangeObjData} />
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      my.leetcode
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <div className="join">
                            <a href="https://leetcode.com/" target="_blank">
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img src={platformsIcon[0]} className="inpt-xs w-full h-full p-1" />
                              </div>
                            </a>
                            <input className="input input-bordered join-item input-xs" placeholder="username" name="leetcode" id="leetcode" value={formData.leetcode.username} onChange={handleInputChangeObjData} />
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      my.geeksforgeeks
                    </summary>
                    <ul>
                      <li>
                        <a>

                          <div className="join">
                            <a href="#">
                              <div className="w-8 h-6 input-bordered join-item bg-cardsHover">
                                <img src={platformsIcon[2]} className="inpt-xs w-full h-full" />
                              </div>
                            </a>
                            {/* <div className="tooltip" data-tip="hello"> */}
                            <input className="input input-bordered join-item input-xs" placeholder="coming soon..." name="geeksforgeeks" id="geeksforgeeks" value={formData.geeksforgeeks?.username} onChange={handleInputChangeObjData} disabled />
                            {/* </div> */}
                          </div>
                        </a>
                      </li>
                    </ul>

                  </details>
                </li>
                <ul />

              </ul>
            </li>


            <li><Link to={"/u/leaderboard"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              ranks.board
            </Link></li>

            <Form onSubmit={handleSubmit} className="mx-auto">
              <button
                type="submit"
                className="text-black bg-white font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center my-2 self-center"
              >
                Update
              </button>
            </Form>

          </ul>
        </div>
        <div className="flex justify-center py-12">
          <div className="divider w-3/5"></div>
        </div>
      </>
    );
  }
}

