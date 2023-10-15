import React from 'react'
import {
  useLoaderData
} from 'react-router-dom'

import {
  UserInfo,
  Ranking,
  GithubStats,
  UserRepo,
  Skills
} from './components/UserComponents'

import { 
  userProfileDetails
 } from '../../../api'


export async function loader({ params }) {
  try {
    const res = await userProfileDetails(params.username)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export default function UserProfile() {

  const data = useLoaderData();
  console.log(data);

  return (
    <div className='flex flex-col   min-h-screen'>
      <div className="container1 flex flex-row border-2 w-[100%]  border-blue-500 p-5 justify-evenly ">
        <UserInfo />

        <div className='border-4 border-red-900 w-[50%]'>
          <Skills />
          <Ranking />
        </div>
      </div>


      <GithubStats />
      <UserRepo />


    </div>
  )
}
