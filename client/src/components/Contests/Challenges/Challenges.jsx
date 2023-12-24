import { useMemo } from "react";
import Card from "./Card";
import "../../css/Contests.css";
import { Helmet } from "react-helmet";
import formbricks from "@formbricks/js";
import query from "./query.json";
import { MetaData } from "../../CustomComponents";

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
          
          {queryData.map((contest) => (
            <Card key={contest.vanity} contest={contest} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Contests;
