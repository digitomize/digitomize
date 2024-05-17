import { useMemo } from "react";
import Card from "./Card";
import "../../css/Contests.css";
import { Helmet } from "react-helmet";
import formbricks from "@formbricks/js";
import query from "./query.json";
import { MetaData } from "../../CustomComponents";
import comingSoonSvg from "@assets/comming_soon.svg";

const handleClick = () => {
  formbricks.track("test-01");
};

function Contests({ contests, range }) {
  const contentDescription =
    "Discover upcoming coding contests on Digitomize and stay in the loop with the latest challenges. Join us, take part, and put your coding skills to the test!".toLowerCase();
  // const queryData = useMemo(() => {
  //   return contests?.filter((data) => {
  //     if (data.duration >= range[0] && data.duration <= range[1]) return true;
  //   });
  // }, [range, contests]);
  const queryData = query;

  return (
    <>
      <MetaData path="challenges" />
      <div className="allContests scroll-smooth">
        <p className="mx-auto text-center mt-4 text-xl">
              Want challenges from more platforms?{" "} Join our <a href="https://digitomize.com/discord" target="_blank" rel="noopener noreferrer" className="text-digitomize-bg">Discord</a> or <button className="text-digitomize-bg" onClick={handleClick}>
            click here
            </button> and let us know!
        </p>
        <div
          className="allContests lg:justify-evenly md:justify-evenly sm:justify-center px-4"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {queryData.length == 0 ? (
            <>
              <div className="flex flex-col items-center justify-center mt-6 mb-12">
                <img src={comingSoonSvg} alt="not-found" className="mb-4 mx-auto w-80 md:w-60 lg:w-80" />
                <h2 className="lg:text-3xl md:text-2xl text-xl text-center mx-auto">
                  No Challenges Found
                </h2>
              </div>
            </>
          ) : (
            <>
              {queryData.map((contest) => (
                <Card key={contest.vanity} contest={contest} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Contests;
