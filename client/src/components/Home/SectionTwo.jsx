import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoCreateSharp } from "react-icons/io5";
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
} from "../MuiIcons";

// importing all the assets ...
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  codeforces,
  atcoder,
} from "../AllAssets";

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

export default function SectionTwo() {
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
    value = value.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        showOnWebsite: value,
      },
    }));
  };
  const clearDefaultText = (event, fieldName) => {
    const fieldValue = formData[fieldName].data;
    if (event.target.value === fieldValue) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          data: "",
        },
      }));
    }
  };

  return (
    <div className="max-md:mt-2 md:mt-24 flex justify-center p-2 min-h-screen min-xs:flex-col mx-auto w-11/12">
      <div className="h-5/6 dynamicprofile rounded-lg flex-col my-auto py-4 px-4 max-w-7xl lg:w-10/12">
        <div className="left text-center">
          <div className="sm:text-center max-sm:text-center">
            <motion.h2
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 90,
                delay: 0.5,
              }}
              className="max-md:text-4xl md:text-6xl font-['Geist'] my-0 text-white font-semibold"
            >
              Build your <span className="bg-digitomize-bg px-2 ">Dynamic</span>{" "}
              Profile
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 90,
                delay: 0.7,
              }}
              className="py-2 font-['Geist'] text-description max-md:text-sm md:text-xl"
            >
              Showcase your ratings, GitHub stats, personal info, skills,
              education, and more. Climb the leaderboard while enjoying friendly
              competition with friends in the coding community.
            </motion.p>
          </div>
        </div>
        <div className="lg:hidden mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-2">
          <div className="">
            <div className="mockup-browser border bg-base-300">
              <div className="mockup-browser-toolbar">
                <div
                  className="input text-custom-blue"
                  style={{ width: "fit-content" }}
                >
                  /u/profile
                </div>
              </div>
              <div className="flex flex-row px-4 py-4 bg-base-200">
                <div className="flex flex-col w-2/4">
                  <Avatar
                    src="@assets/hacker.png"
                    className="bg-custom-blue mb-2 self-center"
                    sx={{ padding: "6%", width: 40, height: 40 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                  />
                </div>
                <div className="flex flex-col w-2/4">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"100%"}
                    height={"60%"}
                    className="mx-2"
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"100%"}
                    height={"70%"}
                    className="mt-2 mx-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-lg:hidden">
          <div className="flex flex-col md:flex-row">
            <div className="mx-3 h-fit w-4/6 bg-window duration-500 rounded-xl pb-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 90,
                    delay: 0.8,
                  }}
                  className="flex flex-row bg-toolbar rounded-t-lg"
                >
                  <div className="flex gap-2 py-2 px-4 my-2">
                    <span className="rounded-full p-2 bg-[#C6B1FF]"></span>
                    <span className="rounded-full p-2 bg-[#AE92FF]"></span>
                    <span className="rounded-full p-2 bg-[#8D65FF]"></span>
                  </div>

                  <div className="bg-window text-[#B7B6FF] rounded-full text-sm tracking-wide flex justify-center w-full py-0.5 my-2 items-center">
                    <a className="py-1" href="/u/dashboard">
                      https://digitomize.com/u/dashboard
                    </a>
                  </div>
                  <div className="bg-window rounded-lg mx-2 my-2 px-1 py-1">
                    <p>+</p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 90,
                  delay: 0.8,
                }}
                className="flex-1 justify-start px-4 pt-4"
              >
                <div className="form-control w-3/4 max-w-md">
                  <Avatar
                    src="@assets/hacker.png"
                    className="bg-custom-blue mb-2"
                    sx={{ padding: "2%", width: 60, height: 60 }}
                  />
                  <label className="cursor-text select-text label">
                    <span className="select-text cursor-text label-text">
                      #include {"<"}
                      <span className="text-custom-blue">name</span>
                      {">"}
                    </span>
                  </label>

                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                    onFocus={(event) => clearDefaultText(event, "name")}
                    value={formData.name.data}
                  />

                  <label className="select-text cursor-text label">
                    <span className="select-text cursor-text label-text">
                      phone number
                      <Tooltip
                        title={
                          formData.phoneNumber.showOnWebsite
                            ? "showing on portfolio"
                            : "not showing on portfolio"
                        }
                        arrow
                        placement="top"
                      ></Tooltip>
                    </span>
                  </label>

                  <Switch
                    size="small"
                    inputProps={{ "aria-label": "controlled" }}
                    checked={formData.phoneNumber.showOnWebsite}
                    onChange={updateShowOnWebsite("phoneNumber")}
                  />
                  <input
                    name="phoneNumber"
                    type="Number"
                    placeholder="Your Number"
                    className="input input-bordered w-full max-w-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" // classes to remove arrows from number input
                    onChange={handleInputChangeObjData}
                    onFocus={(event) => clearDefaultText(event, "phoneNumber")}
                    value={formData.phoneNumber.data}
                  />

                  <label className="select-text cursor-text label">
                    <span className="select-text cursor-text label-text">
                      bio
                      <Tooltip
                        title={
                          formData.bio.showOnWebsite
                            ? "showing on portfolio"
                            : "not showing on portfolio"
                        }
                        arrow
                        placement="top"
                      >
                        <Switch
                          size="small"
                          inputProps={{ "aria-label": "controlled" }}
                          checked={formData.bio.showOnWebsite}
                          onChange={updateShowOnWebsite("bio")}
                        />
                      </Tooltip>
                    </span>
                  </label>
                  <textarea
                    name="bio"
                    className="textarea textarea-bordered h-24 max-h-60"
                    placeholder="about you"
                    onChange={handleInputChangeObjData}
                    onFocus={(event) => clearDefaultText(event, "bio")}
                    value={formData.bio.data}
                  ></textarea>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 90,
                delay: 0.8,
              }}
              className="mx-3 w-2/6 bg-window rounded-xl"
            >
              <h2 className="pt-2 pl-4 text-2xl text-['#E7E7FF']">Preview</h2>
              <div className="my-auto py-2 text-center flex flex-col justify-center items-center">
                <Avatar
                  draggable="false"
                  src="@assets/hacker.png"
                  className="bg-custom-blue mb-2 select-none"
                  sx={{ padding: "2%", width: 60, height: 60 }}
                />
                <p className="text-4xl font-semibold p-2">
                  {formData.name ? formData.name : "name"}{" "}
                </p>
                <p className="font-thin">
                  {formData.phoneNumber.showOnWebsite ? (
                    <>
                      <CallIcon fontSize="small" /> {formData.phoneNumber.data}
                    </>
                  ) : (
                    " "
                  )}
                </p>

                <p>{formData.bio.showOnWebsite ? formData.bio.data : " "}</p>
                <div className="socials space-x-3">
                  <LinkedInIcon sx={{ color: "#0077b5" }} />
                  <InstagramIcon sx={gradientStyles} fontSize="small" />
                  <GitHubIcon />
                </div>
                <div className="my-2 divider text-custom-blue">ratings</div>
                <div className="ratings">
                  <div className="flex flex-row items-center">
                    <div className="avatar">
                      <div className="w-4 mx-2">
                        <img src={platformsIcon[4]} draggable={false} />
                      </div>
                    </div>
                    <p>
                      15XX | <span style={{ color: "cyan" }}>specialist</span>
                    </p>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="avatar">
                      <div className="w-5 mx-2">
                        <img src={platformsIcon[3]} draggable={false} />
                      </div>
                    </div>
                    <p>
                      16XX |{" "}
                      <span style={{ color: "cyan" }}>
                        <span className="bg-green-600 text-white px-1 py-0 mr-1">
                          ★
                        </span>
                        <span className="bg-green-600 text-white px-1 py-0 mr-1">
                          ★
                        </span>
                        <span className="bg-green-600 text-white px-1 py-0 mr-1">
                          ★
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="my-2 divider text-custom-blue">github</div>
                <div className="github flex space-x-2">
                  <p>Pull-req: 70</p>
                  <p>issues: 15</p>
                  <p>commits: 100</p>
                </div>
                <div className="my-2 divider text-custom-blue">projects</div>
                <div className="projects flex-wrap justify-center flex">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"80px"}
                    height={"40px"}
                    className="mt-2 mx-2"
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"80px"}
                    height={"40px"}
                    className="mt-2 mx-2"
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"80px"}
                    height={"40px"}
                    className="mt-2 mx-2"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 90,
            delay: 0,
          }}
          className="flex justify-center m-4"
        >
          <a
            href="/signup"
            className="btn px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border "
          >
            <div className="flex justify-center items-center gap-1">
              Create Now
              <IoCreateSharp />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
