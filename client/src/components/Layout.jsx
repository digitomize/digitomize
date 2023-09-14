import { useEffect, useState } from 'react'
import NewNavbar from "./NewNavbar"
import Navbar from "./Navbar"
import { auth } from "../../firebase"

import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"

export default function Layout() {

  return (
    <>
      <NewNavbar />
      {/* <Navbar/> */}
      {/* <div className="divider"></div> */}
      <Outlet />
      
      <Analytics />
    </>
  )
}
