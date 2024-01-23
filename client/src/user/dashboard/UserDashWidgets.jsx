import { MetaData } from "../../components/CustomComponents";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import ShareModel from "../../components/share_model";
import LoadingScreen from "../../components/globals/LoadingScreen";
import { userDashboardDetails } from "../../../api";
import { userProfileDetails } from "../../../api";

export default function UserDashWidgets() {
  const [loading, setLoading] = useState(true);
  const [LinksArray, setLinksArray] = useState([]);
  const [backendUrl, setBackendUrl] = useState("");
  const [allSvgs, setAllSvgs] = useState("");
  const navigate = useNavigate();

  let ratingsData = null;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        const RES = await userProfileDetails(res.data.personal_data?.username);
        // console.log("HEre",RES.data.ratings);
        if (res.data && RES.data) {
          ratingsData = RES.data.ratings;
          // console.log(res.data.personal_data?.username);
          setBackendUrl(
            import.meta.env.VITE_REACT_APP_BACKEND_URL +
              "/user/ratings/" +
              res.data.personal_data.username +
              "?",
          );
          // console.log("here: ", res.data);
          for (const platform in ratingsData) {
            const username = ratingsData[platform].username;
            const rating = ratingsData[platform].rating;
            const contests = ratingsData[platform].attendedContestsCount;
            // console.log(username,rating,contests)
            if (
              username !== null &&
              rating !== null &&
              rating !== undefined &&
              contests !== undefined &&
              backendUrl
            ) {
              setAllSvgs((a) => a + platform + "=1&");
              setLinksArray((arr) => {
                let newArr = [...arr];
                if (!newArr.includes(platform)) {
                  const svg = backendUrl + "" + platform + "=1&";
                  if (svg !== null) newArr.push(svg);
                }
                return newArr;
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
        navigate("u/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      setLinksArray([]);
    };
  }, [backendUrl]);
  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  if (LinksArray.length > 0) {
    return (
      <>
        <MetaData path="u/dashboard/widgets" />
        <DashboardNavbar />
        <div className="widgets font-['Geist']">
          <h2 className="mt-8 text-6xl font-['Geist'] pt-[3.5rem] text-center md:pt-[2rem] md:text-7xl lg:pt-[1rem]">
            Widgets
          </h2>
          <div
            style={{ width: "100%", height: "auto" }}
            className="flex flex-row flex-wrap justify-evenly items-center gap-2"
          >
            {LinksArray.map((e, i) => {
              return (
                <SVGImageContainer
                  key={i}
                  height={null}
                  width={null}
                  link={e}
                />
              );
            })}
          </div>
          {LinksArray.length > 1 ? (
            <SVGImageContainer
              height={1000}
              width={6000}
              link={backendUrl + allSvgs}
            />
          ) : (
            <></>
          )}
          <HowToUse />
        </div>
      </>
    );
  } else
    return (
      <>
        <MetaData path="u/dashboard/widgets" />
        <DashboardNavbar />
        <div className="mt-[60px] w-full mx-auto h-full flex flex-col justify-center items-center gap-8 p-16">
          <h4 className="text-3xl">
            Add your contest data from the dashboard to access widgets
          </h4>
          <button
            className="btn sm:btn-sm md:btn-md lg:btn-lg bg-custom-blue text-[#fffff7]"
            onClick={() => navigate("/u/dashboard/ratings")}
          >
            Go to Dashboard
          </button>
        </div>
      </>
    );
}

const SVGImageContainer = ({ link, height, width }) => {
  const [show, setShow] = useState(false);
  const close_model = () => setShow(false);
  height = height | 300;
  width = width | 300;
  return (
    <div className="mt-10 flex flex-col items-center">
      <img src={link} alt="Loading" height={height} width={width} />
      <button
        className="mt-2 btn sm:btn-sm md:btn-md lg:btn-md bg-custom-blue text-[#fffff7]"
        onClick={() => setShow(true)}
      >
        Share Widget
      </button>
      {show && (
        <ShareModel contestLink={link} theme="" close_model={close_model} />
      )}
    </div>
  );
};

const HowToUse = () => {
  return (
    <div class="font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col phone:mt-16 gap-[1.2rem]">
      <h2 className="text-5xl text-center">How to use?</h2>
      <div className="m-[10px] flex flex-col w-auto p-[32px] m-[60px auto] rounded-[10px] border border-solid border-[black] shadow-[0px_2px_12px_white]">
        <ol className="pl-[50px] list-decimal">
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px] before:content-[''] before:block before:h-[42px] before:w-[42px] before:rounded-[50%] before:border-2 before:border-solid before:border-[#ddd] before:absolute before:top-[-9px] before:left-[-33px] before:border-[#0bad02]">
            <strong>Copy Link</strong>
            <p>Click on share widget button to copy the widget's link</p>
          </li>
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px] before:content-[''] before:block before:h-[42px] before:w-[42px] before:rounded-[50%] before:border-2 before:border-solid before:border-[#ddd] before:absolute before:top-[-9px] before:left-[-33px] before:border-[#2378d5]">
            <strong>Paste Link</strong>
            <p>
              Paste the link into &lt;img src=&quot;Your_copied_link_here"
              height=&quot;100%&quot; width&quot;100%&quot; /&gt;
            </p>
          </li>
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px] before:content-[''] before:block before:h-[42px] before:w-[42px] before:rounded-[50%] before:border-2 before:border-solid before:border-[#ddd] before:absolute before:top-[-9px] before:left-[-33px] before:border-[#0bad02]">
            <strong>Add in your readme</strong>
            <p>
              Now paste this img tag into any website you are making or you can
              also add this on your github readme.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
