import React from 'react';
import { 
  Button,
   Card
   } from 'flowbite-react'; // Assuming you have imported Flowbite


export default function Cards({ user }) {
  return (
    <Card className="w-[27rem] p-6 bg-cardsColor gradient-custom-onHover">
      <h5 className="text-3xl font-bold tracking-tight ">
        {user.RepoName}
      </h5>
      <p className="font-normal text-white bold">
        {user.description}
      </p>
      
        <Button color="primary">GitHub Link</Button>
      
    </Card>
  );
}
