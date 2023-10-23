import { useMemo } from "react";
import Card from "./Card";
import "./css/Contests.css";
function Contests({ contests, range }) {
  const queryData = useMemo(() => {
    return contests?.filter((data) => {
      if (data.duration >= range[0] && data.duration <= range[1]) return true;
    });
  }, [range, contests]);
  return (
    <>
      <div className="allContests scroll-smooth">
        <div
          className="allContests lg:justify-evenly md:justify-evenly sm:justify-center"
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
