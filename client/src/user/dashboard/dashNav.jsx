import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { navLinks, accountLinks } from "./dashboardLinks";
import { logo_white_full } from "../../components/AllAssets";
import Novu from "../../components/globals/Notifs/Novu";
import { useUserAuth } from "../../context/UserAuthContext";
import { downArrow } from "../../components/AllAssets";
function DashNav() {

    const { user } = useUserAuth();
    return (
        <>
            <header className="bg-dashboardDarkerColor h-16 fixed w-full z-20">
                <nav className="flex justify-between items-center h-16 pr-4 md:pr-8">
                    <div className="h-full flex items-center">

                        <div className="h-full flex items-center gap-1 pl-3 pr-4 lg:border-r border-jet lg:w-56 bg-dashboardColor">
                        <div className="relative inline-block text-left">
                            <div className="m-4">
                                <button type="button" className="sm:py-0 flex items-center rounded" id="options-menu" aria-expanded="true" aria-haspopup="true">
                                    <img src={logo_white_full} alt="logo" className="w-36" />
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {
                            user && (
                                <>
                                    <div className="border-r pr-2 border-jet">
                                        <Novu user={user} />
                                    </div>
                                    <div className="relative inline-block text-left">
                                        <button className={`inline-flex justify-center w-full px-2 py-1 rounded transition btn btn-ghost`}>
                                            <div className="flex items-center space-x-2">
                                                <div className="relative">
                                                    <img className="rounded-full shrink-0 w-7 h-7 ring-2 ring-transparent " src={user.photoURL} alt="" />

                                                </div>
                                                <span className="max-sm:hidden sm:inline font-medium">
                                                    Pranshu Gupta
                                                </span>
                                                <img src={downArrow} alt="downArrow" className="w-5 stroke-white" />

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