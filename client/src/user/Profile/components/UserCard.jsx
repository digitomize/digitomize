import { useState } from 'react'
import logo from '../../../assets/logo.png'
import { AiFillGithub } from 'react-icons/ai'

function UserCard({ username, name, picture, bio, phoneNumber, role }) {
    const [showMore, setShowMore] = useState(false);
    role = 4;
    console.log("role:", role);
    const toggleBio = () => {
        setShowMore(!showMore);
    };

    const truncatedBio = showMore ? bio : bio?.slice(0, 219);
    return (
        <div className={`rounded-xl  flex flex-col  h-fit p-6 w-full`}>
            <div className='flex w-full justify-center'>
                <img src={picture} alt="" className='rounded-full  w-[90px]' />
            </div>

            <div className='flex flex-col items-center gap-[8px] p-0'>
                <div>
                    <h1 className='normal-case text-center'>
                        {name}
                    </h1>
                    <div className="badges text-center">
                        <div className="badge bg-[#9ACD32] text-black mx-1">member</div>
                        {role >= 4 && <div className="badge bg-[#FFFF00] text-black mx-1">
                            contributor
                        </div>}
                        {role >= 5 && <div className="badge bg-[#7DF9FF] text-black mx-1">
                            admin
                        </div>}
                    </div>
                </div>
                <div>
                    <p>
                        {truncatedBio}

                        {bio?.length > 219 && (
                            <button onClick={toggleBio} className="text-blue-500 hover:underline">
                                {showMore ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </p>
                </div>
                {/* <div>
                    <AiFillGithub size='5vw' />
                </div> */}

            </div>
        </div>
    )
}

export default UserCard