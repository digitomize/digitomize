import { useMemo } from "react";
import Card from "./globals/Card";
import "./css/Contests.css";
import comingSoonSvg from "@assets/comming_soon.svg";

function Contests({ contests, range }) {
  const contentDescription =
    "Discover upcoming coding contests on Digitomize and stay in the loop with the latest challenges. Join us, take part, and put your coding skills to the test!".toLowerCase();
  const queryData = useMemo(() => {
    return contests?.filter((data) => {
      if (data.duration >= range[0] && data.duration <= range[1]) return true;
    });
  }, [range, contests]);

  return (
    <>
      <div className="allContests scroll-smooth">
        <div
          className="allContests lg:justify-evenly md:justify-evenly sm:justify-center px-4"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {queryData.length == 0 ? (
            <>
              <div className="flex flex-col items-center justify-center mt-6 mb-12">
                <img
                  src={comingSoonSvg}
                  alt="not-found"
                  className="mb-4 mx-auto w-80 md:w-60 lg:w-80"
                />
                <h2 className="lg:text-3xl md:text-2xl text-xl text-center mx-auto">
                  No Contests Found
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
