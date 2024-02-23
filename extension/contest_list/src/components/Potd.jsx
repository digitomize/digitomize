import axios from "axios";
import { useEffect, useState } from "react";
import ContestCard from "./ContestCard";

import Nav from "./Nav";
import PotdCard from "./PotdCard";

function Potd() {
    const [loading, setLoading] = useState(true);
    const [contests, setContests] = useState([]);
    const [err, setError] = useState(null);
    const [potdGFG, setPotdGFG] = useState([]);
    const [potdLeetcode, setPotdLeetcode] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://cors-anywhere.herokuapp.com/https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today")
                setPotdGFG(data);
                // setContests(data.results.slice(0, 5));
                setLoading(false);
                console.log(data);
                // console.log(data.results);
            } catch (error) {
                const msg = error.response.data?.message || error.response.data?.error;
                // console.log(msg);
                setLoading(false);
                setError(msg);
                console.log(error)
            }


            try {
                const query = {
                    operationName: "codingChallengeMedal",
                    variables: { year: 2024, month: 2 },
                    query: `
                        query codingChallengeMedal{
                            activeDailyCodingChallengeQuestion {
                                link
                                date
                            }
                        }
                    `
                };

                const { data } = await axios.post('https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql', query);

                // const linkk = 
                const link = data?.data?.activeDailyCodingChallengeQuestion?.link;

                // Extracting the last part of the link which contains the problem name
                const parts = link.split('/');
                const problemName = parts[parts.length - 2]; // Get the second-to-last part

                // Transforming the problem name by replacing dashes with spaces and capitalizing words
                const transformedName = problemName
                    .split('-') // Split by dashes
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                    .join(' '); // Join the words with spaces

                // console.log(transformedName);
                const potd = {
                    problem_name: transformedName,
                    problem_url: "https://leetcode.com"+ link,
                    date: data?.data?.activeDailyCodingChallengeQuestion?.date,
                };
                setPotdLeetcode(potd);
                // console.log(potd);

                // Now you can access the data returned from the GraphQL API
                // console.log(data);
                // const { data } = await axios.get("https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/all/")
                // setPotdLeetcode(data);
                // setContests(data.results.slice(0, 5));
                setLoading(false);
                // console.log(data);
                // console.log(data.results);
            }
            catch (error) {
                // const msg = error.response.data?.message || error.response.data?.error;
                // console.log(msg);
                setLoading(false);
                // setError(msg);
                console.log(error)
            }

        };

        fetchData(); // Call the async function immediately

    }, []); // Empty dependency array means this effect runs only once on mount

    if (loading) {
        return (
            <div className="flex justify-center mx-auto w-full items-center">
                Loading <span className="loading loading-bars loading-sm"></span>
                {err && <div>Error: {err.message}</div>}
            </div>
        );
    }

    return (
        <>
            <div className="bg-dashboardColor px-4 w-full">
                {/* <Nav path={"potd"} /> */}
                <PotdCard potd={potdGFG} platform={"geeksforgeeks"} />
                <PotdCard potd={potdLeetcode} platform={"leetcode"} />
                {/* <a href="https://digitomize.com/contests" target="_blank" rel="noopener noreferrer" className="text-custom-blue text-center my-2 mx-auto w-full flex items-center justify-center">Explore more...</a> */}
                {err && <div className="text-center mx-auto my-4">Error: {err || err?.message}</div>}
            </div>
        </>
    );
}

export default Potd;
