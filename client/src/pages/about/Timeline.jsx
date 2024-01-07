import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { TfiStatsUp } from "react-icons/tfi";
import { useMediaQuery } from "@mui/material";
import { ms_startup_new, digitalocean, gitbook } from "./assets/assets";
import TimelineComponent from "./TimelineComponent";
const data = [
  {
    title: "Reached 500 Users Milestone",
    date: "1 Jan, 2024",
    description:
      "We appreciate your support and remain committed to delivering the highest quality service.",
    img: "",
  },
  {
    title: "Achieved 200+ Stars on Github",
    date: "28 Dec, 2023",
    description:
      "Thank you for the overwhelming support with 200+ stars on Github. We are grateful and committed to delivering the best service possible.",
    img: "",
  },
  {
    title: "Sponsored by DigitalOcean",
    date: "19 Dec, 2023",
    description:
      "We're grateful for DigitalOcean's support, and we're excited to see what we can achieve together! With DigitalOcean's sponsorship, we'll be able to do even more to support the open source community. We'll be able to offer more resources to our users, and we'll be able to continue to develop and improve our platform.",
    img: digitalocean,
  },
  {
    title: "Achieved 100+ Stars on Github",
    date: "16 Dec, 2023",
    description:
      "Thanks to 100+ stars on Github. We are grateful for your support and we will continue to work hard to provide you with the best service possible.",
    img: "",
  },
  {
    title: "Microsoft for Startups Founders Hub",
    date: "28 Nov, 2023",
    description:
      " This is a major milestone for us, unlocking unprecedented access to Microsoft's resources and expertise. We're thrilled to collaborate with the Founders Hub community and leverage Microsoft's technology to empower businesses worldwide.",
    img: ms_startup_new,
  },
  {
    title: "Supported by GitBook",
    date: "27 Nov, 2023",
    description:
      "We are grateful for GitBook's support, and we're excited to see what we can achieve together! With GitBook's sponsorship, we'll be able to do even more to support the open source community. We'll be able to offer more resources to our users, and we'll be able to continue to develop and improve our platform.",
    img: gitbook,
  },
  {
    title: "Achieved 500+ Followers on Linkedin",
    date: "20 Nov, 2023",
    description:
      "Thanks to 500+ followers on Linkedin. We are grateful for your support and we will continue to work hard to provide you with the best service possible.",
    img: "",
  },
];

function MuiTimeline() {
  const matches = useMediaQuery("(max-width:1024px)");
  const phones = useMediaQuery("(max-width:640px)");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[new Date().getMonth()];
  const year = new Date().getFullYear();

  return (
    <>
      <div className="translate-y-1 bg-[#05225C]  rounded-[2px] text-[20px] px-[20px] py-[4px] lg:mx-auto w-fit ">{month} {year}</div>
      <Timeline position={matches?"right":"alternate"} >
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ padding: "15px", display:`${matches ? "none" : "block"}`}} 
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
            <TimelineConnector sx={{ bgcolor: "#1582FF", marginX: "15px",height:`${phones? "100px" :"190px"}` }} />
          </TimelineSeparator>
          <TimelineContent
            sx={{ padding: "15px", marginBottom: "30px", transform:`${phones ?"translate(0%,0%)" : "translate(0%,-50%)"}` }}
          ></TimelineContent>
        </TimelineItem>
       {
        data.map((data,index)=>{
         return <TimelineComponent data={data} index={index} key={index}></TimelineComponent>;
        })
       }
        <TimelineItem>
          <TimelineOppositeContent sx={{ paddingX: "15px" , display:`${matches ? "none" : "block"}`}} ></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor: "#D59DFF",
                borderColor: "white",
                "&:hover": { bgcolor: "#0080FF" },
                marginX:"15px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
      <div className="text-center -translate-y-10 bg-[#05225C] rounded-[2px] text-[20px] px-[20px] py-[4px] lg:mx-auto w-fit ">Aug 2023</div>
    </>
  );
}
export default MuiTimeline;
