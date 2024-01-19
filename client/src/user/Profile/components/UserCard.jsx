import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFastBackward, AiOutlineShareAlt } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import ShareModel from "../../../components/share_model";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;

function UserCard({
  username,
  name,
  picture,
  bio,
  phoneNumber,
  role,
  social,
  skills = [],
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserProfile = location.pathname === `/u/${username}`;
  const isUserDashboard = location.pathname === "/u/dashboard";

  const [showMore, setShowMore] = useState(false);
  const toggleBio = () => {
    setShowMore(!showMore);
  };
  const [show, setShow] = useState(false);
  const close_model = () => setShow(false);

  const main_model = (
    <ShareModel
      close_model={close_model}
      contestLink={`${frontendUrl}/u/${username}`}
      //theme={colorTheme}
      theme=""
    />
  );

  const truncatedBio = showMore ? bio : bio?.slice(0, 150);
  return (
    <div className="rounded-2xl bg-eerie-black-2  shadow-md flex flex-col h-fit p-12 border border-jet w-full">
      <div className="flex w-full justify-center">
        <img src={picture} alt="" className="rounded-full  w-[90px] h-[90px]" />
      </div>

      <div className="flex flex-col items-center gap-[8px] p-0">
        <div>
          <h1 className="text-center text-3xl px-3  w-full md:text-5xl text-[#F0ECE5]">{name}</h1>
          <div className="badges text-center">
            <div className="badge bg-[#9ACD32] text-black mx-1">member</div>
            {role >= 4 && (
              <div className="badge bg-[#FFFF00] text-black mx-1">
                contributor
              </div>
            )}
            {role >= 5 && (
              <div className="badge bg-[#7DF9FF] text-black mx-1">admin</div>
            )}
          </div>
          <div className="skills text-center pt-2">
            {skills.map((skill, index) => (
              <div key={index} className="badge bg-custom-blue text-black mx-1">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>
            {truncatedBio}
            {bio?.length > 150 && (
              <button
                onClick={toggleBio}
                className="text-blue-500 hover:underline"
              >
                {showMore ? "...show less" : "...show more"}
              </button>
            )}
          </p>
        </div>
        {/* <div>
                    <AiFillGithub size='5vw' />
                </div> */}
      </div>

      <div className="flex flex-col w-full justify-center items-center">
        {(isUserProfile || isUserDashboard) && (
          <button
            className="bg-blue-500 flex gap-1 w-fit items-center justify-center text-white px-4 py-2 rounded-full mt-4 hover:opacity-80"
            onClick={() => setShow(isUserProfile)}
          >
            <>
              <AiOutlineShareAlt />
              Share
            </>
          </button>
        )}
        <div className={`pt-8 flex justify-center gap-3 ${social ? "" : "hidden"}`}>
          <a className={social?.linkedin ? "" : "hidden"} href={social?.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin size={30} color="white"/>
          </a>
          <a className={social?.instagram ? "" : "hidden"} href={social?.instagram} target="_blank" rel="noreferrer">
            <FaInstagram size={30} color="white"/>
          </a>
          <a className={social?.twitter ? "" : "hidden"} href={social?.twitter} target="_blank" rel="noreferrer">
            <FaXTwitter size={30} color="white"/>
          </a>
        </div>
        {!isUserProfile && !isUserDashboard && (
          <button className="bg-blue-500 flex gap-1 w-fit items-center justify-center text-white px-4 py-2 rounded-full mt-4 hover:opacity-80">
            <>
              <AiOutlineFastBackward />
              Back
            </>
          </button>
        )}
        {isUserDashboard && (
          <button
            className="bg-blue-500 flex gap-1 w-fit items-center justify-center text-white px-4 py-2 rounded-full mt-4 hover:opacity-80"
            onClick={() => navigate(`/u/${username}`)}
          >
            View Profile
          </button>
        )}
      </div>
      {show && main_model}
    </div>
  );
}

export default UserCard;
