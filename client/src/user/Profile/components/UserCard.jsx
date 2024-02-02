import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  role,
  social,
  skills = [],
}) {
  console.log(social);
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
    <div className="rounded-2xl bg-eerie-black-2  shadow-md flex flex-col h-fit lg:px-6 lg:py-8 px-4 py-6 border border-jet w-[100%]">
      <div className="flex flex-row sm:items-center md:gap-4 gap-2 mb-6 lg:gap-6">
        <img
          src={picture}
          alt=""
          className="rounded-full w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px]"
        />
        <div className="flex w-full sm:flex-col max-sm:flex-row max-sm:justify-between">
          <div>
            <h2 className="font-500 lg:text-[32px] text-2xl ">{name}</h2>
            <h2 className="sm:text-[16px] text-[14px] pl-1 font-normal font-['Geist']">@{username}</h2>
          </div>
          <div
            className={`sm:mt-3 flex  sm:gap-2 gap-3 ${social ? "" : "hidden"
              }`}
          >
            <a
              className={social?.linkedin ? "" : "hidden"}
              href={social?.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px]" color="white" />
            </a>
            <a
              className={social?.instagram ? "" : "hidden"}
              href={social?.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px]" color="white" />
            </a>
            <a
              className={social?.twitter ? "" : "hidden"}
              href={social?.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px]" color="white" />
            </a>
          </div>
        </div>
      </div>
      <div className="badges ">
        <div className="badge bg-[#9ACD32] text-black mx-1">member</div>
        {role >= 4 && (
          <div className="badge bg-[#FFFF00] text-black mx-1">contributor</div>
        )}
        {role >= 5 && (
          <div className="badge bg-[#7DF9FF] text-black mx-1">admin</div>
        )}
      </div>
      <div className="mt-6 sm:hidden">
        {skills.length > 0 && <p className="text-[16px]">Skills</p>}
        <div className="flex flex-row mt-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className=" bg-[#1582ffb3] bg-opacity-80 text-[#1582FF] text-[12px] px-3 py-[2px] rounded-[12px] font-[500] mr-4"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      {bio && <p className="border-[0.5px] border-solid border-[#8888884a] lg:text-[14px] sm:text-[12px] rounded-[5px] px-3 py-2 mt-4 text-[#818587]">
        {truncatedBio}

        {bio?.length > 150 && (
          <button onClick={toggleBio} className="text-blue-500 hover:underline">
            {showMore ? "...show less" : "...show more"}
          </button>
        )}
      </p>}
      <div className="flex lg:flex-row sm:flex-col max-sm:flex-row gap-y-4 w-full justify-between items-center mt-6">
        {isUserDashboard && (
          <button
            className=" text-white px-6 py-2 border border-solid rounded-[10px] text-[14px] border-[#FAFAFA] "
            onClick={() => navigate(`/u/${username}`)}
          >
            View Profile
          </button>
        )}
        {(isUserProfile || isUserDashboard) && (
          <button
            className="bg-blue-500 flex flex-row justify-center items-center space-x-3 text-[14px] text-white px-6 py-2 rounded-[10px] hover:opacity-80"
            onClick={() =>
              setShow(isUserProfile ? isUserProfile : isUserDashboard)
            }
          >
            <p>Share</p>
            <AiOutlineShareAlt size={24} />
          </button>
        )}

        {!isUserProfile && !isUserDashboard && (
          <button className="bg-blue-500 flex gap-1 w-fit items-center justify-center text-white px-4 py-2 rounded-full mt-4 hover:opacity-80">
            <>
              <AiOutlineFastBackward />
              Back
            </>
          </button>
        )}
      </div>
      <div className="mt-6 max-sm:hidden">
        <p className="text-[16px]">Skills</p>
        <div className="flex flex-row mt-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className=" bg-[#1582ffb3] bg-opacity-80 text-[#1582FF] text-[12px] px-3 py-[2px] rounded-[12px] font-[500] mr-4"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      {show && main_model}
    </div>
  );
}

export default UserCard;