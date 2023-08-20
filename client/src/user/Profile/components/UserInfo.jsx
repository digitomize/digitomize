import React from 'react'
import logo from '../../../assets/profilelogo.png'

export default function UserInfo() {
    const user={
      name:"SAURAV GUPTA",
      bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique.",
      skills:["Flutter",
      "Dart",
      "java",
      "python",
      "nodejs"]
    }

  return (
<div className='border-2 border-red-500 flex flex-col '>


  <div className="heading flex flex-row h-full items-center">
    <div className="profilePic w-24 h-24">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>

    <h1 className='ml-7 text-3xl font-bold'>{user.name}</h1>
  </div>


  <div className="bio mt-7 ">
    {/* Your bio content */}
    <h1 className='text-3xl font-bold'>BIO</h1>
    <p className='w-60 h-full'>
      {user.bio}
    </p>

    <button className='rounded-full bg-black  text-white px-4 py-2 w-28 mt-6'>edit</button>


  </div>



  <div className="skills mt-7">
      <h1 className='text-3xl font-bold'>SKILLS</h1>
          <ul className='list-disc ml-4'>
            
              {user.skills?.map((element)=>{
                 return <li className='my-3'>{element}</li>
              })}
            
          </ul>
      <button className='rounded-full bg-black  text-white px-4 py-2 w-28 mt-6'>Add More+</button>

  </div>
</div>

  )
}
