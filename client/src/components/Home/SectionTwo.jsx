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
    <div className=" flex justify-center p-4 h-screen min-xs:flex-col overflow-auto m-2">
      <div className=" dynamicprofile rounded-lg flex-col my-auto py-8 px-10 max-w-7xl">
        <div className="left text-center">
          <div className="sm:text-left max-sm:text-center">
            <h2 className="text-6xl font-['Geist'] my-0 text-white font-semibold">
              Build your <span className="bg-digitomize-bg px-2">Dynamic</span>{" "}
              Profile
            </h2>
            <p className="py-6 font-['Geist'] text-description text-xl">
              Showcase your ratings, GitHub stats, personal info, skills,
              education, and more. Climb the leaderboard while enjoying friendly
              competition with friends in the coding community.
            </p>
          </div>
        </div>
        <div className="max-lg:hidden flex flex-col md:flex-row justify-center gap-20 md:gap-40 mt-10">
          <div className="mockup-browser bg-base-300 duration-500">
            <div className="mockup-browser-toolbar">
              <div style={{ marginLeft: "0px" }} className="ml-0 input">
                https://digitomize.com/dashboard
              </div>
            </div>
            <div className="flex-1 justify-start px-4 pt-4">
              <div className="form-control w-3/4 max-w-md">
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
                    import &quot;
                    <span className="text-custom-blue">socials</span>
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
          <div>
            <div>
              <div>
                <div className="justify-center mx-auto max-w-lg artboard artboard-demo">
                  <h2 className="pt-4 text-2xl">Preview</h2>
                  <div className="my-auto py-10 text-center flex flex-col justify-center items-center">
                    <Avatar
                      draggable="false"
                      src="/src/assets/hacker.png"
                      className="bg-custom-blue mb-2 select-none"
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
                          15XX |{" "}
                          <span style={{ color: "cyan" }}>specialist</span>
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
        <div className="flex justify-end m-8">
          <button className="px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75">
            <a href="/signup">Create Now</a>
          </button>
        </div>
      </div>
    </div>
  );
}
