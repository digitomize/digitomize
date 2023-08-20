import React from 'react';

export default function Ranking() {
  const user = [
    { title: "geeksForGeeks", rating: "1250", imgUrl: "gfgLofo" },
    { title: "leetcode", rating: "1250", imgUrl: "leetcodeLogo" },
    { title: "codeChef", rating: "1250", imgUrl: "leetcodeLogo" },
  ];

  return (
    <div className='border-2 border-red-500 flex flex-col '>
      <h1 className='text-3xl font-bold'>Ranking</h1>

      <ul className='list-disc text-lg'>
        {user?.map((element) => (
          <li className='flex items-center my-3'>
            <span className='mr-2'>{element.title}</span>
            <span>{element.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
