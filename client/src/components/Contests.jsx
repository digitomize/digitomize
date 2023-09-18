import Card from "./Card";
import "./css/Contests.css";
import { Helmet } from "react-helmet";

function Contests({ contests }) {
  const contentDescription = `Discover upcoming coding contests on Digitomize and stay in the loop with the latest challenges. Join us, take part, and put your coding skills to the test!`.toLowerCase();
  return (
    <>
      <Helmet>
        <title>contests | digitomize</title>
        <meta property="og:title" content="contests | digitomize"/>
        <meta property="og:description" content={contentDescription} />
        <meta name="description" content={contentDescription} />
      </Helmet>
      <div className="allContests">
        {/* <h2>Contests</h2> */}
        <div
          className="allContests"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5%",
            justifyContent: "space-evenly",
          }}
        >
          {contests.map((contest) => (
            <Card key={contest.vanity} contest={contest} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Contests;
