import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
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
      <div className="relative md:hidden text-left mb-3 ">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex w-full justify-between capitalize items-center border border-white rounded-[12px]  px-4 py-2 bg-[#ebebeb1a] text-sm font-medium text-button-primary transition duration-150 ease-in-out text-left"
      >
        <p>{selectedOption}</p>
       {
        isOpen ? <IoIosArrowUp/>:<IoIosArrowDown/>
       }

      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-xl bg-transparent border border-white border-solid  w-full">
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
    <div className='hidden md:flex flex-col pt-[33px] border border-solid border-white text-[20px] space-y-[33px] bg-[#0E0F10] rounded-[12px] px-[20px] w-[20%] h-[450px] mr-[30px]'>
      {
        navLinks.map((option, index)=>(
          <Link to={option.path} key={index}  className={`capitalize ${selectedOption===option.title ? "text-button-primary":""}`} onClick={()=>{handleOptionClick(option.title)}}>{option.title}</Link>
        ))
      }
</div></>
    )
}

export default UserDashBoardTab