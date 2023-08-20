import React from 'react'
import UserInfo from './components/UserInfo'
import Ranking from './components/Ranking'

import GithubStats from './components/GithubStats'
import UserRepo from './components/UserRepo'

export default function UserProfile() {
  return (
    <div className='flex flex-row  justify-between min-h-screen'>
      <div className="container1 border-2 border-blue-500 p-5 ml-36 ">
        <UserInfo />
        <Ranking />
      </div>

      <div className="container2 border-2 border-yellow-950 mr-36 p-5 w-96">
        <GithubStats />
        <UserRepo />

      </div>
    </div>
  )
}
