import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import NewNavbar from '../../components/NewNavbar'
import logo from '../../assets/logo.png'
import UserCard from './components/UserCard'
import { AiFillGithub, AiFillLinkedin, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { PiUserFocusFill } from 'react-icons/pi'
import { BsFillArrowUpRightCircleFill, BsGraphUpArrow } from 'react-icons/bs'

function NewUserProfile() {
    const { personal_data } = useOutletContext();

    console.log(personal_data)
    return (
        <>
            <div className="flex mt-8 flex-col md:flex-row w-11/12 mx-auto pb-8">
                {/* First Column with 450px width */}
                <div className="flex md:w-1/2" >
                    <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} />
                </div>

                {/* Second Column with two rows */}
                <div className="flex flex-col w-full md:w-1/2 px-4 pt-4 md:pt-0">
                    {/* First Row */}
                    <div className="flex flex-col md:flex-row pb-2 px-2 gap-6">
                        <Link to='resume' className="w-full md:w-1/2 ">

                            <div className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#FF526A]  hover:scale-[1.02] w-full h-[250px] p-8">
                                <div className='w-full h-full flex items-end'>
                                    <div className=''>
                                        <PiUserFocusFill size='20%' />
                                        <p className='uppercase tracking-tighter text-sm text-black pb-4'> Learn more about me</p>
                                        <div className='flex justify-between items-center'>

                                            <p className='text-4xl tracking-tight text-black font-medium'>See my
                                                resume</p>
                                            <BsFillArrowUpRightCircleFill size='12%' className='ml-2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="w-full md:w-1/2 ">
                            <div className="border-[#d1e5f47d] border-2 border-2 rounded-3xl bg-cardsColor w-full h-[250px] p-6">
                                <h2 className='text-xl'>Socials</h2>
                                <div className="icons flex flex-col max-h-[90%]">
                                    <div className="row1 flex flex-row h-2/4 justify-around items-center">
                                        <Link>
                                            <AiFillGithub className="m-1" size='5vw' />
                                        </Link>
                                        <AiFillLinkedin className="m-1" size='5vw' />
                                        <AiFillFacebook className="m-1" size='5vw' />
                                    </div>
                                    <div className="row2 flex flex-row h-2/4 justify-around items-center">
                                        <FaXTwitter className="m-2" size='4vw' />
                                        <AiFillInstagram className="m-1" size='5vw' />
                                        <TbWorld className="m-1" size='5vw' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row pt-4 px-2 gap-6">
                        <Link to='ratings' className="w-full md:w-1/2 ">
                            {/* Third Card */}
                            <div className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#050127]  hover:scale-[1.02] w-full h-[250px] p-8">
                                <div className='w-full h-full flex items-end'>
                                    <div className=''>
                                        <BsGraphUpArrow size='20%' />
                                        <div className='flex justify-between items-center'>

                                            <p className='pt-4 tracking-tight text-4xl text-[#ffc552de] font-medium'>
                                                contest ratings &#10024;</p>
                                            <BsFillArrowUpRightCircleFill size='12%' className='ml-2' />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                        <Link to='github' className="w-full md:w-1/2 ">
                            {/* Fourth Card */}
                            <div className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#926bf2]  hover:scale-[1.02] w-full h-[250px] p-8">
                                <div className='w-full h-full flex items-end'>
                                    <div className=''>
                                        <AiFillGithub size='20%' />
                                        <div className='flex justify-between items-center'>

                                            <p className='pt-4 tracking-tight text-4xl text-white font-medium'>
                                                Github projects</p>
                                            <BsFillArrowUpRightCircleFill size='12%' className='ml-2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewUserProfile