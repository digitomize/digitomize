import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  UserAuthContextProvider,
  useUserAuth,
} from "./context/UserAuthContext";
import { useState, useEffect } from "react";
import "./App.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

// importing all the components ...
import {
  Layout,
  Login,
  ForgotPassword,
  forgotPasswordLoader,
  loginLoader,
  Signup,
  signupLoader,
  ErrorPage,
  IndividualCard,
  Updates,
  Homepage,
  Feedback,
  About,
  Footer,
  MetaData,
  resendLoader,
  ScrollToTop,
} from "./components/CustomComponents";
// import UserDashBoardAccount from "./user/dashboard/Account";
import UserDashboard from "./user/dashboard/UserDashboard";
import UserDashRatings, {
  loader as userDashRatingsLoader,
} from "./user/dashboard/UserDashRatings";
import Widget from "./user/dashboard/Widget";
import UserDashGithub, {
  loader as userDashGithubLoader,
} from "./user/dashboard/UserDashGithub";
import ProtectedRoute from "./ProtectedRoute";
import NewUserProfile from "./user/Profile/NewUserProfile";
import UserDashBoardLayout from "./user/dashboard/Layout";
import ProfileRatingsPage from "./user/Profile/pages/ProfileRatingsPage";
import PlatformRatings from "./user/Profile/components/PlatformRatings";
import ProfileLayout, {
  loader as profileLoader,
} from "./user/Profile/pages/ProfileLayout";
// import ProtectedRoute from "./ProtectedRoute"
import { loader as userDashPersonalLoader } from './user/dashboard/UserDashPersonal'
import UserDashBoardProfile from "./user/dashboard/Profile/Profile";
import Leaderboard from "./user/leaderboard/Leaderboard";
import UserDashBoardWidget from "./user/dashboard/Widget";

//Loader
import Loader from "./components/globals/Loader/Loader";

import Career from "./user/dashboard/Career/Career"
/*------------ DSA Sheets Import ------------ */
import SheetLayout from "./dsaSheets/layout/SheetLayout";

// import formbricks from "@formbricks/js";

// if (typeof window !== "undefined") { 
//   formbricks.init({
//     environmentId: import.meta.env.VITE_REACT_APP_FORMBRICKS_API_KEY,
//     apiHost: "https://app.formbricks.com",
//   });
// }

function DiscordRedirect() {
  window.location.href = "https://discord.gg/bsbBytBqBc";
  return (
    <>
      <MetaData path="discord" />
      <div className="flex flex-col justify-center items-center h-[60vh] antialiased">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
        <h1 className="text-2xl ml-4">Redirecting to Discord</h1>
      </div>
    </>
  );
}
function BlogsRedirect() {
  window.location.href = "https://blogs.digitomize.com";
  return (
    <>
      <MetaData path="blogs" />
      <div className="flex flex-col justify-center items-center h-[60vh] antialiased">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
        <h1 className="text-2xl ml-4">Redirecting to Blogs</h1>
      </div>
    </>
  );
}
// function ContributeRedirect() {
//   window.location.href = "https://github.com/pranshugupta54/digitomize";
//   return null;
// }

import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { UserContextProvider } from "./context/UserContext";
import UserListPage from "./pages/admin/UserListPage";
import AdminPanelGuard from "./AdminPanelGuard";
import ContestListPage from "./pages/admin/ContestListPage";
import CommunityListPage from "./pages/admin/CommunityListPage";
import ContestPageLayout from "./components/Contests/ContestPageLayout";
import Filter from "./components/Contests/Filter";
import Challenges from "./components/Contests/Challenges/Challenges";
import ComingSoonLoader from "./components/Contests/ComingSoonLoader";
import HackathonsFilter from "./components/Contests/Hackathons/HackathonsFilter";
import HackathonIndividualCard from "./components/Contests/Hackathons/HackathonIndividualCard";
import { userDashboardDetails } from "../api";
import Preferences from "./user/dashboard/Preferences/Preferences";
import Ratings from "./user/dashboard/Ratings/Ratings";
import Settings from "./user/dashboard/Settings/Settings";
import ResendEmailVerification from "./pages/verification/ResendEmailVerification";
import VerifyEmailPage from "./pages/verification/VerifyEmailPage";
import { uniqueToast } from "./core/utils/unique-toast";

function Logout() {
  const navigate = useNavigate();
  const user = useUserAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const toastId = uniqueToast();

  // Implement your logout logic here
  async function handleLogout() {
    try {
      // Assuming you have an `auth` object for authentication
      await auth.signOut();
      // Show a success message using toast
      toast.success("Logged out successfully",{
        toastId
      });
      // Redirect the user to the login page with a message
      navigate("/login?message=Logged out successfully");
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout error:", error);
      // Optionally show an error message using toast or other means
      toast.error("Logout failed",{
        toastId
      });
      // Redirect to an appropriate page or handle the error as needed
      navigate("/error"); // Example: Redirect to an error page
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    if (user) {
      handleLogout();
      setIsLoggingOut(true);
    } else {
      navigate("/login?message=You are not logged in");
    }
  }, isLoggingOut);

  // Conditionally render content based on the isLoggingOut state
  return (
    <div>
      {isLoggingOut ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
          <h1 className="text-2xl ml-4">Logging out..</h1>
        </div>
      ) : (
        <div>Logout completed.</div>
      )}
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} loader={loginLoader} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} loader={signupLoader} />
        <Route path="forgot-password" element={<ForgotPassword />} loader={forgotPasswordLoader} />
        <Route
        path="resend-email-verification"
        element={<ResendEmailVerification />}
        loader={resendLoader}
      />
       <Route path="user-email-verification" element={<VerifyEmailPage />} />
        <Route element={<ContestPageLayout />}>
          <Route path="contests" element={<Filter />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="hackathons" element={<HackathonsFilter />} />
          <Route path="internships" element={<ComingSoonLoader value='Internships' />} />
          <Route path="jobs" element={<ComingSoonLoader value='Jobs' />} />
        </Route>
        {/* <Route path="updates" element={<Updates />} /> */}
        <Route path="home" element={<Homepage />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="contact" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="discord" element={<DiscordRedirect />} />
        <Route path="blogs" element={<BlogsRedirect />} />
        <Route path="contests/:vanity" element={<IndividualCard />} />
        <Route path="hackathons/:vanity" element={<HackathonIndividualCard />} />
        <Route path="404" element={<ErrorPage />} />
      </Route>
      <Route path="/admin" element={<AdminPanelGuard />}>
        <Route path="user" element={<UserListPage />}></Route>
        <Route path="contest" element={<ContestListPage />}></Route>
        <Route path="community" element={<CommunityListPage />}></Route>
      </Route>
      <Route path="/u" element={<ProtectedRoute />}>
        {/* <Route path="dashboard" element={<UserDashboard/>}> */}
        <Route path="dashboard">
          <Route
            index
            element={<UserDashboard />}
          />

          <Route path="widgets" element={<Widget />} />

          <Route element={<UserDashBoardLayout />} >
            <Route
              path="github"
              element={<ComingSoonLoader value={"Github"} />}
            />
            <Route
              path="career"
              element={<Career />}
              loader={userDashPersonalLoader}
            />
            <Route path="profile" loader={userDashPersonalLoader} element={<UserDashBoardProfile />} />
            {/* <Route path="account"  loader={userDashPersonalLoader}  element={<UserDashBoardAccount/>}/> */}
            <Route path="widget" element={<ComingSoonLoader value={"Widgets"} />} />
            <Route path="ratings" element={<Ratings />} />
            <Route path="preferences" loader={userDashPersonalLoader} element={<Preferences />} />
            <Route path="settings" loader={userDashPersonalLoader} element={<Settings />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="/u/:username"
        element={<ProfileLayout />}
        loader={profileLoader}
      >
        <Route index element={<NewUserProfile />} />
        <Route path="about" element={<div>User about</div>} />
        {/* <Route path="resume" element={<Resume />} /> */}
        <Route path="socials" element={<div>Socials</div>} />
        <Route path="github" element={<div>Github</div>} />
        <Route path="ratings" element={<ProfileRatingsPage />}>
          <Route path=":platform" element={<PlatformRatings />} />
        </Route>
      </Route>
      <Route path="/u/leaderboard" element={<Leaderboard />} />
    </Route>,
  ),
);
function App() {
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <UserAuthContextProvider>
        <UserContextProvider>
          <ToastContainer />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            {isLoading ? <Loader/> : <RouterProvider router={router} />}
          </LocalizationProvider>
        </UserContextProvider>
      </UserAuthContextProvider>
     <ScrollToTop toid={"root"} h={1}/>
      {/* <Footer /> */}
    </>
  );
}

export default App;
