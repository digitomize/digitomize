import { Element, Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { Skeleton } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { green, pink } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Switch from "@mui/material/Switch";

export default function Home2() {
  const [formData, setFormData] = useState({
    name: "pranshu",
    phoneNumber: {
      data: "1234567890",
      showOnWebsite: true,
    },
    bio: {
      data: "",
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
    <Element name="second">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col sm:flex-row">
          <div className="left sm:w-[40%] text-center">
            <div className="sm:text-left max-sm:text-center">
              <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium max-sm:min-h-[100px] sm:min-h-[300px]">
                <Typewriter
                  options={{ delay: 100 }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(`User Portfol`)
                      .pauseFor(100)
                      .deleteChars(7)
                      .typeString(
                        `<span class="text-custom-blue font-bold">dynamic </span> portfolio`
                      )
                      // .typeString("Welcomes You")
                      .start();
                  }}
                />
              </h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="sm:hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-2">
              <div className="">
                <div className="mockup-browser border bg-base-300">
                  <div className="mockup-browser-toolbar">
                    <div
                      className="input text-custom-blue"
                      style={{ width: "fit-content" }}
                    >
                      digitomize.com/profile
                    </div>
                  </div>
                  <div className="flex flex-row px-4 py-4 bg-base-200">
                    <div className="flex flex-col w-2/4">
                      {/* <TagFacesIcon fontSize="large" /> */}
                      <Avatar
                        src="/src/assets/hacker.png"
                        className="bg-custom-blue mb-2 self-center"
                        sx={{ padding: "6%", width: 40, height: 40 }}
                      />
                      {/* <Skeleton
                      sx={{ bgcolor: "grey.600" }}
                      variant="circular"
                      width={40}
                      height={40}
                    /> */}
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
            <button
              data-theme="mytheme"
              className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue animate-bounce mt-4 hover:animate-none hover:scale-110"
            >
              Create now
            </button>
          </div>
          <div className="max-sm:hidden w-[60%] right items-end sm:flex flex-col relative min-h-[65vh]">
            <div className="mockup-browser border bg-base-300 w-full absolute h-fit duration-500 hover:scale-125">
              <div className="mockup-browser-toolbar">
                <div style={{ marginLeft: "0px" }} className="ml-0 input ml-0">
                  https://digitomize.com/dashboard
                </div>
              </div>
              <div className="flex justify-start px-4 py-4 bg-base-200 h-full">
                <div className="form-control w-2/4 max-w-xs">
                  <Avatar
                    src="/src/assets/hacker.png"
                    className="bg-custom-blue mb-2"
                    sx={{ padding: "2%", width: 60, height: 60 }}
                  />
                  <label className="label">
                    <span className="label-text">What is your name?</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                  <label className="label">
                    <span className="label-text">
                      phone number
                      <Switch
                        size="small"
                        inputProps={{ "aria-label": "controlled" }}
                        checked={formData.phoneNumber.showOnWebsite}
                        onChange={updateShowOnWebsite("phoneNumber")}
                      />
                    </span>
                  </label>
                  <input
                    name="phoneNumber"
                    type="Number"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChangeObjData}
                    value={formData.phoneNumber.data}
                  />
                  <label className="label">
                    <span className="label-text">
                      bio
                      <Switch
                        size="small"
                        inputProps={{ "aria-label": "controlled" }}
                        checked={formData.bio.showOnWebsite}
                        onChange={updateShowOnWebsite("bio")}
                      />
                    </span>
                  </label>
                  <textarea
                    name="bio"
                    className="textarea textarea-bordered h-24"
                    placeholder="Bio"
                    onChange={handleInputChangeObjData}
                    value={formData.bio.data}
                  ></textarea>
                </div>
                <div className="flex flex-col w-2/4">
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"33%"}
                    className="mt-2 mx-2"
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"33%"}
                    className="mt-2 mx-2"
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.600" }}
                    width={"90%"}
                    height={"33%"}
                    className="mt-2 mx-2"
                  />
                </div>
              </div>
            </div>
            <div className="mockup-phone border-custom-blue me-0 absolute top-20 -right-24 skew-y-3 border-y-8 border-e-8 border-s-2">
              <div className="camera"></div>
              <div className="display">
                <div className="h-fit max-h-[500px] max-w-[260px] artboard artboard-demo phone-1">
                  <div className="text-center flex flex-col justify-center items-center">
                    <Avatar
                      src="/src/assets/hacker.png"
                      className="bg-custom-blue mb-2"
                      sx={{ padding: "2%", width: 60, height: 60 }}
                    />
                    {formData.name}
                    <br />
                    {formData.phoneNumber.showOnWebsite
                      ? formData.phoneNumber.data
                      : " "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
