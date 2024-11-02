import { useMemo } from "react";
import Card from "./Card";
import "../../css/Contests.css";

function Hackathons({ hackathons }) {
  const queryData = useMemo(() => {
    return hackathons;
  }, [hackathons]);

  return (
    <>
      <div className="allContests scroll-smooth">
        <div
          className="allContests lg:justify-evenly md:justify-evenly sm:justify-center px-4"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {queryData.map((hackathon) => (
            <Card hackathon={hackathon} key={hackathon.url} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hackathons;
