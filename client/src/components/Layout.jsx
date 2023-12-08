import NewNavbar from "./NewNavbar";
import Alert from "@mui/material/Alert";
import Footer from "./Footer";
import { useState } from "react";

import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NewNavbar />
      <Outlet />
      {/* <NewFooter /> */}
      <Analytics />
    </>
  );
}
