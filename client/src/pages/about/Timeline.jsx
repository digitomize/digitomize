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
    title: "Reached 1000+ Users Milestone",
    date: "1 Apr, 2024",
    description:
      "Celebrating a milestone of 1000+ users! Thank you for your support and for being part of our community.",
    img: "",
  },
  {
    title: "Google for Startups Cloud Program",
    date: "29 Mar, 2024",
    description:
      "We extend our heartfelt gratitude to Google for Startups Cloud Program for their generous sponsorship. Their support will, without a doubt, help us deliver a better service to the community.",
    img: "",
  },
  {
    title: "Netlify Sponsored Pro Plan for Open Source",
    date: "12 Feb, 2024",
    description:
      "We thank Netlify for sponsoring us. Their support fuels our endeavors, enabling us to innovate and elevate our digital presence with seamless deployment and hosting solutions.",
    img: "",
  },
  {
    title: "1000+ LinkedIn followers",
    date: "7 Feb, 2024",
    description:
      "We're deeply grateful for the milestone of reaching 1000+ followers on LinkedIn!",
    img: "",
  },
  {
    title: "Reached 700+ Users Milestone",
    date: "28 Jan, 2024",
    description:
      "Yay! We have reached 700+ users milestone. We are grateful for your support and we will continue to work hard.",
    img: "",
  },
  {
    title: "Reached 300+ Stars Milestone",
    date: "27 Jan, 2024",
    description:
      "Thanks for the love and support!",
    img: "",
  },
  {
    title: "Reached 500+ Users Milestone",
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
