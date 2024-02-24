/*global chrome*/
import axios from "axios";
import { useEffect, useState } from "react";
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
                // Fetch GeeksforGeeks data
                chrome.storage.local.get('potdGFG', async function (result) {
                    const potdGFG = result.potdGFG || {};
                    const today = new Date();
                    const options = { day: '2-digit', month: 'short', year: 'numeric' };
                    const formattedToday = today.toLocaleDateString('en-GB', options);
                    console.log("Today is:", formattedToday);

                    if (formattedToday in potdGFG) {
                        const todayData = potdGFG[formattedToday];
                        // Use today's data
                        console.log("Using today's GeeksforGeeks data:", todayData);
                        // Set the data to your state or wherever you need it
                        setPotdGFG(todayData);
                    } else {
                        chrome.storage.local.remove('potdGFG');
                        // Fetch new GeeksforGeeks data
                        try {
                            const response = await axios.get("https://cors-anywhere.herokuapp.com/https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today");
                            const data = response.data;
                            const problemName = data.problem_name;
                            const problemUrl = data.problem_url;
                            const date = data.date;
                            const newData = { problemName, problemUrl, date };

                            // Store today's GeeksforGeeks data
                            potdGFG[formattedToday] = newData;
                            chrome.storage.local.set({ potdGFG }, function () {
                                console.log("GeeksforGeeks data for today stored:", newData);
                            });

                            // Use the fetched data
                            setPotdGFG(newData);
                        } catch (error) {
                            console.error("Error fetching GeeksforGeeks data:", error);
                        }
                    }
                });

            } catch (error) {
                const msg = error.response?.data?.message || error.response?.data?.error;
                setLoading(false);
                setError(msg);
                console.error(error);
            }

            try {
                // Fetch LeetCode data only if not already stored for today
                chrome.storage.local.get('potdLeetCode', async function (result) {
                    const potdLeetCode = result.potdLeetCode || {};
                    const today = new Date();
                    const options = { day: '2-digit', month: 'short', year: 'numeric' };
                    const formattedToday = today.toLocaleDateString('en-GB', options);
                    console.log("Today is:", formattedToday);

                    // const potdLeetCode = result.potdLeetCode;
                    if (formattedToday in potdLeetCode) {
                        const todayData = potdLeetCode[formattedToday];
                        // Use today's data
                        console.log("Using today's Leetcode data:", todayData);
                        // Set the data to your state or wherever you need it
                        setPotdLeetcode(todayData);
                    } else {
                        chrome.storage.local.remove('potdLeetCode');
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

                            const link = data?.data?.activeDailyCodingChallengeQuestion?.link;

                            // Extracting the last part of the link which contains the problem name
                            const parts = link.split('/');
                            const problemName = parts[parts.length - 2]; // Get the second-to-last part

                            // Transforming the problem name by replacing dashes with spaces and capitalizing words
                            const transformedName = problemName
                                .split('-') // Split by dashes
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                .join(' '); // Join the words with spaces

                            const formattedDate = new Date(data?.data?.activeDailyCodingChallengeQuestion?.date);
                            const formattedOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                            const formattedLeetCodeDate = formattedDate.toLocaleDateString('en-GB', formattedOptions);

                            const potd = {
                                problemName: transformedName,
                                problemUrl: "https://leetcode.com" + link,
                                date: formattedLeetCodeDate,
                            };

                            // Store LeetCode data
                            potdLeetCode[formattedToday] = potd;
                            chrome.storage.local.set({ potdLeetCode }, function () {
                                console.log("LeetCode data for today stored:", potd);
                            });

                            setPotdLeetcode(potd);
                        } catch (error) {
                            const msg = error.response?.data?.message || error.response?.data?.error;
                            setError(msg);
                            console.error(error);
                        }
                    }
                });
            }
            catch (error) {
                const msg = error.response?.data?.message || error.response?.data?.error;
                setError(msg);
                console.error("Error fetching LeetCode data:", error);
            }
            setLoading(false);
        };

        fetchData(); // Call the async function immediately

    }, []);
    // Empty dependency array means this effect runs only once on mount

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
