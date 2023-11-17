import { useState } from "react";
import { useOutletContext, useParams, useLocation } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import leetcode from '../../../assets/leetcode.svg'
// import codingninjas from "../../../assets/codingninjas.png";
import codechef from '../../../assets/codechef.svg'
import codeforces from '../../../assets/codeforces.svg'
import { OpenInNew } from '@mui/icons-material';
import { Helmet } from "react-helmet";
import ShareModel from "../../../components/share_model.jsx";

const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
function PlatformRatings() {
    const data = useOutletContext();
    const { platform } = useParams();
    // console.log(platform);
    const location = useLocation();
    const [show, setShow] = useState(false);
    const close_model = () => setShow(false);

    const main_model = (
        <ShareModel
            close_model={close_model}
            contestLink={`${frontendUrl}${location.pathname}`}
            //theme={colorTheme}
            theme=''
        />
    )

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
    if (platformData.rating !== null) {
        return (
            <>
                <Helmet>
                    <title>{pageTitle}</title>
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={contentDescription} />
                    <meta name="description" content={contentDescription} />
                </Helmet>
                {/* <EmojiEventsIcon sx={{ fontSize: 100 }} /> */}
                <div className="mx-auto text-center items-center flex flex-col my-12 w-full pb-12 h-full">
                    {/* <div className="card flex flex-row">
                        <div className="upper flex flex-row">
                            <img src={contestLinks[platform].img} style={{ maxHeight: '35px', maxWidth: '35px' }} />
                        </div>
                        <div className="lower flex flex-col">

                        </div>
                    </div> */}
                    <div className="border border-jet bg-gradient-to-br from-color-1 from-0% via-color-2 via-100% to-color-3 rounded-3xl shadow-shadowBlack z-1 w-2/4 max-phone:w-3/4 py-4">
                        <figure className="w-full flex justify-center rounded-3xl">
                            <img className="w-16 h-16" src={contestLinks[platform].img} alt="platform icon" />
                        </figure>
                        <div className="card-body p-4 text-center items-center w-full">
                            <h2 className="card-title text-center my-3 cursor-pointer">
                                @{platformData?.username || "user not found"}
                                <a href={platformData?.username ? contestLinks[platform].profileUrl + platformData.username : "#"} target={platformData?.username ? "_blank" : ""} rel="noopener noreferrer">
                                    <OpenInNew />
                                </a>
                            </h2>
                            <div className="info flex flex-row w-full justify-around my-3">
                                <div className="flex flex-col ">
                                    <h3 className="text-xl">{platformData?.rating || "null"}</h3>
                                    <div className="badge badge-outline text-[#f6c43d] my-2">Rating</div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xl">{platformData?.badge || "null"}</h3>
                                    <div className="badge text-[#1789ca] badge-outline my-2">badge</div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xl">{platformData?.attendedContestsCount || "null"}</h3>
                                    <div className="badge badge-outline text-[#da2828] my-2">contests</div>
                                </div>

                            </div>
                            <div className="buttons">
                                <button className="btn btn-outline btn-accent" onClick={() => setShow(true)}>
                                    Share
                                </button>
                                {show && main_model}
                            </div>
                        </div>
                        <div className="fetch-time flex w-full justify-center p-2">
                            <p className="text-sm">
                                Last fetched: {startTimeIST}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="mx-auto text-center items-center flex flex-col my-12 w-full h-full pb-12">
                <p>No data available for the selected platform: {platform}</p>
            </div>
        );
    }
}

export default PlatformRatings;
