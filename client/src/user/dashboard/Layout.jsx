import React from 'react'
import { Outlet } from 'react-router-dom'
import UserDashBoardTab from './UserDashBoardTab'
import NewNavbar from '../../components/NewNavbar'
import DashboardNavbar from '../components/DashboardNavbar'
function UserDashBoardLayout() {
  return (
    <div className='w-11/12 mx-auto'>
       <DashboardNavbar/>
        <div className='flex md:flex-row  flex-col max-md:pt-[85px] mt-[33px]'>
        <UserDashBoardTab/>
        <Outlet/>
        </div>
    </div>
  )
}

export default UserDashBoardLayout