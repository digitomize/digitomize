import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { submitUserFormData } from "../../../api";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { uniqueToast } from "../../core/utils/unique-toast";

const socialFields = [
  { icon: <FaInstagram size={40} />, name: "instagram", placeholder: "Instagram URL" },
  { icon: <FaLinkedin size={40} />, name: "linkedin", placeholder: "Linkedin URL" },
  { icon: <FaXTwitter size={40} />, name: "twitter", placeholder: "Twitter URL" }
];


function UserDashBoardCarrer() {
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

  const [formData, setFormData] = useState({
    resume: personal_data.resume || "",
    skills: skillData.map((data) => data.label) || [],
    social: {
      linkedin: social?.linkedin || null,
      twitter: social?.twitter || null,
      instagram: social?.instagram || null,
    },
  });
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
        setIsDisabled(false);
      });

    // console.log(res);
  }
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
  return (
    <>
      <ToastContainer />
      <div className="border border-solid border-jet bg-cardsColor rounded-md p-[40px] w-9/12 font-['Geist']">
        <div>
          <div className="z-0 w-full md:w-3/4 group flex items-start md:mr-5 ">
            <div className="form-control  w-full ">
              <h2 className='font-bold text-white text-4xl max-sm:text-2xl sm:mb-[30px] mb-[20px]'>Skills</h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className="input-sm input input-bordered max-sm:text-sm  w-full max-w-lg"
                  placeholder="Add a skill"
                  value={newSkill}
                  maxLength={25}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Form onSubmit={handleAdd}>
                  <button
                    ref={btnRef}
                    type="submit"
                    className="btn btn-sm btn-outline"
                  >
                    Add
                  </button>
                </Form>
              </div>
              <div className="skillchips w-full max-sm:text-sm  max-w-3xl h-12">
                {skillData.length > 0 ? (
                  skillData.map((data) => {
                    let icon;
                    if (data.label === "React") {
                      icon = <TagFacesIcon />;
                    }

                    return (
                      <div key={data.key} className="max-sm:text-sm my-2  inline-block">
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
                  <p className="font-semibold mt-1 max-sm:text-sm text-red-600 ">
                    No skills added.
                  </p>
                )}
              </div>
            </div>
          </div>

          <h2 className='font-bold text-white text-4xl max-sm:text-2xl sm:mb-[30px] my-2'>Social</h2>
          <div className="flex flex-col gap-4 pb-8">
            {socialFields.map((field, index) => (
              <div key={index} className="flex sm:gap-4 gap-3 items-center">
                {field.icon}
                <input
                  type="text"
                  name={field.name}
                  value={formData.social[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleSocialChange}
                  className="input-sm input input-bordered max-sm:text-sm w-9/12"
                />
              </div>
            ))}
          </div>

        </div>

        <div className="flex w-full max-sm:justify-center md:justify-end md:pe-12 max-sm:text-sm ">
          <div className="btn-div" style={{ boxShadow: `8px 8px #2E8D46` }}>
            <button disabled={isDisabled}
              onClick={handleSubmit}
              type="submit"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "17px",
              }}
              className={`${isDisabled ? "cursor-not-allowed  opacity-60" : ""}`}
            >
              {isDisabled ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashBoardCarrer;
