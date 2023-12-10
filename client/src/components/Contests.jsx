import { useMemo } from "react";
import Card from "./globals/Card";
import "./css/Contests.css";
import { Helmet } from "react-helmet";

function Contests({ contests, range }) {
  const contentDescription =
    `Discover upcoming coding contests on Digitomize and stay in the loop with the latest challenges. Join us, take part, and put your coding skills to the test!`.toLowerCase();
  const queryData = useMemo(() => {
    return contests?.filter((data) => {
      if (data.duration >= range[0] && data.duration <= range[1]) return true;
    });
  }, [range, contests]);

  return (
    <>
      <Helmet>
        <title>contests | digitomize</title>
        <meta property="og:title" content="contests | digitomize" />
        <meta property="og:description" content={contentDescription} />
        <meta name="description" content={contentDescription} />
      </Helmet>
      <div className="allContests scroll-smooth">
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
