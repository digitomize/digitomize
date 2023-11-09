import { AiFillStar, AiOutlineUsergroupAdd, AiFillLinkedin } from "react-icons/ai";
export default function About() {
    return (
        <>
            <div className="container w-11/12 mx-auto text-center mt-4">


                <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">total views</div>
                        <div className="stat-value text-secondary">11.5k+</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                            <AiFillLinkedin className="w-8 h-8"/>
                        </div>
                        <div className="stat-title">linkedin followers</div>
                        <div className="stat-value text-secondary">400+</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
                            <AiFillStar className="w-8 h-8"/>
                        </div>
                        <div className="stat-title">Github Stars</div>
                        <div className="stat-value text-secondary">74</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <AiOutlineUsergroupAdd className="w-8 h-8"/>
                        </div>
                        <div className="stat-title">contributors</div>
                        <div className="stat-value text-secondary">25+</div>
                        {/* <div className="stat-desc">21% more than last month</div> */}
                    </div>

                </div>
            </div>

        </>
    )
}