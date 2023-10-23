import React from 'react'
import { Link, Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import UserCard from '../components/UserCard'
import leetcode from '../../../assets/leetcode.svg'
// import codingninjas from "../../../assets/codingninjas.png";
import codechef from '../../../assets/codechef.svg'
import codeforces from '../../../assets/codeforces.svg'


function ProfileRatingsPage() {
  const navigate = useNavigate();
  const profileData = useOutletContext();

  React.useEffect(() => {
    navigate('codeforces');
  }, [navigate]);
  const contestLinks = [
    {
      name: 'Codeforces',
      link: 'codeforces',
      img: codeforces
    },
    {
      name: 'Codechef',
      link: 'codechef',
      img: codechef
    },
    // {
    //   name: 'Coding Ninjas',
    //   link: 'codingninjas',
    //   img: codingninjas
    // },
    {
      name: 'Leetcode',
      link: 'leetcode',
      img: leetcode
    }
  ]


  return (
    <div className="flex">

      <div className='min-h-screen flex flex-col justify-center gap-8 ps-8'>
        <Link to="..">
          <UserCard height={500} />
        </Link>
        <div className='border-[#D1E5F4] border-2 rounded-xl bg-cardsColor  w-[450px] h-[400px] p-6 '>
          <div className='flex w-full h-full flex-col justify-around'>
            {
              contestLinks.map((contestLink, index) => (
                <>
                  <Link to={contestLink.link} key={index}>
                    <div className='flex justify-between'>
                      <p className='text-3xl'>{contestLink.name}</p>
                      <img src={contestLink.img} alt={contestLink.img} style={{ maxHeight: '35px', maxWidth: '35px' }} />

                    </div>
                  </Link>
                  {index !== contestLinks.length - 1 && <div className='h-[1px] bg-white w-full'></div>}

                </>

              ))
            }

          </div>
        </div>

      </div>
      <div className='h-full w-full'>
        <Outlet context={profileData} />
      </div>
    </div>

  )
}

export default ProfileRatingsPage