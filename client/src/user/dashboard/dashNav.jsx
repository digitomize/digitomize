import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { navLinks, accountLinks } from "./dashboardLinks";
import { logo, logo_white_D, logo_white_full } from "../../components/AllAssets";
import Novu from "../../components/globals/Notifs/Novu";
import { useUserAuth } from "../../context/UserAuthContext";
import { downArrow } from "../../components/AllAssets";
function DashNav({ toggleActive }) {

    const { user } = useUserAuth();
    return (
        <>
            <header className="noCursor bg-dashboardDarkerColor h-16 fixed w-full z-20">
                <nav className="noCursor flex justify-between items-center h-16 pr-4 md:pr-8">
                    <div className="noCursor h-full flex items-center">
                        <div className="noCursor max-lg:hidden h-full lg:flex items-center gap-1 pl-3 pr-4 lg:border-r border-jet lg:w-56 lg:bg-dashboardColor">
                            <div className="noCursor relative inline-block text-left">
                                <div className="noCursor m-4">
                                    <Link to="/u/dashboard">
                                        <button type="button" className="noCursor sm:py-0 flex items-center rounded" id="options-menu" aria-expanded="true" aria-haspopup="true">
                                            <img src={logo_white_full} alt="logo" className="noCursor w-36" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <button onClick={toggleActive} className="noCursor lg:hidden">
                            <div class="flex items-center justify-center p-2 ml-2 opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="1em" height="1em" class="inline-flex shrink-0 text-3xl">
                                    <line x1="4" y1="8" x2="20" y2="8"></line>
                                    <line x1="4" y1="16" x2="20" y2="16"></line>
                                </svg>
                            </div>
                        </button>
                        <Link to="/u/dashboard">
                            <img src={logo} alt="logo" className="noCursor w-12 lg:hidden" />
                        </Link>
                    </div>
                    <div className="noCursor flex items-center space-x-2">
                        {
                            user && (
                                <>
                                    <div className="noCursor border-r pr-2 border-jet">
                                        <Novu user={user} />
                                    </div>
                                    <div className="noCursor relative inline-block text-left">
                                        <button className={`inline-flex justify-center w-full px-2 py-1 rounded transition btn btn-ghost`}>
                                            <div className="noCursor flex items-center space-x-2">
                                                <div className="noCursor relative">
                                                    <img className="noCursor rounded-full shrink-0 w-7 ring-2 ring-transparent " src={user.photoURL} alt="" />

                                                </div>
                                                <span className="noCursor max-sm:hidden sm:inline font-medium">
                                                    {user.displayName}
                                                </span>
                                                <img src={downArrow} alt="downArrow" className="noCursor w-5 stroke-white" />

                                            </div>
                                        </button>

                                    </div>
                                </>
                            )
                        }
                    </div>
                </nav>

            </header>
        </>
    )
}

export default DashNav