import React from 'react'
import UserCard from '../components/UserCard'
import leetcode from '../../../assets/leetcode.svg'
import codingninjas from "../../../assets/codingninjas.png";
import codechef from '../../../assets/codechef.svg'
import codeforces from '../../../assets/codeforces.svg'

function ProfileRatingsPage() {
  const hostToSVGMap = {
    leetcode: leetcode,
    codingninjas: codingninjas,
    codeforces: codeforces,
    codechef: codechef,
    // Add other hosts and their corresponding SVG variables here
  };
  return (
    <div className='min-h-screen flex flex-col justify-center gap-8 ps-8'>
      <UserCard height={5000} />
      <div className='border-[#D1E5F4] border-2 rounded-xl bg-cardsColor  w-[450px] h-[400px] p-6 '>
        <div className='flex w-full h-full flex-col justify-around'>
          <div className='flex w-full justify-between'>
            <p className='text-3xl'>Codeforces</p>
            <img src={codeforces} alt={codeforces} style={{ maxHeight: '35px', maxWidth: '35px' }} />
          </div>
          <div className='h-[1px] bg-white w-full'></div>
          <div className='flex justify-between'>
            <p className='text-3xl'>Codechef</p>
            <img src={codechef} alt={codechef} style={{ maxHeight: '35px', maxWidth: '35px' }} />

          </div>
          <div className='h-[1px] bg-white w-full'></div>

          <div className='flex justify-between'>
            <p className='text-3xl'>Coding Ninjas</p>
            <img src={codingninjas} alt={codingninjas} style={{ maxHeight: '35px', maxWidth: '35px' }} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileRatingsPage