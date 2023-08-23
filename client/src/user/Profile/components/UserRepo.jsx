import React from 'react';
import Cards from './Cards';

export default function UserRepo() {
  const user = [
    { RepoName: "Safar", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
    { RepoName: "LearnQuest", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
    { RepoName: "Unibuddy", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
    { RepoName: "Unibuddy", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis accusamus nulla sequi dolorum doloribus!", githubLink: "Link_to_github" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Github Repositories</h1>

      <div className=" p-8 flex flex-row flex-wrap justify-between ">
        {user.map((repo, index) => (
          <Cards key={index} user={repo} />
        ))}
      </div>
    </div>
  );
}
