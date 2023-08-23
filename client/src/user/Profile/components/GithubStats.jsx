import React from 'react'
import Piechart from './Piechart';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';


export default function GithubStats() {
  const user = [
    { language: 'HTML', percentage: 40 },
    { language: 'JavaScript', percentage: 10 },
    { language: 'TypeScript', percentage: 20 },
    { language: 'Java', percentage: 30 },
  ];

  return (
    <div className='flex flex-row mt-5 mb-10 px-5 py-11 justify-between'>
      <div>


        <h1 className='text-3xl font-bold'>GITHUB STATS</h1>
        <ul className='p-3 text-lg'>
          <li className='w-max px-1'>
            <StarBorderOutlinedIcon className='mr-4 ' style={{ color: 'gold', fontSize: 35 }} />
            Total Stars Earned: 4
          </li>
          <li className='w-max'>
            <HistoryOutlinedIcon className='mr-4' style={{ color: 'gold', fontSize: 37 }} />
            Total Commits (2023):72Total PRs: 5
          </li>
          <li className='w-max'>
            <CommitOutlinedIcon className='mr-4' style={{ color: 'gold', fontSize: 35 }} />
            Total PR: 1.1k
          </li>
          <li className='w-max'>

            <ErrorOutlineOutlinedIcon className='mr-4' style={{ color: 'gold', fontSize: 33 }} />
            Total Issues: 1
          </li>
          <li className='w-max'>
            <EmojiEventsOutlinedIcon className='mr-4' style={{ color: 'gold', fontSize: 35 }} />
            Contributed to (last year): 4
          </li>
        </ul>
      </div>


      <div className='h-60 relative right-72'>


        <Piechart />


        <h1 className='text-2xl font-bold self-end>'>MOST USED LANGUAGES</h1>
      </div>

    </div>
  );
}