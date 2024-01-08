import { MetaData } from "../../components/CustomComponents";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import ShareModel from "../../components/share_model";
import LoadingScreen from "../../components/globals/LoadingScreen";
import { userDashboardDetails } from "../../../api";

export default function UserDashWidgets() {
  const [loading, setLoading] = useState(true);
  const [ImagesArray, setImagesArray] = useState([]);
  const [backendUrl,setBackendUrl] = useState("");
  const navigate = useNavigate();

  let ratingsData = null;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          ratingsData = res.data.ratings;
          // console.log(res.data.personal_data?.username);
          setBackendUrl(import.meta.env.VITE_REACT_APP_BACKEND_URL +
            "/user/ratings/"+res.data.personal_data.username+"?");
          console.log("here: ",backendUrl);
          for (const rating in ratingsData) {
            if (ratingsData[rating].data)
              setImagesArray((arr) => {
                let newArr = [...arr];
                if(!newArr.includes(rating))
                  newArr.push(rating);
                return newArr;
              });
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      setImagesArray([]);
    }
  }, [backendUrl]);
  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  if (ImagesArray.length > 0) {
    let allSvgs = "";
    ImagesArray.forEach((e) => (allSvgs += e + "=1&"));
    return (
      <>
        <MetaData path="u/dashboard/widgets" />
        <DashboardNavbar />
        <div
          style={{ width: "100%", height: "auto" }}
          className="mt-[60px] flex flex-row flex-wrap justify-center items-center gap-2"
        >
          {ImagesArray.map((e,i) => {
            return (
              <SVGImageContainer key={i}
                height={null}
                width={null}
                link={backendUrl + "" + e + "=1&"}
              />
            );
          })}
        </div>
        {ImagesArray.length > 1 ? (
          <SVGImageContainer
            height={3000}
            width={10000}
            link={backendUrl + allSvgs}
          />
        ) : (
          <></>
        )}
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
  height = height ? height : 500;
  width = width | 500;
  return (
    <div className="mt-10 flex flex-col items-center">
      <img src={link} alt="Loading" height={height} width={width} />
      <button
        className="btn sm:btn-sm md:btn-md lg:btn-lg bg-custom-blue text-[#fffff7]"
        onClick={() => setShow(true)}
      >
        Share Link
      </button>
      {show && (
        <ShareModel contestLink={link} theme="" close_model={close_model} />
      )}
    </div>
  );
};
