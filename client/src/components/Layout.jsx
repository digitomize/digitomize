import NewNavbar from "/src/components/globals/NewNavbar"
import Alert from "@mui/material/Alert"
import { useState } from "react"

import { Analytics } from "@vercel/analytics/react"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <NewNavbar />
      <Outlet />
      {/* <NewFooter /> */}
      <Analytics />
    </>
  )
}
