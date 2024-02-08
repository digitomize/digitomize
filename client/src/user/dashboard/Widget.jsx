import { MetaData } from "../../components/CustomComponents";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShareModel from "../../components/share_model";
import LoadingScreen from "../../components/globals/LoadingScreen";
import { userDashboardDetails } from "../../../api";
import { userProfileDetails } from "../../../api";

export default function Widget() {
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
        <HowToUse />
        <div className="widgets font-['Geist']  w-full">
          <h2 className="mt-4 text-[40px] -mb-8 max-sm:text-2xl font-bold normal-case text-white pt-[3.5rem] text-center md:pt-[2rem]  lg:pt-[1rem]">
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
        </div>
      </>
    );
  } else
    return (
      <>
        <MetaData path="u/dashboard/widgets" />
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
        className="mt-2 btn sm:btn-sm max-sm:px-3 max-sm:py-2 md:btn-md lg:btn-md bg-custom-blue text-[#fffff7]"
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
    <div class="font-['Geist'] items-center flex flex-col gap-[1.2rem]">
      <h2 className="text-[40px] max-sm:text-2xl font-bold normal-case text-white">How to use?</h2>
      <div className="sm:m-[10px] bg-cardsColor max-sm:m-4 flex flex-col items-center w-auto p-[32px]  rounded-[10px] border border-solid border-[black] shadow-[0px_2px_12px_white]">
        <ol className="pl-[50px]  list-decimal text-base">
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px] ">
            <strong>Copy Widget Link</strong>
            <p>To obtain the link for the widget, select the 'Share Widget' button.</p>
          </li>
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px] ">
            <strong>Paste the Link</strong>
            <p>
              Paste the copied link within the following HTML tag: <br />
              {`<img src="Your_copied_link_here" height="100%" width"100%" />`}
            </p>
          </li>
          <li className="font-['Geist'] pl-[16px] mt-[24px] relative text-base leading-[20px]">
            <strong>Integration into Your Readme/ Website</strong>
            <p>
              Integrate the provided {'<img>'} tag into your website's codebase or include it within your GitHub readme for seamless integration.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
