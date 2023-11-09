import { Element } from "react-scroll";
import { useState } from "react";

// Importing all MUI icons here...
import {
  Skeleton,
  Tooltip,
  Avatar,
  Switch,
  CallIcon,
  LinkedInIcon,
  InstagramIcon,
  GitHubIcon,
} from "./MuiIcons";

// importing all the assets ...
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  codeforces,
  atcoder,
} from "./AllAssets";


const gradientStyles = {
  background:
    "radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%);",
  color: "black",
};

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
  atcoder,
];
const platforms = [
  "leetcode",
  "codingninjas",
  "geeksforgeeks",
  "codechef",
  "codeforces",
  "atcoder",
];

export default function Home2() {
  const [formData, setFormData] = useState({
    name: "pranshu",
    phoneNumber: {
      data: "1234567890",
      showOnWebsite: true,
    },
    bio: {
      data: "heyy im pranshu",
      showOnWebsite: true,
    },
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        data: value,
      },
    }));
  };
  const updateShowOnWebsite = (field) => (value) => {
    console.log(`field: ${field}, value: ${value}`);
    console.log(value.target.checked);
    value = value.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        showOnWebsite: value,
      },
    }));
  };

  return (
    <Element name="third">
      <div className="hero min-h-screen">
        <div className="text-center">

          <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium max-sm:min-h-[100px] sm:min-h-[300px]">
            upcoming <span class="text-custom-blue font-bold">contest</span>{" "}
            list
          </h1>
          <a href="/contests">
            <button
              data-theme="mytheme"
              className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue mt-12 hover:animate-none hover:scale-110"
            >
              explore
            </button>
          </a>
        </div>
      </div>
    </Element>
  );
}
