import axios from "axios";
import { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import { IoTrendingUp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Swords } from "lucide-react";

function Contests() {
    const [loading, setLoading] = useState(true);
    const [contests, setContests] = useState([]);
    const [err, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://api.digitomize.com/contests")
                setContests(data.results.slice(0, 5));
                setLoading(false);
                // console.log(data);
                console.log(data.results);
            } catch (error) {
                const msg = error.response.data?.message || error.response.data?.error;
                console.log(msg);
                setLoading(false);
                setError(msg);
                console.log(err)
            }
        };

        fetchData(); // Call the async function immediately

    }, []); // Empty dependency array means this effect runs only once on mount

    if (loading) {
        return (
            <div className="">
                Loading...
                {err && <div>Error: {err.message}</div>}
            </div>
        );
    }

    return (
        <>
            <div className="bg-dashboardColor px-4 w-full">
                <div className="mx-auto flex justify-around">

                    <button className={`btn btn-sm ${false ? "btn-outline" : "bg-custom-blue text-white"}`} >
                        Contests
                        <IoTrendingUp />
                    </button>
                    <a href="https://digitomize.com/challenges" target="_blank" className="flex flex-row">
                        <button className={`btn btn-sm ${true ? "btn-outline" : "bg-custom-blue text-white"}`} >
                            Challenges
                            <Swords size={15} />
                        </button>
                    </a>
                    {/* <button className={`btn btn-sm btn-disabled ${true ? "btn-outline" : "bg-custom-blue text-white"}`} >
                        Hackathons
                        <FaLock />
                    </button> */}
                </div>
                {
                    contests.map((contest) => (
                        <ContestCard key={contest.id} contest={contest} />
                    ))
                }
                <a href="https://digitomize.com/contests" target="_blank" rel="noopener noreferrer" className="text-custom-blue text-center my-2 mx-auto w-full flex items-center justify-center">Explore more...</a>
                {err && <div className="text-center mx-auto my-4">Error: {err || err?.message}</div>}
            </div>
        </>
    );
}

export default Contests;
