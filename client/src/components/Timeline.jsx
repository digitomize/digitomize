import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses
} from "@mui/lab";
import { useMediaQuery } from "@mui/material";
import { ms_startup_new, digitalocean } from "./AllAssets";
import TimelineComponent from "./TimelineComponent";
const data = [
  {
    title: "Sponsored by DigitalOcean",
    date: "November, 2023",
    description:
      "We're grateful for DigitalOcean's support, and we're excited to see what we can achieve together! With DigitalOcean's sponsorship, we'll be able to do even more to support the open source community. We'll be able to offer more resources to our users, and we'll be able to continue to develop and improve our platform.",
    img: digitalocean,
  },
  {
    title: "Microsoft for Startups Founders Hub",
    date: "August, 2023",
    description:
      " This is a major milestone for us, unlocking unprecedented access to Microsoft's resources and expertise. We're thrilled to collaborate with the Founders Hub community and leverage Microsoft's technology to empower businesses worldwide.",
    img: ms_startup_new,
  },
];

function MuiTimeline() {
  const matches = useMediaQuery('(max-width:1024px)')
  const phones=useMediaQuery('(max-width:640px)')

  return (
    <>
      <div className="translate-y-1 bg-[#05225C]  rounded-[2px] text-[20px] px-[20px] py-[4px] lg:mx-auto w-fit ">Now</div>
      <Timeline position={matches?'right':'alternate'} >
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ padding: "15px", display:`${matches ? 'none' : 'block'}`}} 
          ></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor: "#D59DFF",
                marginX: "15px",
                borderColor: "white",
                "&:hover": { bgcolor: "#0080FF" },
              }}
              variant="outlined"
            />
            <TimelineConnector sx={{ bgcolor: "#1582FF", marginX: "15px",height:`${phones? '100px' :'190px'}` }} />
          </TimelineSeparator>
          <TimelineContent
            sx={{ padding: "15px", marginBottom: "30px", transform:`${phones ?'translate(0%,0%)' : 'translate(0%,-50%)'}` }}
          ></TimelineContent>
        </TimelineItem>
       {
        data.map((data,index)=>{
         return <TimelineComponent data={data} index={index} key={index}></TimelineComponent>
        })
       }
        <TimelineItem>
          <TimelineOppositeContent sx={{ paddingX: "15px" , display:`${matches ? 'none' : 'block'}`}} ></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor: "#D59DFF",
                borderColor: "white",
                "&:hover": { bgcolor: "#0080FF" },
                marginX:'15px'
              }}
            />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
      <div className="text-center -translate-y-10 bg-[#05225C]  rounded-[2px] text-[20px] px-[20px] py-[4px] lg:mx-auto w-fit ">2023</div>
    </>
  );
}
export default MuiTimeline;
