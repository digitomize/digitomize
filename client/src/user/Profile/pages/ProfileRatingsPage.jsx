import React from 'react'
import { Link, Outlet, useOutletContext, useNavigate, NavLink } from 'react-router-dom'
import UserCard from '../components/UserCard'
import leetcode from '../../../assets/leetcode.svg'
// import codingninjas from "../../../assets/codingninjas.png";
import codechef from '../../../assets/codechef.svg'
import codeforces from '../../../assets/codeforces.svg'


function ProfileRatingsPage() {
  const navigate = useNavigate();
  const profileData = useOutletContext();
  const personal_data = profileData.personal_data;
  React.useEffect(() => {
    navigate('codeforces');
  }, [navigate]);
  const contestLinks = [
    {
      name: 'Codeforces',
      link: 'codeforces',
      img: codeforces,
      rating: profileData.ratings.codeforces.rating,
    },
    {
      name: 'Codechef',
      link: 'codechef',
      img: codechef,
      rating: profileData.ratings.codechef.rating,
    },
    {
      name: 'Leetcode',
      link: 'leetcode',
      img: leetcode,
      rating: profileData.ratings.leetcode.rating,
    }
  ]

  return (
    <>
      <div className="phone:w-10/12 mx-auto py-4">
        <div className="flex max-phone:flex-col max-phone:mt-4">
          <div className='flex flex-col justify-center phone:w-2/4 max-phone:w-11/12 mx-auto'>
            <div className="phone:w-9/12">
              <Link to="..">
                <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} role={personal_data.role} />
              </Link>
            </div>
            {/* <div className='border-[#D1E5F4] border-2 rounded-xl bg-cardsColor p-6 mt-4 phone:w-9/12'>
              <div className='flex w-full h-full flex-col justify-around'>
                {
                  contestLinks.map((contestLink, index) => (
                    <>
                      <Link to={contestLink.link} key={index}>
                        <div className='flex justify-between my-4'>
                          <p className='text-3xl'>{contestLink.name}</p>
                          <img src={contestLink.img} alt={contestLink.img} style={{ maxHeight: '35px', maxWidth: '35px' }} />

                        </div>
                      </Link>
                      {index !== contestLinks.length - 1 && <div className='h-[1px] bg-white w-full'></div>}

                    </>

                  ))
                }

              </div>
            </div> */}

          </div>
          {/* <div className='h-full phone:w-2/4'>
            <Outlet context={profileData} />
          </div> */}
          <div className="phone:w-3/4 pt-12">
            <div className='m-auto bg-eerie-black-2 h-full w-full rounded-2xl shadow-md'>
              <div className="flex flex-col items-end w-full">

                <nav className="navbar bg-eerie-black-1 backdrop-blur-md border border-jet phone:w-max rounded-tr-2xl rounded-bl-2xl shadow-none py-0 px-6  ">
                  <ul className='navbar-list flex gap-4 py-0 px-6'>
                    {contestLinks
                      .filter(contestLink => contestLink.rating !== null)
                      .map((contestLink, index) => (
                        <NavLink to={`${contestLink.link}`}
                          className={({ isActive }) => isActive ? 'text-white' : 'text-gray-500'}
                          key={index}>
                          {contestLink.name}
                        </NavLink>
                      ))}
                  </ul>
                </nav>
              </div>
              <div className='w-full'>

                <Outlet context={profileData} />
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileRatingsPage