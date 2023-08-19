import Navbar from "./Navbar"

import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Analytics />
    </>
  )
}
