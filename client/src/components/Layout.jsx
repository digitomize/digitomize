import { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import { auth } from "../../firebase"

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
