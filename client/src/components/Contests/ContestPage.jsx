
import * as React from 'react';
import Filter from "./Filter";
import { useNavigate } from 'react-router-dom';


function ComingSoon({ value }) {
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
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${newValue}`)
  };
  return (


    <div className="">
      {value === 'contests' && <Filter />}
      {value === 'hackathons' && <ComingSoon value={value} />}
      {value === 'internships' && <ComingSoon value={value} />}
      {value === 'jobs' && <ComingSoon value={value} />}
    </div>



  )
}