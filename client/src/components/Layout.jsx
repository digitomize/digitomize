import NewNavbar from "./NewNavbar"

import NewFooter from "./NewFooter"

import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"

export default function Layout() {

  return (
    <>
      <NewNavbar />
      <Outlet />
      <NewFooter/>
      <Analytics />
    </>
  )
}
