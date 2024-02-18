import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { navLinks, accountLinks, integrationLinks, resourcesLinks } from "./dashboardLinks";
import { logo_white_full } from "../../components/AllAssets";
function UserDashBoardTab({ sideTab }) {
  const url = window.location.href.split('/')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(url[url.length - 1]);
  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }
  const options = [{}];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <aside className={`${sideTab ? '' : 'hidden'} lg:block h-full`}>
        <div className={`${sideTab ? 'bg-dashboardDarkerColor' : 'bg-dashboardColor '} h-full px-3 flex-col fixed left-0 lg:left-auto lg:top-auto lg:flex z-50 overflow-y-auto border-r border-solid border-jet w-56`}>
          <div className="h-full flex flex-col">
            <div className="pt-2 flex-grow flex flex-col dark:text-white">
              <div className="flex flex-col justify-between">
                <div>
                  <h3 class="text-slate-500 mt-4 mb-4 px-3">Account</h3>
                  <div className="text-slate-200 flex flex-col items-start w-full items-stretch">
                    {
                      accountLinks.map((option, index) => (
                        <Link to={option.path} key={index} className="h-9 border-transparent focus-visible flex items-center mb-2 rounded-lg truncate transition">
                          <button className={`rounded-lg justify-start flex w-full btn btn-ghost ${selectedOption === option.title ? "btn-active" : ""}`} onClick={() => { handleOptionClick(option.title) }}>
                            <img src={option.icon} alt={option.title} className="w-4" />
                            <p className="capitalize font-light text-sm">{option.title}</p>
                          </button>
                        </Link>
                      ))
                    }
                  </div>
                </div>
                <div>
                  <h3 class="text-slate-500 mt-4 mb-4 px-3">Integration</h3>
                  <div className="text-slate-200 flex flex-col items-start w-full items-stretch">
                    {
                      integrationLinks.map((option, index) => (
                        <Link to={option.path} key={index} className="h-9 border-transparent focus-visible flex items-center mb-2 rounded-lg truncate transition">
                          <button className={`rounded-lg justify-start flex w-full btn btn-ghost ${selectedOption === option.title ? "btn-active" : ""}`} onClick={() => { handleOptionClick(option.title) }}>
                            <img src={option.icon} alt={option.title} className="w-4" />
                            <p className="capitalize font-light text-sm">{option.title}</p>
                          </button>
                        </Link>
                      ))
                    }
                  </div>
                </div>
                <div>
                  <h3 class="text-slate-500 mt-4 mb-4 px-3">More...</h3>
                  <div className="text-slate-200 flex flex-col items-start w-full items-stretch">
                    {
                      resourcesLinks.map((option, index) => (
                        <Link to={option.path} key={index} className="h-9 border-transparent focus-visible flex items-center mb-2 rounded-lg truncate transition">
                          <button className={`rounded-lg justify-start flex w-full btn btn-ghost ${selectedOption === option.title ? "btn-active" : ""}`} onClick={() => { handleOptionClick(option.title) }}>
                            <img src={option.icon} alt={option.title} className="w-4" />
                            <p className="capitalize font-light text-sm">{option.title}</p>
                          </button>
                        </Link>
                      ))
                    }
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </aside>

    </>
  )
}

export default UserDashBoardTab