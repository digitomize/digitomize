import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useLoaderData, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { useUserAuth } from '../../context/UserAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import SignoutButton from "../components/SignoutButton"
import NewLogOut from "../components/NewLogOut"
import { useUserAuth } from '../../context/UserAuthContext';
import NewNavbar from "../../components/NewNavbar";
import { Skeleton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Chip from "@mui/material/Chip";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import { userDashboardDetails } from '../../../api';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from "../../assets/logo.png";
import Badge from '@mui/material/Badge';
import MoodIcon from '@mui/icons-material/Mood';
// import logo from "../assets/logo.png";

export default function UserDashboard() {
  // const username = data.personal_data.username
  // const { user } = useUserAuth()
  // const userData = userDashboardDetails().then(
  //   console.log("DAYAYAYAYAYAATATATATTA",userData)
  // );
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { user } = useUserAuth();
  async function handleLogout() {
    await auth.signOut()
    toast.success("Logged out successfully")
    console.log("before");
    navigate('/login?message=Logged out successfully')
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const temp = await userDashboardDetails();
        await setUserData(temp);
        console.log("DAYAYAYAYAYAATATATATTA", userData);
        // Now you can use userData in your component
        setLoading(false);
      } catch (error) {
        // Handle any errors that may occur during the data fetching
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    fetchData();
    if (user) {
      setLoading(false);
    } else {
      setLoading(false); // Handle cases where user data is not available
    }
  }, [user]);

  if (loading) {
    return (
      <div className="m-auto flex flex-col items-cente r w-4/5 my-12">
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width: "30%" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width: "30%" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width: "30%" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600" }} />
      </div>
    )
  }
  const platforms = "codeforces, codechef, leetcode, geeksforgeeks";
  const trimmedPlatforms = platforms.slice(0, 15) + "...";
  if (!loading) {
    return (
      <>
        <ToastContainer />
        <NewNavbar />
        <div className='flex max-phone:flex-col pt-24 md:mt-0 w-11/12 mx-auto'>


          <div className="personal m-auto flex flex-row">
            <div className="Ellipse3 w-[50px] h-[50px] m-2" >
              <Badge anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }} badgeContent={<MoodIcon fontSize="small" sx={{ maxWidth: '20px', bgcolor: "red", borderRadius: "100%" }} />}>
                <div className="avatar rounded-full ring ring-blue ">
                  <div className="rounded-full">
                  <img src={logo} alt="avatar" /> {/*// TODO: FIX THIS*/}
                  </div>
                </div>
                
              </Badge>
            </div>
            <div className="username my-auto w-fit">
              <h2 className='text-2xl'>{`${user.displayName}`}</h2>
            </div>
            <div className="edit my-auto mx-2">

              <EditIcon fontSize="small" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="status">
            <label className="label">
              <span className="label-text">my status</span>
            </label>
            <Chip label="Busy" color="primary" />
            <Chip label="Working" variant="outlined" color="primary" />
          </div>

          <div className="divider"></div>

          <div className="dashboard">
            <label className="label">
              <span className="label-text">dashboard</span>
            </label>
            <div className="ratings">
              <ul className="menu bg-base-200 w-full rounded-box">
                <li>
                  {/* <a> */}
                    <NavLink to='ratings' className="p-0 mt-2">
                    <TrendingUpIcon fontSize="large" />
                      <h2 className="my-auto flex items-center justify-evenly"> <span className="text-xl w-1/2"> ratings</span>  <KeyboardDoubleArrowRightIcon /></h2>
                      </NavLink>
                  {/* </a> */}
                </li>
                <div className="divider w-4/5 self-center m-0 p-0"></div>
                <li>
                <NavLink to='github' className="p-0">
                    <GitHubIcon fontSize="large" />
                    <h2 className="my-auto flex items-center justify-evenly"> <span className="text-xl w-1/2"> github</span>  <KeyboardDoubleArrowRightIcon /></h2>
                  </NavLink>
                </li>
                <div className="divider w-4/5 self-center m-0 p-0"></div>
                <li>
                <NavLink to='account' className="p-0 mb-2">

                    <SettingsIcon fontSize="large" />
                    <h2 className="my-auto flex items-center justify-evenly"> <span className="text-xl w-1/2"> account</span>   <KeyboardDoubleArrowRightIcon /></h2>
                  </NavLink>
                </li>
              </ul>
            </div>

          </div>

          <div className="logout py-8 self-center">

            <NewLogOut isDisabled={false} btnName="sign out" onClickFunction={handleLogout} />

          </div>
<Outlet/>





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
      </>
    )
  }
}









// <NavLink to='personal' className="border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl " >
//               Personal Info
//             </NavLink>

//             <NavLink to='ratings' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Ranking 
//             </NavLink>
//             <NavLink to='github' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Github Repos
//             </NavLink>