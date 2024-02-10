import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { navLinks, accountLinks } from "./dashboardLinks";
import { logo_white_full } from "../../components/AllAssets";
function UserDashBoardTab() {
  const url = window.location.href.split('/')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(url[url.length - 1]);
  // const navLinks = [
  //   {
  //     title: "profile",
  //     path: "profile"
  //   },
  //   {
  //     title: "carrer",
  //     path: "carrer",
  //   },
  //   {
  //     title : "widget",
  //     path : "widget"
  //   },
  //   {
  //     title : "ratings",
  //     path : "ratings"
  //   },
  //   {
  //     title : "preferences",
  //     path : "preferences"
  //   }
  // ];
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
            isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
          }

        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 rounded-xl bg-cardsColor border border-white border-solid  w-full">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
              {navLinks.map((option, index) => (
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
      <div className='hidden w-56 md:flex flex-col border-r border-solid border-jet bg-cardsColor h-screen'>

        <div className="">
          <img src={logo_white_full} alt="logo" className="w-9/12 mx-auto m-4" />
        </div>

        <Link to={'/u/dashboard'} className={`capitalize flex flex-row items-center gap-2 mx-auto my-2`} ><FaArrowLeft />Dashboard</Link>

        <div className="w-9/12 mx-auto">
          <div>
            <p className="text-sm text-slate-500 font-thin text-left">Account</p>
            <div className="text-sm flex flex-col items-start w-full items-stretch">
              {
                accountLinks.map((option, index) => (
                  <Link to={option.path} key={index}>
                    <button className={`justify-start flex w-full btn btn-ghost ${selectedOption === option.title ? "btn-active" : ""}`} onClick={() => { handleOptionClick(option.title) }}>
                      <img src={option.icon} alt={option.title} className="w-4" />
                      <p className="capitalize font-[500] text-sm text-[#EBEBEB]">{option.title}</p>
                    </button>
                  </Link>
                ))
              }
            </div>
          </div>

          <hr />
          <div className="text-sm flex flex-col">
            {
              navLinks.map((option, index) => (
                <Link to={option.path} key={index} className={`capitalize ${selectedOption === option.title ? "text-button-primary" : ""}`} onClick={() => { handleOptionClick(option.title) }}>{option.title}</Link>
              ))
            }
          </div>
        </div>
      </div>
      {/* <ul className="menu bg-base-200 w-56 rounded-l-sm">
        {
          <Link to={'/u/dashboard'} className={`capitalize flex flex-row items-center gap-2`} ><FaArrowLeft />Dashboard</Link>
          &&
          navLinks.map((option, index) => (
            <li>
              <Link to={option.path} key={index} className={`capitalize ${selectedOption === option.title ? "text-button-primary" : ""}`} onClick={() => { handleOptionClick(option.title) }}>{option.title}</Link>
            </li>
          ))
        }
      </ul> */}
    </>
  )
}

export default UserDashBoardTab