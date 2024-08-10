import { Form, useLoaderData } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import { submitUserFormData, userDashboardDetails } from "../../../api";

import { useUserAuth } from "@context/UserAuthContext";
import axios from "axios";
// import { toast } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import Checkbox from "../components/Checkbox";
// import NewNavbar from "../../components/globals/NewNavbar";
import { ToastContainer, toast } from "react-toastify";
import { MetaData } from "@components/CustomComponents";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { styled } from "@mui/material/styles";
import ImageUploader from "@components/ImageUploader";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { uniqueToast } from "../../core/utils/unique-toast";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export async function loader() {
  try {
    const res = await userDashboardDetails();
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function UserDashPersonal() {
  const { personal_data, social } = useLoaderData();
  const [newSkill, setNewSkill] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const toastId = uniqueToast();
  const [skillData, setskillData] = useState(
    personal_data.skills.map((skill, index) => ({
      key: index, // Use the index as the key
      label: skill,
    })),
  );

  const handleDelete = (chipToDelete) => () => {
    setskillData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
  };
  const handleAdd = (e) => {
    e.preventDefault();

    if (newSkill.trim() !== "") {
      if (newSkill.length > 25) {
        toast.error("Length exceeding 25 characters",{
          toastId
        });
        return;
      }
      setskillData((prevSkills) => [
        ...prevSkills,
        {
          key: prevSkills.length
            ? prevSkills[prevSkills.length - 1].key + 1
            : 0,
          label: newSkill,
        },
      ]);
      setNewSkill("");
    }
  };
  const btnRef = useRef();

  useEffect(() => {
    // This code will run after setSkillData has completed

    if (skillData.length > 5) {
      toast.error("You cannot add more than 5 skills", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: toastId
      });
      skillData.pop();
      btnRef.current.disabled = true;
    } else {
      btnRef.current.disabled = false;
    }
    setFormData((prevData) => ({
      ...prevData,
      skills: skillData.map((data) => data.label) || [],
    }));
  }, [skillData, btnRef]);

  const [formData, setFormData] = useState({
    username: personal_data.username,
    name: personal_data.name || "",
    resume: personal_data.resume || "",
    picture: personal_data.picture,
    phoneNumber: {
      data: personal_data.phoneNumber.data || "",
      showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
    },
    dateOfBirth: {
      data: personal_data.dateOfBirth.data || "",
      showOnWebsite: personal_data.dateOfBirth.showOnWebsite || true,
    },
    bio: {
      data: personal_data.bio.data || "",
      showOnWebsite: personal_data.bio.showOnWebsite || true,
    },
    skills: skillData.map((data) => data.label) || [],
    education: personal_data.education || [],
    social: {
      linkedin: social?.linkedin || null,
      twitter: social?.twitter || null,
      instagram: social?.instagram || null,
    },
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      education: value.split(","),
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
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        showOnWebsite: value,
      },
    }));
  };
  const handleSocialChange = (event) => {
    const { name, value } = event.target;

    // Update the formData.social state based on the name of the input field
    setFormData((prevData) => ({
      ...prevData,
      social: {
        ...prevData.social,
        [name]: value,
      },
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true);
    const res = await submitUserFormData(formData)
      .then(() => {
        toast.success("updated successfully!", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: toastId
        });
        setIsDisabled(false);
      })
      .catch((err) => {
        setIsDisabled(false);
        toast.error(err.response.data.message, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: toastId
        });
        console.error(err);
      });

    // console.log(res);
  }

  return (
    <>
      <MetaData path="u/dashboard/account" />
      <ToastContainer />
      <DashboardNavbar />
      {/* <div className="px-8 md:ps-12 py-12 pt-24 w-11/12 mx-auto"> */}
      <div className="phone:mt-12 max-phone:mt-24 py-4 w-11/12 mx-auto">
        <div className="mockup-browser border bg-base-300">
          <div className="mockup-browser-toolbar">
            <div className="input" style={{ marginLeft: "0" }}>
              {"#include {digitomize} > {personal}"}
            </div>
          </div>

          <div className="bg-base-200 w-full p-8">
            <div className="grid md:grid-cols-2 mx-auto">
              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center ">
                <div className="form-control w-full   max-w-lg   ">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text"> name</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      maxLength={25}
                      onChange={handleInputChange}
                      required
                      className="input input-bordered w-full  "
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3 ">
                <div className="form-control w-full max-w-lg    ">
                  <label htmlFor="username" className="label">
                    <span className="label-text"> Username</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder=" "
                      value={formData.username}
                      maxLength={15}
                      onChange={handleInputChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 mx-auto">
              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3">
                <div className="form-control w-full ">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text"> Phone number</span>
                  </label>
                  <div className="flex  items-center gap-3 ">
                    <input
                      type="tel"
                      name="phoneNumber"
                      maxLength={15}
                      id="phoneNumber"
                      value={formData.phoneNumber.data}
                      onChange={handleInputChangeObjData}
                      className="input input-bordered w-full max-w-lg "
                    />
                    <Checkbox
                      isCheckedState={formData.phoneNumber.showOnWebsite}
                      setState={updateShowOnWebsite("phoneNumber")}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3">
                <div className="form-control w-full  ">
                  <label htmlFor="dateOfBirth" className="label">
                    <span className="label-text"> Date of birth</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth.data}
                      onChange={handleInputChangeObjData}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-lg "
                    />
                    <Checkbox
                      isCheckedState={formData.dateOfBirth.showOnWebsite}
                      setState={updateShowOnWebsite("dateOfBirth")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2  mx-auto ">
              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3">
                <div className="form-control w-full ">
                  <label htmlFor="resume" className="label">
                    <span className="label-text"> resume</span>
                  </label>
                  <div className="flex  items-center gap-3 ">
                    <input
                      type="tel"
                      name="resume"
                      id="resume"
                      value={formData.resume}
                      onChange={handleInputChange}
                      className="input input-bordered w-full max-w-lg "
                    />
                  </div>
                </div>
              </div>

              {/* <div className="skills relative z-0 w-full md:w-3/4 mb-5  group flex flex-col items-center gap-3"> */}
              <div className="z-0 w-full md:w-3/4 group flex items-start md:mr-5 ">
                <div className="form-control  w-full ">
                  <label htmlFor="skills" className="label">
                    <span className="label-text">Skills</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="skills"
                      id="skills"
                      className="input input-bordered  w-full max-w-lg"
                      placeholder=""
                      value={newSkill}
                      maxLength={25}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <Form onSubmit={handleAdd}>
                      <button
                        ref={btnRef}
                        type="submit"
                        className="text-black bg-white font-medium rounded-lg text-sm md:text-lg sm:w-auto px-5 py-1.5 text-center "
                      >
                        Add
                      </button>
                    </Form>
                  </div>
                  <div className="skillchips w-full max-w-3xl mx-auto  ">
                    {skillData.length > 0 ? (
                      skillData.map((data) => {
                        let icon;
                        if (data.label === "React") {
                          icon = <TagFacesIcon />;
                        }

                        return (
                          <div key={data.key} className="m-2 inline-block">
                            <Chip
                              variant="outlined"
                              color="primary"
                              icon={icon}
                              label={data.label}
                              onDelete={handleDelete(data)}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p className="font-semibold font-mono text-red-600">
                        No skills added.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

            <div className="flex flex-col md:flex-row  items-start gap-5  mb-10 mt-9">
              <div className="relative z-0 w-full md:w-3/4 mb-5  group flex items-center gap-3">
                <div className="form-control   w-full">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <textarea
                      name="bio"
                      maxLength={250}
                      id="bio"
                      className="textarea w-full textarea-bordered h-24 max-w-lg"
                      placeholder=""
                      value={formData.bio.data}
                      onChange={handleInputChangeObjData}
                    ></textarea>
                    <Checkbox
                      isCheckedState={formData.bio.showOnWebsite}
                      setState={updateShowOnWebsite("bio")}
                    />
                  </div>
                </div>
              </div>
              {/* skills */}

              <div className="relative z-0 w-full md:w-3/4 mb-5  group flex items-center gap-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">
                      Upload Profile Picture {"(automatically focuses on face)"}
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <ImageUploader
                      image={formData.picture}
                      setFormData={setFormData}
                    ></ImageUploader>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pb-8">
              <div className="flex gap-4 items-center">
                <FaInstagram size={40} />
                <input
                  type="text"
                  name="instagram"
                  value={formData.social.instagram}
                  placeholder="Instagram URL"
                  onChange={handleSocialChange}
                  className="input input-bordered sm:w-2/6 md:w-2/5"
                />
              </div>
              <div className="flex gap-4 items-center">
                <FaLinkedin size={40} />
                <input
                  type="text"
                  name="linkedin"
                  value={formData.social.linkedin}
                  placeholder="Linkedin URL"
                  onChange={handleSocialChange}
                  className="input input-bordered sm:w-2/6 md:w-2/5"
                />
              </div>
              <div className="flex gap-4 items-center">
                <FaXTwitter size={40} />
                <input
                  type="text"
                  name="twitter"
                  value={formData.social.twitter}
                  placeholder="Twitter URL"
                  onChange={handleSocialChange}
                  className="input input-bordered sm:w-2/6 md:w-2/5"
                />
              </div>
            </div>

            <div className="flex w-full max-sm:justify-center md:justify-end md:pe-12">
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                type="submit"
                className={`text-black bg-white font-medium rounded-lg  text-xl  md:text-3xl   px-8 py-3 text-center ${isDisabled ? "cursor-not-allowed opacity-20" : null
                  }`}
              >
                {isDisabled ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="mockup-browser border bg-base-300 mt-4">
          <div className="mockup-browser-toolbar">
            <div className="input" style={{ marginLeft: "0" }}>
              {"#include {digitomize} > {socials}"}
            </div>
          </div>
          <div className="flex justify-center px-4 py-16 bg-base-200">
            <div className="mockup-code">
              <pre data-prefix="1">
                <code className="text-white">npm i socials</code>
              </pre>
              <pre data-prefix="2">
                <code className="text-success">installing...</code>
              </pre>
              <pre data-prefix="3" className="bg-warning text-warning-content">
                <code>coming soon!</code>
              </pre>
            </div>
          </div>
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}
