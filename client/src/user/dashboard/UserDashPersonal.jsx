import { Form, useLoaderData } from "react-router-dom";

import {
  useState,
  useEffect,
  useRef
} from "react";

import { submitUserFormData, userDashboardDetails } from "../../../api";

import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
// import { toast } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import Checkbox from "../components/Checkbox";
import NewNavbar from "../../components/NewNavbar";
import { ToastContainer, toast } from "react-toastify";

import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { styled } from "@mui/material/styles";
import NewFooter from "../../components/NewFooter";

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
      if (newSkill.length > 20) {
        toast.error("Length exceeding 20 characters")
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
  const btnRef = useRef()

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
      })
      skillData.pop()
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
    username: personalData.username,
    name: personalData.name || "",
    phoneNumber: {
      data: personalData.phoneNumber.data || "",
      showOnWebsite: personalData.phoneNumber.showOnWebsite || true,
    },
    dateOfBirth: {
      data: personalData.dateOfBirth.data || "",
      showOnWebsite: personalData.dateOfBirth.showOnWebsite || true,
    },
    bio: {
      data: personalData.bio.data || "",
      showOnWebsite: personalData.bio.showOnWebsite || true,
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
      <DashboardNavbar />
      {/* <div className="px-8 md:ps-12 py-12 pt-24 w-11/12 mx-auto"> */}
      <div className="phone:mt-12 max-phone:mt-24 py-4 w-11/12 mx-auto">
        <div className="mockup-browser border bg-base-300">
          <div className="mockup-browser-toolbar">
            <div className="input" style={{ marginLeft: '0' }}>{"#include {digitomize} > {personal}"}</div>
          </div>
          {/* <div className="w-full flex justify-center md:justify-end mb-12 md:mb-8">
            <Checkbox />
        </div> */}

          {/* <div className=" w-full">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

      </div> */}

          <div className="bg-base-200 w-full p-8">


            <div className="grid md:grid-cols-2 mx-auto">
              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center ">

                <div className="form-control w-full   max-w-lg   ">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text"> Name</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input type="text"
                      name="name"
                      id="name" placeholder=" "
                      value={formData.name}
                      maxLength={25}
                      onChange={handleInputChange}
                      required className="input input-bordered w-full  " />
                  </div>

                </div>
                {/* <input
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
          </label> */}
              </div>
              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3 ">


                <div className="form-control w-full max-w-lg    ">
                  <label htmlFor="username" className="label">
                    <span className="label-text"> Username</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input type="text"
                      name="username"
                      id="username" placeholder=" "
                      value={formData.username}
                      maxLength={15}
                      onChange={handleInputChange}
                      required className="input input-bordered w-full" />
                  </div>

                </div>


                {/* 
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
          </label> */}
              </div>
            </div>
            <div className="grid md:grid-cols-2  mx-auto ">

              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3">

                <div className="form-control w-full ">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text"> Phone number</span>
                  </label>
                  <div className="flex  items-center gap-3 ">
                    <input type="tel"
                      name="phoneNumber"
                      maxLength={15}
                      id="phoneNumber" value={formData.phoneNumber.data}
                      onChange={handleInputChangeObjData} className="input input-bordered w-full max-w-lg " />
                    <Checkbox
                      isCheckedState={formData.phoneNumber.showOnWebsite}
                      setState={updateShowOnWebsite("phoneNumber")}
                    />
                  </div>

                </div>

                {/* <input
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
              className="checkbox checkbox-success"
            />  */}
                {/* <input type="checkbox" checked={formData.phoneNumber.showOnWebsite} onChange={(e) => {
    updateShowOnWebsite("phoneNumber")(e.target.checked);
            }} className="checkbox checkbox-success" /> */}

              </div>





              <div className="relative z-0 w-full md:w-3/4 mb-12 group flex items-center gap-3">

                <div className="form-control w-full  ">
                  <label htmlFor="dateOfBirth" className="label">
                    <span className="label-text">   Date of birth</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input type="date" id="dateOfBirth"
                      name="dateOfBirth" value={formData.dateOfBirth.data}
                      onChange={handleInputChangeObjData} placeholder="Type here" className="input input-bordered w-full max-w-lg " />
                    <Checkbox
                      isCheckedState={formData.dateOfBirth.showOnWebsite}
                      setState={updateShowOnWebsite("dateOfBirth")}
                    />
                  </div>

                </div>

              </div>
            </div>


            <div className="flex flex-col md:flex-row  items-start gap-5  mb-10">

              <div className="relative z-0 w-full md:w-3/4 mb-5  group flex items-center gap-3">


                <div className="form-control   w-full">
                  <label className="label">
                    <span className="label-text">Bio</span>

                  </label>
                  <div className="flex items-center gap-3">
                    <textarea name="bio"
                      maxLength={250}
                      id="bio" className="textarea  w-full textarea-bordered h-24 max-w-lg" placeholder=""
                      value={formData.bio.data}
                      onChange={handleInputChangeObjData}></textarea>
                    <Checkbox

                      isCheckedState={formData.bio.showOnWebsite}
                      setState={updateShowOnWebsite("bio")}
                    />
                  </div>

                </div>
              </div>

              {/* skills */}
              <div className="skills relative z-0 w-full md:w-3/4 mb-5  group flex flex-col items-center gap-3">

                <div className="z-0 w-full md:w-3/4 group flex items-start md:mr-5 ">



                  <div className="form-control  w-full ">
                    <label htmlFor="skills" className="label">
                      <span className="label-text">Skills</span>

                    </label>
                    <div className="flex items-center gap-3">
                      <input type="text"
                        name="skills"
                        id="skills" className="input input-bordered  w-full max-w-lg" placeholder=""
                        value={newSkill}
                        maxLength={10}
                        onChange={(e) => setNewSkill(e.target.value)} />
                      <Form onSubmit={handleAdd}>
                        <button ref={btnRef}
                          type="submit"
                          className="text-black bg-white font-medium rounded-lg text-sm md:text-lg sm:w-auto px-5 py-1.5 text-center "
                        >
                          Add
                        </button>
                      </Form>
                    </div>

                  </div>
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
                    <p className="font-semibold font-mono text-red-600">No skills added.</p>
                  )}
                </div>
              </div>
            </div>



            <Form className=" flex justify-center  w-auto" onSubmit={handleSubmit}>
              <button
                type="submit"
                className="text-black bg-white font-medium rounded-lg  text-xl  md:text-3xl   px-5 py-1.5 text-center "
              >
                Update
              </button>
            </Form>
          </div>
        </div>
        <div className="mockup-browser border bg-base-300 mt-4">
          <div className="mockup-browser-toolbar">
            <div className="input" style={{ marginLeft: '0' }}>{"#include {digitomize} > {socials}"}</div>
          </div>
          <div className="flex justify-center px-4 py-16 bg-base-200">
            <div className="mockup-code">
              <pre data-prefix="1"><code className="text-white">npm i socials</code></pre>
              <pre data-prefix="2"><code className="text-success">installing...</code></pre>
              <pre data-prefix="3" className="bg-warning text-warning-content"><code>coming soon!</code></pre>
            </div>

          </div>

        </div>
      </div>
      <NewFooter />
    </>
  );
}
