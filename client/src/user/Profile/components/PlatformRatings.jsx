import { useOutletContext, useParams } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import leetcode from '../../../assets/leetcode.svg'
// import codingninjas from "../../../assets/codingninjas.png";
import codechef from '../../../assets/codechef.svg'
import codeforces from '../../../assets/codeforces.svg'
import { OpenInNew } from '@mui/icons-material';
import { Helmet } from "react-helmet";

function PlatformRatings() {
    const data = useOutletContext();
    const { platform } = useParams();
    console.log(platform);
    const contestLinks = {
        codeforces: {
            name: 'Codeforces',
            link: 'codeforces',
            profileUrl: 'https://codeforces.com/profile/',
            img: codeforces
        },
        codechef: {
            name: 'Codechef',
            link: 'codechef',
            profileUrl: 'https://www.codechef.com/users/',
            img: codechef
        },
        leetcode: {
            name: 'Leetcode',
            link: 'leetcode',
            profileUrl: 'https://leetcode.com/',
            img: leetcode
        }
    };
    var platformData = data.ratings[platform];
    // if (platformData.username == null || platformData.rating == null) {
    //     platformData = null;
    // }
    console.log(platformData);
    const startDate = new Date(platformData?.fetchTime);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Kolkata",
    };
    const startTimeIST = startDate.toLocaleString("en-US", options);
    const pageTitle = `${platform} | ${data.personal_data.name}`;
    const contentDescription = platformData.rating ? `${platformData.badge} with ${platformData.rating} rating | @${platformData.username}` : `Check out ${data.personal_data.name}'s ratings`;
    // Check if platformData is available before rendering
    if (platformData) {
        return (
            <>
                <Helmet>
                    <title>{pageTitle}</title>
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={contentDescription} />
                    <meta name="description" content={contentDescription} />
                </Helmet>
                {/* <EmojiEventsIcon sx={{ fontSize: 100 }} /> */}
                <div className="m-auto text-center items-center flex flex-col my-12 w-11/12">
                    {/* <div className="card flex flex-row">
                        <div className="upper flex flex-row">
                            <img src={contestLinks[platform].img} style={{ maxHeight: '35px', maxWidth: '35px' }} />
                        </div>
                        <div className="lower flex flex-col">

                        </div>
                    </div> */}
                    <div className="border-[#D1E5F4] border-2 rounded-xl shadow-[8px_8px_0px_#D1E5F4] card max-phone:w-11/12 bg-base-300 items-center">
                        <figure className="w-40 h-40">
                            <img className="w-full" src={contestLinks[platform].img} alt="platform icon" />
                        </figure>
                        <div className="card-body bg-base-100 text-center items-center w-full">
                            <h2 className="card-title text-center my-3">
                                @{platformData?.username || "user not found"}
                                <div>
                                    <a href={platformData?.username ? contestLinks[platform].profileUrl + platformData.username : "#"} target={platformData?.username ? "_blank" : ""} rel="noopener noreferrer">
                                        <OpenInNew />
                                    </a>
                                </div>
                            </h2>
                            <div className="info flex flex-row w-full justify-around my-3">
                                <div className="flex flex-col">
                                    <h3>{platformData?.rating || "null"}</h3>
                                    <div className="badge badge-outline my-2">Rating</div>
                                </div>
                                <div className="flex flex-col">
                                    <h3>{platformData?.badge || "null"}</h3>
                                    <div className="badge badge-outline my-2">badge</div>
                                </div>
                                <div className="flex flex-col">
                                    <h3>{platformData?.attendedContestsCount || "null"}</h3>
                                    <div className="badge badge-outline my-2">contests</div>
                                </div>

                            </div>
                            <div className="buttons">
                                <button className="btn btn-outline btn-success">Share</button>
                            </div>
                        </div>
                        <div className="fetch-time flex w-full justify-end p-2">
                            Last fetched: {startTimeIST}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div>
                <p>No data available for the selected platform: {platform}</p>
            </div>
        );
    }
}

export default PlatformRatings;
