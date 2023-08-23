import React from 'react';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Codechef from '../../../assets/codechef.svg'
import Codeforces from '../../../assets/codeforces.svg'
import GeeksForGeeks from '../../../assets/geeksforgeeks.svg'
import Leetcode from '../../../assets/leetcode.svg'

export default function Ranking() {
  const contestImages = {
    CodeChef: Codechef,
    Codeforces: Codeforces,
    GeeksForGeeks: GeeksForGeeks,
    Leetcode: Leetcode,
  };

  const user = [
    { title: "GeeksForGeeks", rating: "125" },
    { title: "Leetcode", rating: "1250" },
    { title: "CodeChef", rating: "1250" },
    { title: "Codeforces", rating: "1250" },
  ];

  return (
    <div className='border-2 border-red-400 flex flex-col p-11'>
      <h1 className='text-3xl font-bold'>RANKINGS</h1>

      <ul className='list-disc text-lg p-2 space-y-6'>
        {user?.map((element) => (
          <li className='flex items-center my-3' key={element.title}>
            <img
              src={contestImages[element.title]}
              alt={element.title}
              className='w-6 h-6 mr-2'
            />
            <span className='mr-2'>{element.title}</span>
            <span>(Highest Rating: {element.rating}) </span>
            <span className='ml-3 flex cursor-pointer'>
              <OpenInNewRoundedIcon
                style={{ color: 'white', fontSize: 22, hover: 'pointer' }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
