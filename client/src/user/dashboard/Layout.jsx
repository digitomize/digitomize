import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import UserDashBoardTab from './UserDashBoardTab'
import NewNavbar from '../../components/NewNavbar'
import DashboardNavbar from '../components/DashboardNavbar'
import DashNav from "./dashNav"

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});


function UserDashBoardLayout() {
  const [sideTab, setSideTab] = React.useState(false);
  const toggleActive = () => {
    setSideTab(!sideTab);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='w-full bg-dashboardDarkerColor h-full'>
        <DashNav toggleActive={toggleActive} />
        <div class="h-16"></div>

        <div className='-mt-16 pt-16 relative'>
          <UserDashBoardTab sideTab={sideTab} />
          <div className={`flex ${sideTab ? 'blur-sm' : ''}`}  onClick={()=>{
            if(sideTab){

              toggleActive();
            }
          }}>
            <div class="shrink-0 lg:w-56">
            </div>
            <main className="max-w-5xl phone:container px-6 phone:px-12 mx-auto py-10 min-h-screen">
              <div className="max-w-5xl mx-auto">

                <Outlet />
              </div>

            </main>

          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

export default UserDashBoardLayout