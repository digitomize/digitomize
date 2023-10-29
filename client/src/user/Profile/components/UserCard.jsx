import { useState } from 'react'
import logo from '../../../assets/logo.png'
import { AiFillGithub } from 'react-icons/ai'

function UserCard({ username, name, picture, bio, phoneNumber }) {
    const [showMore, setShowMore] = useState(false);

    const toggleBio = () => {
        setShowMore(!showMore);
    };

    const truncatedBio = showMore ? bio : bio?.slice(0, 219);
    return (
        <div className={`border-[#D1E5F4] border-2 rounded-xl bg-cardsColor flex flex-col  h-fit p-6 w-full`}>
            <div className='flex w-full justify-center'>
                <img src={picture} alt="" className='rounded-full h-[90px] w-[90px]' />
            </div>

            <div className='flex flex-col items-center gap-[8px] p-0'>
                <div>
                    <h1 className='normal-case text-center'>
                        {name}
                    </h1>
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
                <div>
                    <AiFillGithub size='5vw'/>
                </div>

            </div>
        </div>
    )
}

export default UserCard