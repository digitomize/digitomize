import React from 'react'
import {
  logo
} from './AllAssets'

import{
  DownloadIcon
}  from './MuiIcons';

export default function UserInfo() {
  const user = {
    name: "SAURAV GUPTA",
    username: "srv444",
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique.",
    skills: ["Flutter",
      "Dart",
      "java",
      "python",
      "nodejs"],
    phoneNo: "XXXXXXXXX",
    email: "sauravgpt123@gmail.com",
    links: [{ githubLink: "https://www.gitHub.com/in/srv444/" }, { linkedinLink: "https://www.linkedin.com/in/srv-gupta/" }, { portFolioLink: "https://www.portfolio.com/in/srv-gupta/" }]
  }

  return (
    <div className='border-2 border-blue-500 flex flex-col px-20 py-8 w-[50%]'>


      <div className="flex flex-row-reverse p-4 items-start justify-between">
        <div className="profilePic w-32 h-32 bg-stone-400 ">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-4xl font-bold self-end">{user.name}</h1>
      </div>



      <div className="bio  mt-6  p-4 w-full">
        {/* Your bio content */}

        <div className="ContactInfo mb-7 flex  flex-col space-y-4">
          <span>Username: {user.username}</span>
          <span>Phone no: {user.phoneNo}</span>
          <span>Email: {user.email}</span>


        </div>


        <h1 className='text-3xl font-bold'>BIO</h1>
        <p className='w-full '>
          {user.bio}
        </p>
      </div>


      <div className="ContactInfo mt-7  p-4 flex  flex-col space-y-4">
        <h1 className='text-3xl font-bold'>SOCIAL LINKS</h1>

        {user?.links?.map((element, index) => (
          <span key={index} className='bg-slate-700 w-max px-1 rounded-lg'>
            {Object.keys(element)[0]}:{" "}
            <a href={Object.values(element)[0]} target="_blank" >{Object.values(element)[0]}</a>
          </span>
        ))}

      </div>

      <div className="download flex justify-start p-3  ">
          <button className='rounded-lg bg-stone-100 text-black p-1 hover:bg-slate-300'>
            Download Resume
            <DownloadIcon/>
            
            </button>
      </div>

    </div>





  )
}
