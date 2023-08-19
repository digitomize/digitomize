import Card from './Card';
import './css/Contests.css'
function Contests({ contests }) {
  return (
    <>
    <div className="allContests scroll-smooth">
    {/* <h2>Contests</h2> */}
      <div className="allContests" style={{display:'flex', flexWrap:'wrap', gap:'1.8%', justifyContent:'center'}}>
        {contests.map((contest) => (
          <Card key={contest.vanity} contest={contest} />
         
        ))}
      </div>
      </div>
    </> 
  );
}

export default Contests;
