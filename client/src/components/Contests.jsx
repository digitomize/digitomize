import Card from './Card';
import './css/Contests.css'
function Contests({ contests }) {
  return (
    <>
    <div className="allContests scroll-smooth">
    {/* <h2>Contests</h2> */}
        <div className="allContests lg:justify-evenly md:justify-evenly sm:justify-center" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {contests.map((contest) => (
          <Card key={contest.vanity} contest={contest} />
         
        ))}
      </div>
      </div>
    </> 
  );
}

export default Contests;
