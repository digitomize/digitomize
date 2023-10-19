import Navbar from "./Navbar"
import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"
import { useState } from "react";
import Alert from '@mui/material/Alert';
export default function Layout() {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {

    setAlertOpen(false);
  };
  return (
    <>
      <Navbar />
      {alertOpen && (
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{
            position: "fixed",
            zIndex: 200,
            marginBottom: 2,
            width: "30%",
            marginTop: "2%",
            right: 0
          }}
          icon={false}
        >
          Haven&apos;t checked out the version-2 !? Here it is :-
          <a
            href="https://v2.digitomize.com/"
            target="_blank"
            style={{ textDecoration: 'none', color: 'blue' }} rel="noreferrer"
          >
            https://v2.digitomize.com/
          </a>
        </Alert>
      )}
      <Outlet />
      <Analytics />
    </>
  )
}
