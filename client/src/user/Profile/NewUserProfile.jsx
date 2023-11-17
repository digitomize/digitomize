import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import UserCard from './components/UserCard';
import { AiFillGithub, AiFillLinkedin, AiFillFacebook, AiFillInstagram, AiFillLock } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { ImProfile } from 'react-icons/im';
import { BsFillArrowUpRightCircleFill, BsGraphUpArrow } from 'react-icons/bs';
import { Helmet } from "react-helmet";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';

function NewUserProfile() {
    const { personal_data } = useOutletContext();
    const contentDescription = `${personal_data?.bio?.length > 30
        ? personal_data.bio.substring(0, 30) + "..."
        : personal_data.bio}`;
    const pageTitle = `${personal_data.name} | digitomize`;
    console.log(personal_data)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getDriveFileId = (link) => {
        const fileIdMatch = link.match(/\/d\/(.+?)\//);
        return fileIdMatch ? fileIdMatch[1] : null;
    };
    const generateEmbedUrl = () => {
        const fileId = getDriveFileId(personal_data.resume);
        if (fileId) {
            return `https://drive.google.com/uc?id=${fileId}`;
        }
        return null;
    };
    const resumeEmbedUrl = generateEmbedUrl();
    return (
        <>
            <Helmet>
                <title>{personal_data.name} | digitomize</title>
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={contentDescription} />
                <meta name="description" content={contentDescription} />
            </Helmet>
            <div className="flex mt-8 flex-col md:flex-row w-11/12 mx-auto pb-8">
                {/* First Column with 450px width */}
                <div className="flex md:w-1/2" >
                    <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} role={personal_data.role} skills={personal_data.skills} />
                </div>

                {/* Second Column with two rows */}
                <div className="flex flex-col w-full md:w-1/2 px-4 pt-4 md:pt-0">
                    {/* First Row */}
                    <div className="flex flex-col md:flex-row pb-2 px-2 gap-6">
                        <div onClick={handleOpen} className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#FF526A]  hover:scale-[1.02] w-full h-[250px] p-8">
                            <div className='w-full h-full flex items-end'>
                                <div className='w-full'>
                                    <ImProfile size='20%' />
                                    {/* <p className='uppercase tracking-tighter text-sm text-black pb-4'> Learn more about me</p> */}
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-4xl tracking-tight text-black font-medium'>See my resume</p>
                                        <BsFillArrowUpRightCircleFill className='phone:w-1/6 phone:h-1/6 ml-2 w-2/4 h-2/4' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            {/* <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-phone:w-full phone:w-10/12 bg-opacity-95 border-2 border-black shadow-lg p-4 rounded-xl glass"> */}
                            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-phone:w-[95%] phone:w-10/12 border-2 border-black shadow-lg p-4 rounded-xl glass">
                                <div className="title">
                                    <button onClick={handleClose} style={{ position: 'absolute', right: '5%', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        Close
                                    </button>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {personal_data.name}'s resume
                                    </Typography>
                                </div>
                                {personal_data.resume
                                    ?
                                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                                    <iframe src={resumeEmbedUrl} title="Resume" width="100%" height="600px" allowFullScreen></iframe>
                                    </div>
                                    :
                                    <div className="w-full bg-white text-black rounded-md">
                                        <div className="w-9/12 mx-auto text-center">
                                            <Typography variant="h4">

                                            <WarningIcon  fontSize="large"/>
                                            no resume found
                                            </Typography>
                                        </div>
                                    </div>
                                }
                            </Box>
                        </Modal>

                        <div className="w-full md:w-1/2 ">
                            <div className="border-[#d1e5f47d] border-2 rounded-3xl bg-cardsColor w-full h-[250px] p-6">
                                <h2 className='text-xl'>Socials</h2>
                                <div className="icons flex flex-col h-full">
                                    <div className="row1 flex flex-row h-2/5 justify-around items-center">
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <AiFillGithub className="m-1 w-3/5 h-3/5" />
                                        </Link>
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <AiFillLinkedin className="m-1 w-3/5 h-3/5" />
                                        </Link>
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <AiFillFacebook className="m-1 w-3/5 h-3/5" />
                                        </Link>
                                    </div>
                                    <div className="row2 flex flex-row h-2/5 justify-around items-center">
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <FaXTwitter className="m-2 w-3/5 h-3/5" />
                                        </Link>
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <AiFillInstagram className="m-1 w-3/5 h-3/5" />
                                        </Link>
                                        <Link className="w-full h-full flex justify-center items-center">
                                            <TbWorld className="m-1 w-3/5 h-3/5" />
                                        </Link>
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
                                    <div className='w-full'>
                                        <BsGraphUpArrow size='20%' />
                                        <div className='flex justify-between items-center w-full'>

                                            <p className='pt-4 tracking-tight text-4xl text-[#ffc552de] font-medium'>
                                                contest ratings &#10024;</p>
                                            <BsFillArrowUpRightCircleFill className='phone:w-1/6 phone:h-1/6 ml-2 w-2/4 h-2/4' />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Link>

                        {/* -----------GITHUB CODE WITHOUT LOCK----------- */}
                        {/* <Link to='github' className="w-full md:w-1/2 ">
                            <div className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#926bf2]  hover:scale-[1.02] w-full h-[250px] p-8">
                                <div className='w-full h-full flex items-end'>
                                    <div className='w-full'>
                                        <AiFillGithub size='20%' />
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='pt-4 tracking-tight text-4xl text-white font-medium'>
                                                Github projects</p>
                                            <BsFillArrowUpRightCircleFill size='12%' className='ml-2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link> */}


                        {/* -----------GITHUB CODE WITH LOCK----------- */}
                        <Link to='#' className="w-full md:w-1/2 cursor-not-allowed">
                            {/* Fourth Card */}
                            <div className="relative overflow-hidden rounded-3xl border-2 bg-[#926bf2] hover:scale-[1.02] w-full h-[250px]">
                                {/* Lock Icon with Blurry Background */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-md"></div>
                                    <div className="relative z-10 flex flex-col items-center justify-center text-white">
                                        <AiFillLock size='20%' />
                                        <p className="mt-2">Coming Soon</p>
                                    </div>
                                </div>
                                <div className='border border-[#d1e5f4] h-full'>
                                    <div className='w-full h-full flex items-end p-8'>
                                        <div className='w-full'>
                                            <AiFillGithub size='20%' />
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='pt-4 tracking-tight text-4xl text-white font-medium'>
                                                    Github projects</p>
                                                <BsFillArrowUpRightCircleFill className='phone:w-1/6 phone:h-1/6 ml-2 w-2/4 h-2/4' />
                                            </div>
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