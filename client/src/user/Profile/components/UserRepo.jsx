import React from 'react';
import { Accordion } from 'flowbite-react';

export default function UserRepo() {
  const user = [
    { RepoName: "Safar", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
    { RepoName: "LearnQuest", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
    { RepoName: "Unibuddy", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
  ];

  return (
    <div>
          <h1>Github Repositories</h1>
      <Accordion collapseAll className='border-4 gradient-custom-border' >
        {user.map((repo, index) => (
          
          <Accordion.Panel key={index} className='border-4 gradient-custom-border'  >
            <Accordion.Title className='text-lg  hover:bg-green-700 '>
              {repo.RepoName}
            </Accordion.Title>
            <Accordion.Content className='hover:bg-yellow-400'>
              <p className="mb-2 text-white">
                {repo.description}
              </p>
            <button className='rounded-full border-2 gradient-custom w-[40%] h-9'>View On Github</button>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
}
