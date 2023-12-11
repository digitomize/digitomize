import { useState, useEffect } from "react";

import { auth } from "../../../firebase";

import {
  NavLink,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import Typewriter from "typewriter-effect";
import "react-toastify/dist/ReactToastify.css";
import SignoutButton from "../components/SignoutButton";
import NewLogOut from "../components/NewLogOut";
import { useUserAuth } from "../../context/UserAuthContext";
import NewNavbar from "../../components/globals/NewNavbar.jsx";
import { Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import { userDashboardDetails } from "../../../api";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../assets/logo.png";
import Badge from "@mui/material/Badge";
import MoodIcon from "@mui/icons-material/Mood";
import Tooltip from "@mui/material/Tooltip";
import Footer from "../../components/globals/Footer.jsx";
import LoadingScreen from "../../components/globals/LoadingScreen.jsx";
import ShareModel from "../../components/share_model.jsx";
import UserCard from "../Profile/components/UserCard.jsx";
const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
// import logo from "../assets/logo.png";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { user } = useUserAuth();
  const [selectedStatus, setSelectedStatus] = useState("Busy"); // Initialize with a default status

  const navLinks = [
    {
      icon: SettingsIcon,
      title: "account",
      path: "account",
    },
    {
      icon: TrendingUpIcon,
      title: "ratings",
      path: "ratings",
    },
    {
      icon: GitHubIcon,
      title: "github(soon...)",
      path: "#",
    },
  ];

  const location = useLocation();
  const [show, setShow] = useState(false);
  const close_model = () => setShow(false);

  const main_model = (
    <ShareModel
      close_model={close_model}
      contestLink={`${frontendUrl}/u/${userData?.personal_data.username}`}
      //theme={colorTheme}
      theme=""
    />
  );

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  async function handleLogout() {
    await auth.signOut();
    toast.success("Logged out successfully");
    // console.log("before");
    navigate("/login?message=Logged out successfully");
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const temp = await userDashboardDetails();
        setUserData(temp.data);
        if (user) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(true);
      }
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  const platforms = "codeforces, codechef, leetcode, geeksforgeeks";
  const trimmedPlatforms = platforms.slice(0, 15) + "...";
  if (!loading) {
    return (
      <>
        <ToastContainer />
        <NewNavbar />

        {/* FOR DESKTOP */}
        <div className="max-phone:hidden w-11/12 mx-auto mt-4">
          <h1 className="pb-4 normal-case text-[#F0ECE5]">
            Hey, {userData.personal_data.name} 👋
          </h1>

          <div className="flex flex-row">
            <div className="w-[40%]">
              <UserCard
                username={userData.personal_data.username}
                name={userData.personal_data.name}
                picture={userData.personal_data.picture}
                bio={userData.personal_data.bio.data}
                phoneNumber={userData.personal_data.phoneNumber}
                role={userData.personal_data.role}
                skills={userData.personal_data.skills}
              />
            </div>
            <div className="cards flex flex-row flex-wrap items-center justify-evenly">
              <div className="card w-96 bg-base-100 border-[#D1E5F4] border-2 shadow-[8px_8px_0px_#D1E5F4] rounded-xl my-4">
                <div className="card-body">
                  <h2 className="card-title">
                    <SettingsIcon fontSize="medium" />
                    account
                    {/* <div className="badge badge-secondary"></div> */}
                  </h2>
                  <p>Personalize your experience and manage preferences.</p>
                  <div className="card-actions justify-end">
                    <a href="/u/dashboard/account">
                      <button className="btn border-2 border-[#D1E5F4] shadow-[4px_4px_0px_#D1E5F4] hover:shadow-none hover:bg-[#D1E5F4] hover:text-[#000]">
                        <SettingsIcon fontSize="large" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card w-96 bg-base-100 border-[#D1E5F4] border-2 shadow-[8px_8px_0px_#D1E5F4] rounded-xl my-4">
                <div className="card-body">
                  <h2 className="card-title">
                    <TrendingUpIcon fontSize="medium" />
                    ratings
                    <div className="badge badge-secondary">new</div>
                  </h2>
                  <p>Connect usernames for linked coding profiles.</p>
                  <div className="card-actions justify-end">
                    <a href="/u/dashboard/ratings">
                      <button className="btn border-2 border-[#D1E5F4] shadow-[4px_4px_0px_#D1E5F4] hover:shadow-none hover:bg-[#D1E5F4] hover:text-[#000]">
                        <TrendingUpIcon fontSize="large" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card w-96 bg-base-100 border-[#D1E5F4] border-2 shadow-[8px_8px_0px_#D1E5F4] rounded-xl my-4">
                <div className="card-body">
                  <h2 className="card-title">
                    <GitHubIcon fontSize="medium" />
                    Github
                    <div className="badge badge-secondary">coming soon</div>
                  </h2>
                  <p>Showcase and collaborate on coding projects.</p>
                  <div className="card-actions justify-end">
                    <Tooltip title="coming soon" placement="top">
                      <span>
                        <button className="btn border-2 border-[#D1E5F4] shadow-[4px_4px_0px_#D1E5F4] hover:shadow-none hover:bg-[#D1E5F4] hover:text-[#000]">
                          <GitHubIcon fontSize="large" />
                        </button>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center my-16">
            <div className="divider w-3/5"></div>
          </div>
        </div>

        {/* FOR PHONE */}
        <div className="phone:hidden">
          <div className="flex flex-col pt-8 md:mt-0 w-11/12 mx-auto">
            <div className="personal m-auto flex flex-row">
              <div className="Ellipse3 w-[50px] h-[50px] m-2">
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <MoodIcon
                      fontSize="small"
                      sx={{
                        maxWidth: "20px",
                        bgcolor: "red",
                        borderRadius: "100%",
                      }}
                    />
                  }
                >
                  <div className="avatar rounded-full ring ring-blue ">
                    <div className="rounded-full">
                      <img src={userData.personal_data.picture} alt="avatar" />{" "}
                      {/*// TODO: FIX THIS*/}
                    </div>
                  </div>
                </Badge>
              </div>
              <div className="username my-auto w-fit">
                <h2 className="text-2xl">{`${userData.personal_data.name}`}</h2>
                <p
                  style={{ overflowWrap: "anywhere" }}
                >{`@${userData.personal_data.username}`}</p>
              </div>
              <div className="edit my-auto mx-2">
                <Link to={"account"}>
                  <EditIcon fontSize="small" />
                </Link>
              </div>
            </div>
            <div className="profile self-center mt-4 flex flex-col">
              <button
                className="btn btn-primary lowercase"
                onClick={() => setShow(true)}
              >
                share{" "}
              </button>
              {show && main_model}
              <Link to={`/u/${userData.personal_data.username}`}>
                <button className="btn btn-primary lowercase my-2">
                  view profile
                </button>
              </Link>
            </div>
            {/* <div className="status self-center">
                            <label className="label justify-center">
                                <span className="label-text">my status</span>
                            </label>
                            <div>
                                <Chip
                                    label="Busy"
                                    color='primary'
                                    variant={selectedStatus === 'Busy' ? 'filled' : 'outlined'}
                                    onClick={() => handleStatusClick('Busy')}
                                />
                                <Chip
                                    label="Working"
                                    color='primary'
                                    variant={selectedStatus === 'Working' ? 'filled' : 'outlined'}
                                    onClick={() => handleStatusClick('Working')}
                                />
                                <Chip
                                    label="Available"
                                    color='primary'
                                    variant={selectedStatus === 'Available' ? 'filled' : 'outlined'}
                                    onClick={() => handleStatusClick('Available')}
                                />
                                <Chip
                                    label="Offline"
                                    color='primary'
                                    variant={selectedStatus === 'Offline' ? 'filled' : 'outlined'}
                                    onClick={() => handleStatusClick('Offline')}
                                />
                            </div>
                        </div> */}
            <div className="divider my-2"></div>

            <div className="phone:hidden dashboard">
              <label className="label">
                <span className="label-text">dashboard</span>
              </label>
              <div className="ratings">
                <ul className="menu bg-base-200 w-full rounded-box">
                  {navLinks.map((navLink, index) => (
                    <>
                      <li key={index}>
                        <NavLink to={navLink.path} className="p-0 mt-2">
                          <navLink.icon fontSize="large" />

                          <h2 className="my-auto flex items-center justify-evenly">
                            {" "}
                            <span className="text-xl w-1/2">
                              {" "}
                              {navLink.title}
                            </span>{" "}
                            <KeyboardDoubleArrowRightIcon />
                          </h2>
                        </NavLink>
                      </li>
                      <div className="divider w-4/5 self-center m-0 p-0"></div>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <div className="logout py-8 self-center">
              <NewLogOut
                isDisabled={false}
                btnName="sign out"
                onClickFunction={handleLogout}
              />
            </div>
            {/* <Outlet /> */}

            {/*

          <div className='flex w-full min-h-screen flex-col items-center md:pt-12 gap-12 '>
            <div className="w-[100%] md:w-3/4 flex items-center  justify-between  ">
              <div className=" Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full flex gap-3" >
                <img src={user.photoURL} alt="avatar" />
                <h2 className='text-2xl'>{`${user.displayName}'s Dashboard`}</h2>
              </div>
              <div className="">
                <SignoutButton isDisabled={false} btnName="sign out" backgroundColor="bg-red-600" onClickFunction={handleLogout} />
              </div>
            </div>

            <div className="container flex  items-center px-[5%] flex-col">
              <div className='flex items-start '>
                <nav className=''>
                  <ul className="flex flex-nowrap text-md font-medium text-center text-gray-400 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-4">
                      <NavLink to='personal' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>
                        Personal Info</NavLink>
                    </li>
                    <li className="mr-4">
                      <NavLink to='ratings' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Ratings</NavLink>
                    </li>
                    <li className="">
                      <NavLink to='github' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Github</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="container w-[100%]  h-fit bg-custom-bg rounded-[10px] border border-custom-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Outlet />
              </div>
            </div>
             
          </div>*/}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
