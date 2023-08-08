import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function IndividualCard() {
    const params = useParams()
    const [contest, setContest] = useState([])
    const vanity = params.vanity

    useEffect(() => {
        fetch(`https://digitomize-backend.onrender.com/api/contests?vanity=${vanity}`)
            .then(res => res.json())
            .then(data => setContest(data))
    }, [vanity])
    console.log(contest);
  return (
    <div>IndividualCard</div>
  )
}

export default IndividualCard