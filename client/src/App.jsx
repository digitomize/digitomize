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

// importing all the components ...

import {
  Layout,
  Home,
  Login,
  loginLoader,
  Signup,
  signupLoader,
  ErrorPage,
  IndividualCard,
  Updates,
  Homepage,
  Feedback,
  About,
} from "./components/CustomComponents";
import UserDashboard from "./user/dashboard/UserDashboard";
import UserDashPersonal, {
  loader as userDashPersonalLoader,
} from "./user/dashboard/UserDashPersonal";
import UserDashRatings, {
  loader as userDashRatingsLoader,
} from "./user/dashboard/UserDashRatings";
import UserDashGithub, {
  loader as userDashGithubLoader,
} from "./user/dashboard/UserDashGithub";
import ProtectedRoute from "./ProtectedRoute";
import NewUserProfile from "./user/Profile/NewUserProfile";

import ProfileRatingsPage from "./user/Profile/pages/ProfileRatingsPage";
import PlatformRatings from "./user/Profile/components/PlatformRatings";
import ProfileLayout, {
  loader as profileLoader,
} from "./user/Profile/pages/ProfileLayout";
// import ProtectedRoute from "./ProtectedRoute"

import Leaderboard from "./user/leaderboard/Leaderboard";

/*------------ DSA Sheets Import ------------ */
import SheetLayout from "./dsaSheets/layout/SheetLayout";


function DiscordRedirect() {
  window.location.href = "https://discord.gg/bsbBytBqBc";
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
      <h1 className="text-2xl ml-4">Redirecting to Discord</h1>
    </div>
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

function Logout() {
  const navigate = useNavigate();
  const user = useUserAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Implement your logout logic here
  async function handleLogout() {
    try {
      // Assuming you have an `auth` object for authentication
      await auth.signOut();
      // Show a success message using toast
      toast.success("Logged out successfully");
      // Redirect the user to the login page with a message
      navigate("/login?message=Logged out successfully");
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout error:", error);
      // Optionally show an error message using toast or other means
      toast.error("Logout failed");
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
        <Route path="logout" element={<Logout />} />;
        <Route path="signup" element={<Signup />} loader={signupLoader} />
        <Route path="contests" element={<Home />} />
        <Route path="updates" element={<Updates />} />
        <Route path="home" element={<Homepage />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="contact" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="discord" element={<DiscordRedirect />} />
        <Route path="contests/:vanity" element={<IndividualCard />} />
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
            // loader={userDashPersonalLoader}
            // loader={userDashPersonalLoader}
          />
          <Route
            path="account"
            element={<UserDashPersonal />}
            loader={userDashPersonalLoader}
          />
          <Route path="ratings" element={<UserDashRatings />} />
          <Route
            path="github"
            element={<UserDashGithub />}
            loader={userDashGithubLoader}
          />
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
    </Route>
  )
);

function App() {
  return (
    <UserAuthContextProvider>
      <UserContextProvider>
        <ToastContainer />
        <div>
          <RouterProvider router={router} />
        </div>
      </UserContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
