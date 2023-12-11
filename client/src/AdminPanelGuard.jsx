import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useUserDetails } from "./context/UserContext"
import { USER_ROLE } from "./core/utils/const"
import { useUserAuth } from "./context/UserAuthContext"
import NewNavbar from "./components/globals/NewNavbar"

function AdminPanelGuard() {
  const { userDetails } = useUserDetails()
  const { user } = useUserAuth()

  if (userDetails && userDetails.personal_data) {
    if (userDetails.personal_data.role === USER_ROLE.ADMIN)
      return (
        <>
          <NewNavbar />
          <Outlet />
        </>
      )
    return <Navigate to='/home' />
  }
  if (!user) return <Navigate to='/login?message=Please login first!' />
  return "Loading..."
}

export default AdminPanelGuard
