import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
function UserDashBoardTab() {
  const url=window.location.href.split('/') 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(url[url.length-1]);
  const navLinks = [
    {
      title: "account",
      path: "account",
    },
    {
      title: "profile",
      path: "profile"
    },
    {
      title: "carrer",
      path: "carrer",
    },
    {
      title : "widget",
      path : "widget"
    },
    {
      title : "ratings",
      path : "ratings"
    },
    {
      title : "preferences",
      path : "preferences"
    }
  ];
  const handleOptionClick = (option) => {
 setSelectedOption(option)
  }
  const options = [{}];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    return (
     <>
      <div className="relative md:hidden text-left bg-ecardsColor mb-3 font-['Geist']">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex w-full justify-between capitalize items-center border border-white rounded-[12px]  px-4 py-2 bg-cardsColor text-sm font-medium text-button-primary transition duration-150 ease-in-out text-left"
      >
        <p>{selectedOption}</p>
       {
        isOpen ? <IoIosArrowUp/>:<IoIosArrowDown/>
       }

      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-xl bg-cardsColor border border-white border-solid  w-full">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
            {navLinks.map((option,index) => (
              <Link to={option.path}
                key={index}
                onClick={() => handleOptionClick(option.title)}
                className="px-4 block capitalize py-2 text-sm text-white w-full text-left"
                role="menuitem"
              >
                {option.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    <div className='hidden max-w-[270px] w-[20%] md:flex flex-col pt-[33px] border border-solid border-white text-[20px] space-y-[33px] bg-cardsColor rounded-[12px] px-[20px]  h-[450px] mr-[30px]'>
    <Link to={'/u/dashboard'} className={`capitalize flex flex-row items-center gap-2`} ><FaArrowLeft/>Dashboard</Link>
      {
        navLinks.map((option, index)=>(
          <Link to={option.path} key={index}  className={`capitalize ${selectedOption===option.title ? "text-button-primary":""}`} onClick={()=>{handleOptionClick(option.title)}}>{option.title}</Link>
        ))
      }
</div></>
    )
}

export default UserDashBoardTab