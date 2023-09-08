import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import { UserAuthContextProvider } from "./context/UserAuthContext"

import './App.css'
import Layout from "./components/Layout"
import UserLayout, { loader as userLayoutLoader } from "./user/UserLayout"
import Home from "./components/Home"
import Login, { loader as loginLoader } from "./components/Login"
import Signup, { loader as signupLoader } from "./components/Signup"
import IndividualCard from "./components/IndividualCard"
import ErrorPage from "./components/error-page"
import UserDashboard from "./user/dashboard/UserDashboard"
import UserDashPersonal, { loader as userDashPersonalLoader } from "./user/dashboard/UserDashPersonal"
import UserDashRatings, { loader as userDashRatingsLoader } from "./user/dashboard/UserDashRatings"
import UserDashGithub, { loader as userDashGithubLoader } from "./user/dashboard/UserDashGithub"
import UserProfile, { loader as userProfileLoader } from "./user/Profile/UserProfile"
import ProtectedRoute from "./ProtectedRoute"
import Updates from "./components/Updates"
import NewHome from "./components/NewHome"
import NewUserProfile from "./user/Profile/NewUserProfile"
// import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter(createRoutesFromElements(
    <Route >
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} loader={loginLoader} />
            <Route path="signup" element={<Signup />} loader={signupLoader} />
            <Route path="contests" element={<Home />} />
            <Route path="updates" element={<Updates />} />
            <Route path="home" element={<NewHome />} />
            <Route path="contests/:vanity" element={<IndividualCard />} />
        </Route>
        <Route path="/user" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<UserDashboard />} >
                <Route path="personal" element={<UserDashPersonal />} loader={userDashPersonalLoader} />
                <Route path="ratings" element={<UserDashRatings />} loader={userDashRatingsLoader} />
                <Route path="github" element={<UserDashGithub />} loader={userDashGithubLoader} />
            </Route>
            <Route path="profile/:username" element={<NewUserProfile />} loader={userProfileLoader} />
        </Route>
    </Route>
))

function App() {
    return (
        <UserAuthContextProvider>
            <RouterProvider router={router} />
        </UserAuthContextProvider>
    )
}

export default App