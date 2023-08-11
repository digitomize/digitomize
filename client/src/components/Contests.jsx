import Card from './Card';
import './css/Contests.css'
function Contests({ contests }) {
  return (
    <>
    <div className="allContests">
    {/* <h2>Contests</h2> */}
      <div className="allContests" style={{display:'flex', flexWrap:'wrap', gap:'0.5%', justifyContent:'space-evenly'}}>
        {contests.map((contest) => (
          <Card key={contest.vanity} contest={contest} />
        ))}
      </div>
      </div>
    </> 
  );
}

export default Contests;
