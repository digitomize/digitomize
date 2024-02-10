import React from 'react'
import { Outlet } from 'react-router-dom'
import UserDashBoardTab from './UserDashBoardTab'
import NewNavbar from '../../components/NewNavbar'
import DashboardNavbar from '../components/DashboardNavbar'
import DashNav from "./dashNav"
function UserDashBoardLayout() {
  return (
    <div className='w-full bg-dashboardDarkerColor h-full'>
      <DashNav />
      <div class="h-16"></div>
      <div className='-mt-16 pt-16 relative'>
        <UserDashBoardTab />
        <div className="flex">
          <div class="shrink-0 lg:w-56">
          </div>
          <main className="px-12 mx-auto py-10 max-w-5xl min-h-screen">
            <Outlet />

          </main>

        </div>
      </div>
    </div>
  )
}

export default UserDashBoardLayout