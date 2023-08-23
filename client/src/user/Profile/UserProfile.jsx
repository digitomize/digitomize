import React from 'react'
import UserInfo from './components/UserInfo'
import Ranking from './components/Ranking'

import GithubStats from './components/GithubStats'
import UserRepo from './components/UserRepo'
import Skills from './components/Skills'

export default function UserProfile() {
  return (
    <div className='flex flex-col   min-h-screen'>
      <div className="container1 flex flex-row border-2 w-[100%]  border-blue-500 p-5 justify-evenly ">
        <UserInfo />

        <div  className='border-4 border-red-900 w-[50%]'>
          <Skills />
          <Ranking />
        </div>
      </div>


      <GithubStats />
      <UserRepo />


    </div>
  )
}
