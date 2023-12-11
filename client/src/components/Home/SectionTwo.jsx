import { Element, Link as Linkto } from "react-scroll";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <Element
        name="second"
        className="hero min-h-screen bg-base-200 flex flex-col"
      >
        <div className="hero-content flex-col sm:flex-row my-auto">
          <div className="left sm:w-[40%] text-center">
            <div className="sm:text-left max-sm:text-center">
              <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium max-sm:min-h-[100px] sm:min-h-[300px]">
                User <span className="text-custom-blue font-bold">Dynamic</span>{" "}
                Portfolio
              </h1>
              <p className="py-6 font-['Source Code Pro'] text-xl">
                Showcase your ratings, GitHub stats, personal info, skills,
                education, and more. Climb the leaderboard while enjoying
                friendly competition with friends in the coding community.
              </p>
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
                        src="/src/assets/hacker.png"
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
            <Link to="/signup">
              <button
                data-theme="mytheme"
                className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue mt-12 hover:animate-none hover:scale-110"
              >
                Create now
              </button>
            </Link>
          </div>
          <div className="max-lg:hidden w-[60%] right items-end flex-col relative min-h-[65vh]">
            <div className="mockup-browser border bg-base-300 w-full absolute h-fit duration-500">
              <div className="mockup-browser-toolbar">
                <div style={{ marginLeft: "0px" }} className="ml-0 input">
                  https://digitomize.com/dashboard
                </div>
              </div>
              <div className="flex justify-start px-4 py-4 bg-base-200">
                <div className="form-control w-2/4 max-w-xs">
                  <Avatar
                    src="/src/assets/hacker.png"
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
                    placeholder="your name"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                    value={formData.name}
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
                      >
                        <Switch
                          size="small"
                          inputProps={{ "aria-label": "controlled" }}
                          checked={formData.phoneNumber.showOnWebsite}
                          onChange={updateShowOnWebsite("phoneNumber")}
                        />
                      </Tooltip>
                    </span>
                  </label>
                  <input
                    name="phoneNumber"
                    type="Number"
                    placeholder="your number"
                    className="input input-bordered w-full max-w-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" // classes to remove arrows from number input
                    onChange={handleInputChangeObjData}
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
                    value={formData.bio.data}
                  ></textarea>
                </div>
                <div className="flex flex-col w-2/4">
                  <label className="label mx-2">
                    <span className="label-text">
                      import &quot;<span className="text-custom-blue">socials</span>
                      &quot;
                    </span>
                  </label>
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"30%"}
                    className="mt-2 mx-2"
                  />
                  <label className="label mx-2">
                    <span className="label-text">
                      fetch{`("`}
                      <span className="text-custom-blue">ratings</span>
                      {`");`}
                    </span>
                  </label>
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"30%"}
                    className="mt-2 mx-2"
                  />
                  <label className="label mx-2">
                    <span className="label-text">
                      <span className="text-custom-blue">github</span>
                    </span>
                  </label>
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"30%"}
                    className="mt-2 mx-2"
                  />
                </div>
              </div>
            </div>
            <div className="mockup-phone border-custom-blue me-0 absolute top-16 -right-24 skew-y-3 border-y-8 border-e-8 border-s-2">
              <div className="camera"></div>
              <div className="display">
                <div className="w-fit mockup-browser">
                  <div
                    className="mt-12 mockup-browser-toolbar max-w-[250px]"
                    style={{ marginTop: "10%" }}
                  >
                    <div
                      style={{ marginLeft: "0px" }}
                      className="input ml-0 w-fit overflow-x-auto"
                    >
                      https://digitomize.com
                    </div>
                  </div>
                  <div className="justify-start h-fit max-h-[55vh] max-w-[250px] artboard artboard-demo phone-1 overflow-y-auto">
                    <div className="my-12 text-center flex flex-col justify-center items-center">
                      <Avatar
                        src="/src/assets/hacker.png"
                        className="bg-custom-blue mb-2"
                        sx={{ padding: "2%", width: 60, height: 60 }}
                      />
                      <p className="text-4xl font-semibold p-2">
                        {formData.name ? formData.name : "name"}{" "}
                      </p>
                      <p className="font-thin">
                        {formData.phoneNumber.showOnWebsite ? (
                          <>
                            <CallIcon fontSize="small" />{" "}
                            {formData.phoneNumber.data}
                          </>
                        ) : (
                          " "
                        )}
                      </p>

                      <p>
                        {formData.bio.showOnWebsite ? formData.bio.data : " "}
                      </p>
                      <div className="socials">
                        <LinkedInIcon sx={{ color: "#0077b5" }} />
                        <InstagramIcon sx={gradientStyles} fontSize="small" />
                        <GitHubIcon />
                      </div>
                      <div className="my-2 divider text-custom-blue">
                        ratings
                      </div>
                      <div className="ratings">
                        <div className="flex flex-row items-center">
                          <div className="avatar">
                            <div className="w-4 mx-2">
                              <img src={platformsIcon[4]} />
                            </div>
                          </div>
                          <p>
                            15XX |{" "}
                            <span style={{ color: "cyan" }}>specialist</span>
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="avatar">
                            <div className="w-5 mx-2">
                              <img src={platformsIcon[3]} />
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
                      <div className="my-2 divider text-custom-blue">
                        github
                      </div>
                      <div className="github">
                        <p>Pull-req: 70</p>
                        <p>issues: 15</p>
                        <p>commits: 100</p>
                      </div>
                      <div className="my-2 divider text-custom-blue">
                        projects
                      </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Linkto to="third">
          <div className="lower text-center animate-bounce">
            <div className="indicator pt-4">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Linkto>
      </Element>
  );
}
