import React from 'react';
import { Progress } from 'flowbite-react';

export default function Skills() {
  const user = {
    name: "SAURAV GUPTA",
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ratione quae vel, delectus omnis similique.",
    skills: [
      { name: "Flutter", progress: 90 },
      { name: "javaScript", progress: 68 },
      { name: "UI/UX", progress: 32 },
      { name: "Solidity", progress: 8 },
      { name: "Figma", progress: 56 }
    ]
  };

  return (
    <div className="skills border-2  p-11 h-max">
      <h1 className='text-3xl font-bold mb-6'>SKILLS</h1>
        <div className="outerDiv border-2 border-white rounded-md flex flex-col w-80 p-4 gap-9">
        {user.skills?.map((element) => {
          return ( 
          <div >
                    <span>{element.name}</span>
                <Progress 
                  color="purple"
                  progress={element.progress}
                  className=''
                />
           
           </div>
          );
        })}
     </div>
      
    </div>
  );
}
