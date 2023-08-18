import Navbar from "./Navbar"
import App from "../App"
import { Outlet } from "react-router-dom"
export default function Layout() {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}
