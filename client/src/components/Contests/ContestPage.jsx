
import * as React from 'react';
import Filter from "./Filter";
import { LockOutlined, TrendingUp } from '@mui/icons-material';


function ComingSoon({value}) {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="my-0 text-white text-4xl text-center capitalize">
            <span style={{ textShadow: '5px 5px 5px rgba(21, 132, 255, 0.9)' }}>
              {value} {''}
            </span>
            Coming Soon
          </h1>
          <progress className="progress w-56 mt-12"></progress>
        </div>
      </div>
    </>
  )
}

export default function ContestPage() {
  const [value, setValue] = React.useState('contests');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="heading w-4/5 mx-auto text-center my-4">
        <h1 className="text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
          <span>All at</span>
          <span className="block mt-1 md:mt-6">
            <span className="bg-digitomize-bg mx-2 px-1">one</span>
            place
          </span>
        </h1>

      </div>
      <div className="buttons flex gap-4 justify-center my-8 flex-wrap">
        <button className={`btn ${value !== 'contests' ? 'btn-outline' : 'bg-custom-blue text-white'}`} onClick={(event) => handleChange(event, 'contests')}>
          Contests
          <TrendingUp />
        </button>
        <button className={`btn ${value !== 'hackathons' ? 'btn-outline' : 'bg-custom-blue text-white'}`} onClick={(event) => handleChange(event, 'hackathons')}>
          Hackathons
          <LockOutlined />
        </button>
        <button className={`btn ${value !== 'internships' ? 'btn-outline' : 'bg-custom-blue text-white'}`} onClick={(event) => handleChange(event, 'internships')}>
          Internships
          <LockOutlined />
        </button>
        <button className={`btn ${value !== 'jobs' ? 'btn-outline' : 'bg-custom-blue text-white'}`} onClick={(event) => handleChange(event, 'jobs')}>
          Jobs
          <LockOutlined />
        </button>
      </div>

      <div className="">
        {value === 'contests' && <Filter />}
        {value === 'hackathons' && <ComingSoon value={value} />}
        {value === 'internships' && <ComingSoon value={value} />}
        {value === 'jobs' && <ComingSoon value={value} />}
      </div>




    </div>
  )
}