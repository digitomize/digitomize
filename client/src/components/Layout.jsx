import NewNavbar from "@components/globals/NewNavbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NewNavbar />
      <Outlet />
      {/* <NewFooter /> */}
    </>
  );
}
