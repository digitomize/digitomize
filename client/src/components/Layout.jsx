import NewNavbar from "./NewNavbar";
// import { useState } from "react";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NewNavbar />
      <Outlet />
    </>
  );
}
