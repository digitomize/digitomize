import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

import Layout from "./components/Layout"
import UserLayout from "./user/UserLayout"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup, { loader as signupLoader } from "./components/Signup"
import IndividualCard from "./components/IndividualCard"
import ErrorPage from "./components/error-page"
import UserDashboard from "./user/dashboard/UserDashboard"
import UserDashPersonal, { loader as userDashPersonalLoader } from "./user/dashboard/UserDashPersonal"
import UserDashRatings, { loader as userDashRatingsLoader } from "./user/dashboard/UserDashRatings"
import UserDashGithub, { loader as userDashGithubLoader } from "./user/dashboard/UserDashGithub"
import UserProfile from "./user/Profile/UserProfile"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} loader={signupLoader} />
        <Route path="contests" element={<Home />} />
        <Route path="contest/:vanity" element={<IndividualCard />} />
        <Route path="user" element={<UserLayout />} >
            <Route element={<ProtectedRoute />} >
                <Route path="dashboard" element={<UserDashboard />} >
                    <Route path="personal" element={<UserDashPersonal />} loader={userDashPersonalLoader} />
                    <Route path="ratings" element={<UserDashRatings loader={userDashRatingsLoader} />} />
                    <Route path="github" element={<UserDashGithub loader={userDashGithubLoader} />} />
                </Route>
            </Route>
            <Route path="profile/:username" element={<UserProfile />} />
        </Route>
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App