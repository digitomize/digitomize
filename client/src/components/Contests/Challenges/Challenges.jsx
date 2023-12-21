import { useMemo } from "react";
import Card from "./Card";
import "../../css/Contests.css";
import { Helmet } from "react-helmet";

function Contests({ contests, range }) {
  const contentDescription =
    "Discover upcoming coding contests on Digitomize and stay in the loop with the latest challenges. Join us, take part, and put your coding skills to the test!".toLowerCase();
  // const queryData = useMemo(() => {
  //   return contests?.filter((data) => {
  //     if (data.duration >= range[0] && data.duration <= range[1]) return true;
  //   });
  // }, [range, contests]);
  const queryData = [
    {
      "host": "quine",
      "name": "Quest 005: Developer Tools",
      "vanity": "quest005",
      "url": "https://quine.sh/quests/creator?questId=5&utm_source=digitomize&ref=digitomize",
      "startTimeUnix": 1702987200,
      "duration": 50400,
      "prize":"Total Prize Pot: 2048 USD",
    },
    {
      "host": "tublian",
      "name": "Build a RAG application using LLM",
      "vanity": "tublian-303",
      "url": "https://www.tublian.com/challenge/303",
      "startTimeUnix": 1703026800,
      "duration": 43200,
      "prize":"Special Prize + Tublian Merch",
    },
    
  ]

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
        <p className="mx-auto text-center mt-4 text-xl">
              Want challenges from more platforms?{" "} Join our <a href="https://digitomize.com/discord" target="_blank" rel="noopener noreferrer" className="text-blue-500">Discord</a> and let us know!
          </p>
      </div>
    </>
  );
}

export default Contests;
