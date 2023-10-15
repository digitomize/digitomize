import React from 'react'
import { Link } from 'react-router-dom'
import NewNavbar from '../../components/NewNavbar'
import logo from '../../assets/logo.png'
import UserCard from './components/UserCard'
function NewUserProfile() {
    return (
        <>
            <NewNavbar position='static' />

            <div className="flex mt-8 flex-col md:flex-row">
                {/* First Column with 450px width */}
                <div className="w-full md:w-1/2 px-4 ms-4 py-8 md:py-0" >
                    <UserCard height={600}/>
                </div>

                {/* Second Column with two rows */}
                <div className="w-full md:w-1/2 px-4 py-8">
                    {/* First Row */}
                    <div className="flex flex-col md:flex-row">
                        <Link to='resume' className="w-full md:w-1/2 px-2">
                            {/* First Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-[450px] h-[250px] p-6">
                                <h2 className='text-xl'>See my resume</h2>
                            </div>
                        </Link>
                        <Link to='socials' className="w-full md:w-1/2 px-2">
                            {/* Second Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-[450px] h-[250px] p-6">
                                <h2 className='text-xl'>Socials</h2>
                            </div>
                        </Link>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row mt-4">
                        <Link to='ratings' className="w-full md:w-1/2 px-2">
                            {/* Third Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-[450px] h-[250px] p-6">
                                <h2 className='text-xl'>Ratings</h2>
                            </div>
                        </Link>
                        <Link to='github' className="w-full md:w-1/2 px-2">
                            {/* Fourth Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-[450px] h-[250px] p-6">
                                <h2 className='text-xl'>Github</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewUserProfile