import NewNavbar from "/src/components/globals/Navbar/NewNavbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./CustomComponents";

export default function Layout() {
  return (
    <>
      <NewNavbar />
      <Outlet />
      {/* <NewFooter /> */}
      <Footer/>
    </>
  );
}
