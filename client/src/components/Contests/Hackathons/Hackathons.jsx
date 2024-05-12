import { useMemo } from "react";
import Card from "./Card";
import "../../css/Contests.css";

function Hackathons({ hackathons }) {
  const queryData = useMemo(() => {
    return hackathons;
  }, [hackathons]);

  return (
    <>
      <div className="noCursor allContests scroll-smooth">
        <div
          className="noCursor allContests lg:justify-evenly md:justify-evenly sm:justify-center px-4"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {queryData.map((hackathon) => (
            <Card hackathon={hackathon} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hackathons;
