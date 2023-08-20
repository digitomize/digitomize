import { Outlet } from "react-router-dom"
import UserHeader from "./UserHeader"

export default function UserLayout() {
  return (
    <>
    {/* <UserHeader /> */}
    <Outlet />
    </>
  )
}
