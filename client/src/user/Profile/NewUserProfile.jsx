import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import NewNavbar from '../../components/NewNavbar'
import logo from '../../assets/logo.png'
import UserCard from './components/UserCard'
import { PersonOff } from '@mui/icons-material'
function NewUserProfile() {
    const { personal_data } = useOutletContext();

    console.log(personal_data)
    return (
        <>
            <div className="flex mt-8 flex-col md:flex-row w-11/12 mx-auto">
                {/* First Column with 450px width */}
                <div className="flex md:w-1/2" >
                    <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} />
                </div>

                {/* Second Column with two rows */}
                <div className="flex flex-col w-full md:w-1/2 px-4 pt-4 md:pt-0">
                    {/* First Row */}
                    <div className="flex flex-col md:flex-row pb-2 px-2 gap-6">
                        <Link to='resume' className="w-full md:w-1/2 ">

                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-full h-[250px] p-6">
                                <h2 className='text-xl'>See my resume</h2>
                            </div>
                        </Link>
                        <Link to='socials' className="w-full md:w-1/2 ">
                            {/* Second Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-full h-[250px] p-6">
                                <h2 className='text-xl'>Socials</h2>
                            </div>
                        </Link>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row pt-4 px-2 gap-6">
                        <Link to='ratings' className="w-full md:w-1/2 ">
                            {/* Third Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-full h-[250px] p-6">
                                <h2 className='text-xl'>Ratings</h2>
                            </div>
                        </Link>
                        <Link to='github' className="w-full md:w-1/2 ">
                            {/* Fourth Card */}
                            <div className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-full h-[250px] p-6">
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