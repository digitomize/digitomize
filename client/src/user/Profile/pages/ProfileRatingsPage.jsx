import React, { useMemo } from 'react'
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
  const contestLinks = useMemo(() => [
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
  ], [profileData.ratings.codeforces.rating, profileData.ratings.codechef.rating, profileData.ratings.leetcode.rating]);

  React.useEffect(() => {
    const platformWithRating = contestLinks.find(platform => platform.rating !== null);

    if (platformWithRating) {
      navigate(platformWithRating.link);
    } else {
      // Default navigation if no platform has a rating
      navigate('leetcode');
    }
  }, [contestLinks, navigate]);


  return (
    <>
      <div className="phone:w-10/12 mx-auto py-4">
        <div className="flex max-sm:flex-col max-phone:flex-col max-phone:mt-4">
          <div className='flex flex-col justify-center phone:w-2/4 max-phone:w-11/12 mx-auto'>
            <div className="phone:w-11/12">
              <Link to="..">
                <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} role={personal_data.role} />
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="phone:w-11/12 pt-12 max-phone:pt-4">
              <div className='m-auto bg-eerie-black-2 h-full w-full rounded-2xl max-phone:rounded-tr-none max-phone:rounded-tl-none shadow-md border border-jet'>

                {contestLinks.some(contestLink => contestLink.rating !== null) ? (
                  <div className="flex flex-col items-end w-full">
                    <nav className="navbar bg-eerie-black-1 backdrop-blur-md border border-jet phone:w-max rounded-tr-2xl rounded-bl-2xl max-phone:rounded-br-2xl max-phone:rounded-tr-none shadow-none py-0 px-6">
                      <ul className='navbar-list flex gap-4 py-0 px-6'>
                        {contestLinks
                          .filter(contestLink => contestLink.rating !== null)
                          .map((contestLink, index) => (
                            <NavLink to={`${contestLink.link}`}
                              className={({ isActive }) => isActive ? 'text-white drop-shadow' : 'text-gray-500'}
                              key={index}>
                              {contestLink.name}
                            </NavLink>
                          ))}
                      </ul>
                    </nav>
                    <div className='w-full h-full'>

                      <Outlet context={profileData} />
                    </div>
                  </div>

                ) : (
                  <div className='w-full mx-auto h-full flex flex-col justify-center items-center gap-8 p-16'>
                    <p className='lg:text-xl'>Add your contest data from the dashboard.</p>
                    <button className='btn sm:btn-sm md:btn-md lg:btn-lg bg-custom-blue text-[#fffff7]' onClick={() => navigate('/u/dashboard/ratings')}>Go to Dashboard</button>
                  </div>
                )}


              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileRatingsPage