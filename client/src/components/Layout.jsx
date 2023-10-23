import NewNavbar from "./NewNavbar"
import Alert from '@mui/material/Alert';
import NewFooter from "./NewFooter"
import { useState } from "react";

import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"

export default function Layout() {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {

    setAlertOpen(false);
  };

  return (
    <>
      <NewNavbar />
      {alertOpen && (
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{
            position: "fixed",
            zIndex: 200,
            marginBottom: 2,
            marginTop: "2%",
            right: 0
          }}
          icon={false}
        >
          Haven't checked out the version-2 !? Here it is :-
          <a
            href="https://v2.digitomize.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'blue' }}
          >
            https://v2.digitomize.com/
          </a>
        </Alert>
      )}
      <Outlet />
      <NewFooter />
      <Analytics />
    </>
  )
}