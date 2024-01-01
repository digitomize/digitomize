import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
function TimelineComponent({ data, index }) {
  const matches = useMediaQuery("(max-width:1024px)");
  const phones = useMediaQuery("(max-width:640px)");
  const text = data.description;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded ? text : text.slice(0, 100)
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ paddingX: "15px", display: `${matches ? "none" : "block"}` }}
      >
        {data.date}
      </TimelineOppositeContent>
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
        <TimelineConnector sx={{ bgcolor: "#1582FF", marginX: "15px" }} />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          paddingX: "15px",
          paddingY: "20px",
          transform: `${phones ? "translate(0%,0%)" : "translate(0%,-50%)"}`,
          marginBottom: "30px",
          bgcolor: "#05225C",
        }}
      >
        <h2 className="lg:hidden text-[14px] mb-1 text-description">
          {data.date}
        </h2>
        <h2 className="mb-[12px] text-[20px] font-outfit">{data.title}</h2>
        <div className="flex flex-row justify-center gap-x-3 items-center">
          <img
            src={data.img}
            alt=""
            className={`${
              index % 2 === 0 || matches ? "" : "hidden "
            } max-sm:hidden`}
          />
          <p className="text-left  text-[14px] max-sm:hidden font-outfit">
            {data.description}
          </p>
          <img
            src={data.img}
            alt=""
            className={`${
              index % 2 !== 0 && !matches ? "" : "hidden"
            } max-sm:hidden`}
          />
          <p className="sm:hidden">
            {truncatedText}{" "}
            <button
              onClick={toggleReadMore}
              className="text-blue-500 cursor-pointer sm:hidden focus:outline-none"
            >
              {isExpanded ? "show less" : "show more"}
            </button>
          </p>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
}

export default TimelineComponent;
