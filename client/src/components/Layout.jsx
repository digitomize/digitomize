 
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NewNavbar } from "./CustomComponents";

export default function Layout() {
  return (
    <>
      <NewNavbar/>
      <Outlet />
      {/* <NewFooter /> */}
    </>
  );
}
