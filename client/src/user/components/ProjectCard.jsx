import React from 'react'
import { TbGitFork } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
const ProjectCard = ({title, fork , star , description}) => {
  return (
    <div className='bg-cardsColor sm:w-[230px]  max-sm:w-[150px]  rounded-[2px] flex flex-col justify-between sm:px-3 max-sm:px-2 py-2 border border-solid border-[#EBEBEB]'>
        <div className=''>
        <h2 className='text-[20px] mb-2'>{title}</h2>
        <p>{description}</p>
        </div>
        <div className='flex flex-row justify-between mt-2'>
            <div className='text-center'>
                <p><TbGitFork/>Forks</p>
                <p>{fork}</p>
            </div>
            <div className='text-center'>
                <p><FaRegStar/> Stars</p>
                <p>{star}</p>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard