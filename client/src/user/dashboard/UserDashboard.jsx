import { useState, useEffect } from "react";

import { auth } from "../../../firebase";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewLogOut from "../components/NewLogOut";
import { useUserAuth } from "../../context/UserAuthContext";
import NewNavbar from "../../components/globals/Navbar/NewNavbar.jsx";
import EditIcon from "@mui/icons-material/Edit";
import { preferences, rating, career, github, widgets, account } from "../../components/AllAssets.jsx";
import { userDashboardDetails } from "../../../api";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Badge from "@mui/material/Badge";
import MoodIcon from "@mui/icons-material/Mood";
import Tooltip from "@mui/material/Tooltip";
import LoadingScreen from "../../components/globals/LoadingScreen.jsx";
import ShareModel from "../../components/share_model.jsx";
import UserCard from "../Profile/components/UserCard.jsx";
const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
// import logo from "../assets/logo.png";
import { MetaData } from "../../components/CustomComponents.jsx";
import ContestCard from "../components/ContestCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
import { navLinks } from "./dashboardLinks.js";
import { Done, PriorityHigh, Warning } from "@mui/icons-material";
import { uniqueToast } from "../../core/utils/unique-toast.js";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { user } = useUserAuth();
  const toastId = uniqueToast();
  const [selectedStatus, setSelectedStatus] = useState("Busy"); // Initialize with a default status
  // const navLinks = [
  //   {
  //     icon: account,
  //     title: "profile",
  //     path: "profile",
  //   },
  //   {
  //     icon: widgets,
  //     title: "widget",
  //     path: "widget",
  //   },
  //   {
  //     icon: career,
  //     title: "career",
  //     path: "career",
  //   },
  //   {
  //     icon: rating,
  //     title: "rating",
  //     path: "ratings"
  //   },
  //   {
  //     icon: preferences,
  //     title: "preferences",
  //     path: "preferences"
  //   }
  // ];


  const profileSteps = {
    addSkills: {
      text: "Elevate your profile with new skills.",
      completed: userData?.personal_data?.skills?.length > 0,
      score: 20,
      link: "career"
    },
    addSocialMedia: {
      text: "Connect with your audience by adding social media links.",
      completed: userData?.social?.linkedin?.length > 0 || userData?.social?.github?.length > 0 || userData?.social?.twitter?.length > 0 || userData?.social?.instagram?.length > 0 || userData?.social?.facebook?.length > 0,
      score: 20,
      link: "career"
    },
    addBio: {
      text: "Craft a compelling bio to make a lasting impression.",
      completed: userData?.personal_data?.bio?.data?.length > 0,
      score: 20,
      link: "profile"
    },
    addRatings: {
      text: "Add your ratings to showcase your competitive spirit.",
      completed: userData?.ratings?.codechef?.data?.length > 0 || userData?.ratings?.codeforces?.data?.length > 0 || userData?.ratings?.leetcode?.data?.length > 0 || userData?.ratings?.geeksforgeeks?.data?.length > 0,
      score: 40,
      link: "ratings"
    }
  };




  const [contest, setContest] = useState([]);
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
    toast.success("Logged out successfully",{
      toastId
    });
    // console.log("before");
    navigate("/login?message=Logged out successfully");
  }
  useEffect(() => {
    async function getContest() {
      let url = `${backendUrl}/contests`
      if (userData?.personal_data?.preferences?.contest_notifs) {
        const preferences = userData.personal_data.preferences.contest_notifs;
        const platforms = [];

        for (const platform in preferences) {
          if (preferences[platform]) {
            platforms.push(platform);
          }
        }

        if (platforms.length > 0) {
          url += `?host=${platforms.join('&')}`;
        }
      }
      // console.log("URLL:", url);
      // console.log("userData:", userData);
      const response = await fetch(url);
      const data = await response.json();
      setContest(data.results.slice(0, 3));
    }
    getContest()
  }, [userData])
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

        <MetaData path="u/dashboard" />
        <ToastContainer />
        <NewNavbar />

        {/* FOR DESKTOP */}
        <div className=" w-10/12 mx-auto my-4 max-sm:px-3 font-['Geist']">
          <h1 className="pb-4 normal-case text-[#EBEBEB] text-5xl">
            Heyy {userData.personal_data.name.slice(0, 20)}
          </h1>

          <div className="flex sm:flex-row flex-col sm:space-x-12 gap-6">
            <div className="sm:w-[40%]">
              <UserCard
                username={userData.personal_data.username}
                name={userData.personal_data.name.slice(0, 20)}
                picture={userData.personal_data.picture}
                bio={userData.personal_data.bio.data}
                phoneNumber={userData.personal_data.phoneNumber}
                role={userData.personal_data.role}
                social={userData.social}
                skills={userData.personal_data.skills}
              />
            </div>
            <div className="sm:w-[60%]">
              <div className="mb-4">
                <h1 className="my-0 text-4xl">Profile </h1>
                <p className="text-sm my-2 text-gray-400"> <i>Enhance your profile today! See the suggestions below:</i></p>
                <div className="flex flex-row gap-4">
                  <div>

                    {Object.keys(profileSteps).map((step, i) => {
                      const { text, completed, score, link } = profileSteps[step];
                      return <div className="flex items-center gap-2 my-2" key={i}>
                        {completed ? <Done htmlColor="#00FF00" /> : <PriorityHigh htmlColor="red" />}
                        <p className="text-xs">
                          <Link to={link} className="underline decoration-dotted">{text}</Link>
                          - <i> {score}% </i></p>
                      </div>;
                    })}
                  </div>
                  <div>
                    {
                      (() => {
                        let sum = 0;
                        Object.keys(profileSteps).forEach(step => {
                          const { score, completed } = profileSteps[step];
                          if (completed) {
                            sum += score;
                          }
                        });
                        // console.log("Sum of scores:", sum);

                        // Render the radial progress bar here
                        return (
                          <div key="radial-progress" className={`radial-progress ${sum > 70 ? 'text-[#00FF00]' : sum > 50 ? 'text-green-600' : 'bg-gray-900'}`} style={{ "--value": sum, "--size": "6rem", "--thickness": "1rem" }} role="progressbar">
                            {sum}%
                          </div>
                        );
                      })()
                    }
                  </div>

                </div>
              </div>
              <div>
                <h1 className="my-0 text-4xl">Settings</h1>
                <div className="my-2 flex flex-row w-11/12 lg:justify-between justify-around flex-wrap gap-y-4">
                  {
                    navLinks.map((data, index) => {
                      return <Link to={data.path} key={index}>
                        <div className="flex bg-cardsColor flex-col border border-solid sm:rounded-[12px] rounded-[5px] sm:py-3 sm:px-5 max-sm:py-2 max-sm:px-4 space-y-[5px] sm:justify-center justify-between  items-center border-[#EBEBEB]">
                          <img src={data.icon} alt={data.title} className="w-8" />
                          <p className="capitalize font-[500] sm:text-[16px] max-sm:text-[10px] text-[#EBEBEB]">{data.title}</p>
                        </div>
                      </Link>;
                    })
                  }
                </div>
              </div>
              <div className="w-full">
                <h1 className="mt-8 text-4xl">Contests</h1>
                {userData?.personal_data?.preferences?.contest_notifs && <p className="text-sm my-2 text-gray-400">Displaying upcoming contests from your <Link to={"preferences"} className="underline">preferred list</Link>.</p>}

                <div className="flex flex-row gap-7  flex-wrap">
                  {
                    contest.map((data, index) => {
                      return <ContestCard data={data} key={index} />;
                    })
                  }
                </div>
              </div>
              <div className="w-full">
                <h1 className="mt-8 text-4xl">Projects</h1>
                coming soon
                <div className="flex flex-row sm:gap-7 max-sm:gap-4  flex-wrap">
                  {/* {
                    projects.map((data, index) => {
                      return <ProjectCard {...data} key={index} />
                    })
                  } */}
                </div>
              </div>
            </div>

          </div>
        </div>

      </>
    );
  }
}