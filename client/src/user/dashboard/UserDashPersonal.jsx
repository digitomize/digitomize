import { Form, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { submitUserFormData, userDashboardDetails } from "../../../api";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
// import { toast } from "react-toastify";
import Checkbox from "../components/Checkbox";
import NewNavbar from "../../components/NewNavbar";
import { ToastContainer, toast } from "react-toastify";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { styled } from "@mui/material/styles";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export async function loader() {
  try {
    const res = await userDashboardDetails();
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default function UserDashPersonal() {
  const personalData = useLoaderData().personal_data;
  const [newSkill, setNewSkill] = useState("");
  const [skillData, setskillData] = useState(
    personalData.skills.map((skill, index) => ({
      key: index, // Use the index as the key
      label: skill,
    }))
  );

  const handleDelete = (chipToDelete) => () => {
    setskillData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleAdd = (e) => {
    e.preventDefault();

    if (newSkill.trim() !== "") {
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

  useEffect(() => {
    // This code will run after setSkillData has completed
    setFormData((prevData) => ({
      ...prevData,
      skills: skillData.map((data) => data.label) || [],
    }));
  }, [skillData]);

  const [formData, setFormData] = useState({
    username: personalData.username,
    name: personalData.name || "",
    phoneNumber: {
      data: personalData.phoneNumber.data || "",
      showOnWebsite: personalData.phoneNumber.showOnWebsite || false,
    },
    dateOfBirth: {
      data: personalData.dateOfBirth.data || "",
      showOnWebsite: personalData.dateOfBirth.showOnWebsite || false,
    },
    bio: {
      data: personalData.bio.data || "",
      showOnWebsite: personalData.bio.showOnWebsite || false,
    },
    skills: skillData.map((data) => data.label) || [],
    education: personalData.education || [],
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //   const handleSkillsChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       skills: value.split(","),
  //     }));
  //   };
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
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData)
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
        });
      })
      .catch((err) => {
        toast.error("error updating", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(err);
      });

    console.log(res);
  }

  return (
    <>
      <ToastContainer />
      <NewNavbar />
      <div className="px-8 md:ps-12 py-12 pt-24">
        {/* <div className="w-full flex justify-center md:justify-end mb-12 md:mb-8">
            <Checkbox />
        </div> */}

        <div className=" w-full">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-2">
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-md md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
              placeholder=" "
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="firstName"
              className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-md md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
              placeholder=" "
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-2">
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
              placeholder=" "
              value={formData.phoneNumber.data}
              onChange={handleInputChangeObjData}
            />
            <label
              htmlFor="phoneNumber"
              className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
            <Checkbox
              isCheckedState={formData.phoneNumber.showOnWebsite}
              setState={updateShowOnWebsite("phoneNumber")}
            />
          </div>
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
              value={formData.dateOfBirth.data}
              onChange={handleInputChangeObjData}
            />
            <label
              htmlFor="dateOfBirth"
              className="peer-focus:font-medium absolute md:text-lg text-gray-300 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of birth
            </label>
            <Checkbox
              isCheckedState={formData.dateOfBirth.showOnWebsite}
              setState={updateShowOnWebsite("dateOfBirth")}
            />
          </div>
        </div>
        <div className="relative z-0 w-full md:w-3/4 mb-12 group">
          <input
            type="text"
            name="bio"
            id="bio"
            className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
            placeholder=""
            value={formData.bio.data}
            onChange={handleInputChangeObjData}
          />
          <label
            htmlFor="bio"
            className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bio
          </label>
          <Checkbox
            isCheckedState={formData.bio.showOnWebsite}
            setState={updateShowOnWebsite("bio")}
          />
        </div>

        {/* skills */}
        <div className="skills relative z-0 w-full md:w-3/4 mb-12 group">
          <div className="z-0 w-full md:w-3/4 mb-2 group flex flex-row">
            <input
              type="text"
              name="skills"
              id="skills"
              className="block py-2.5 px-0 w-3/4 md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer"
              placeholder=""
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <label
              htmlFor="skills"
              className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Skills
            </label>
            <Form onSubmit={handleAdd}>
              <button
                type="submit"
                className="text-black bg-white font-medium rounded-lg md:text-xl sm:w-auto px-5 py-2.5 text-center "
              >
                Add skill
              </button>
            </Form>
          </div>

          <div className="skillchips">
            {skillData.length > 0 ? (
              skillData.map((data) => {
                let icon;

                if (data.label === "React") {
                  icon = <TagFacesIcon />;
                }

                return (
                  //   <ListItem key={data.key}>
                  <Chip
                    key={data.key}
                    variant="outlined"
                    color="primary"
                    icon={icon}
                    label={data.label}
                    onDelete={handleDelete(data)}
                  />
                  //   </ListItem>
                );
              })
            ) : (
              <p>No skills added.</p>
            )}
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="text-black bg-white font-medium rounded-lg md:text-xl w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Update
          </button>
        </Form>
      </div>
    </>
  );
}
