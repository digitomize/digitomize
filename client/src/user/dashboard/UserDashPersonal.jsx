import { Form, useLoaderData } from "react-router-dom"

import { useState, useEffect, useRef } from "react"

import { submitUserFormData, userDashboardDetails } from "../../../api"

import { useUserAuth } from "../../context/UserAuthContext"
import axios from "axios"
// import { toast } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar"
import Checkbox from "../components/Checkbox"
import NewNavbar from "../../components/globals/NewNavbar"
import { ToastContainer, toast } from "react-toastify"

import Chip from "@mui/material/Chip"
import TagFacesIcon from "@mui/icons-material/TagFaces"
import { styled } from "@mui/material/styles"
import ImageUploader from "../../components/ImageUploader"

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

export async function loader() {
  try {
    const res = await userDashboardDetails()
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export default function UserDashPersonal() {
  const personalData = useLoaderData().personal_data
  const [newSkill, setNewSkill] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [skillData, setskillData] = useState(
    personalData.skills.map((skill, index) => ({
      key: index, // Use the index as the key
      label: skill,
    }))
  )

  const handleDelete = (chipToDelete) => () => {
    setskillData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    )
  }
  const handleAdd = (e) => {
    e.preventDefault()

    if (newSkill.trim() !== "") {
      if (newSkill.length > 20) {
        toast.error("Length exceeding 20 characters")
        return
      }
      setskillData((prevSkills) => [
        ...prevSkills,
        {
          key: prevSkills.length
            ? prevSkills[prevSkills.length - 1].key + 1
            : 0,
          label: newSkill,
        },
      ])
      setNewSkill("")
    }
  }
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
      btnRef.current.disabled = true
    } else {
      btnRef.current.disabled = false
    }
    setFormData((prevData) => ({
      ...prevData,
      skills: skillData.map((data) => data.label) || [],
    }))
  }, [skillData, btnRef])

  const [formData, setFormData] = useState({
    username: personalData.username,
    name: personalData.name || "",
    resume: personalData.resume || "",
    picture: personalData.picture,
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
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEducationChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      education: value.split(","),
    }))
  }

  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        data: value,
      },
    }))
  }
  const updateShowOnWebsite = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        showOnWebsite: value,
      },
    }))
  }
  async function handleSubmit(event) {
    event.preventDefault()
    setIsDisabled(true)
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
        })
        setIsDisabled(false)
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
        })
        console.log(err)
        setIsDisabled(false)
      })

    console.log(res)
  }

  return (
    <>
      <ToastContainer />
      <DashboardNavbar />
      {/* <div className="w-11/12 px-8 py-12 pt-24 mx-auto md:ps-12"> */}
      <div className='w-11/12 py-4 mx-auto phone:mt-12 max-phone:mt-24'>
        <div className='border mockup-browser bg-base-300'>
          <div className='mockup-browser-toolbar'>
            <div className='input' style={{ marginLeft: "0" }}>
              {"#include {digitomize} > {personal}"}
            </div>
          </div>

          <div className='w-full p-8 bg-base-200'>
            <div className='grid mx-auto md:grid-cols-2'>
              <div className='relative z-0 flex items-center w-full mb-12 md:w-3/4 group '>
                <div className='w-full max-w-lg form-control '>
                  <label htmlFor='firstName' className='label'>
                    <span className='label-text'> name</span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      placeholder=' '
                      value={formData.name}
                      maxLength={25}
                      onChange={handleInputChange}
                      required
                      className='w-full input input-bordered '
                    />
                  </div>
                </div>
              </div>

              <div className='relative z-0 flex items-center w-full gap-3 mb-12 md:w-3/4 group '>
                <div className='w-full max-w-lg form-control '>
                  <label htmlFor='username' className='label'>
                    <span className='label-text'> Username</span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      placeholder=' '
                      value={formData.username}
                      maxLength={15}
                      onChange={handleInputChange}
                      required
                      className='w-full input input-bordered'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid mx-auto md:grid-cols-2'>
              <div className='relative z-0 flex items-center w-full gap-3 mb-12 md:w-3/4 group'>
                <div className='w-full form-control '>
                  <label htmlFor='phoneNumber' className='label'>
                    <span className='label-text'> Phone number</span>
                  </label>
                  <div className='flex items-center gap-3 '>
                    <input
                      type='tel'
                      name='phoneNumber'
                      maxLength={15}
                      id='phoneNumber'
                      value={formData.phoneNumber.data}
                      onChange={handleInputChangeObjData}
                      className='w-full max-w-lg input input-bordered '
                    />
                    <Checkbox
                      isCheckedState={formData.phoneNumber.showOnWebsite}
                      setState={updateShowOnWebsite("phoneNumber")}
                    />
                  </div>
                </div>
              </div>

              <div className='relative z-0 flex items-center w-full gap-3 mb-12 md:w-3/4 group'>
                <div className='w-full form-control '>
                  <label htmlFor='dateOfBirth' className='label'>
                    <span className='label-text'> Date of birth</span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='date'
                      id='dateOfBirth'
                      name='dateOfBirth'
                      value={formData.dateOfBirth.data}
                      onChange={handleInputChangeObjData}
                      placeholder='Type here'
                      className='w-full max-w-lg input input-bordered '
                    />
                    <Checkbox
                      isCheckedState={formData.dateOfBirth.showOnWebsite}
                      setState={updateShowOnWebsite("dateOfBirth")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid mx-auto md:grid-cols-2 '>
              <div className='relative z-0 flex items-center w-full gap-3 mb-12 md:w-3/4 group'>
                <div className='w-full form-control '>
                  <label htmlFor='resume' className='label'>
                    <span className='label-text'> resume</span>
                  </label>
                  <div className='flex items-center gap-3 '>
                    <input
                      type='tel'
                      name='resume'
                      id='resume'
                      value={formData.resume}
                      onChange={handleInputChange}
                      className='w-full max-w-lg input input-bordered '
                    />
                  </div>
                </div>
              </div>

              {/* <div className="relative z-0 flex flex-col items-center w-full gap-3 mb-5 skills md:w-3/4 group"> */}
              <div className='z-0 flex items-start w-full md:w-3/4 group md:mr-5 '>
                <div className='w-full form-control '>
                  <label htmlFor='skills' className='label'>
                    <span className='label-text'>Skills</span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <input
                      type='text'
                      name='skills'
                      id='skills'
                      className='w-full max-w-lg input input-bordered'
                      placeholder=''
                      value={newSkill}
                      maxLength={10}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <Form onSubmit={handleAdd}>
                      <button
                        ref={btnRef}
                        type='submit'
                        className='text-black bg-white font-medium rounded-lg text-sm md:text-lg sm:w-auto px-5 py-1.5 text-center '
                      >
                        Add
                      </button>
                    </Form>
                  </div>
                  <div className='w-full max-w-3xl mx-auto skillchips '>
                    {skillData.length > 0 ? (
                      skillData.map((data) => {
                        let icon
                        if (data.label === "React") {
                          icon = <TagFacesIcon />
                        }

                        return (
                          <div key={data.key} className='inline-block m-2'>
                            <Chip
                              variant='outlined'
                              color='primary'
                              icon={icon}
                              label={data.label}
                              onDelete={handleDelete(data)}
                            />
                          </div>
                        )
                      })
                    ) : (
                      <p className='font-mono font-semibold text-red-600'>
                        No skills added.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

            <div className='flex flex-col items-start gap-5 mb-10 md:flex-row mt-9'>
              <div className='relative z-0 flex items-center w-full gap-3 mb-5 md:w-3/4 group'>
                <div className='w-full form-control'>
                  <label className='label'>
                    <span className='label-text'>Bio</span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <textarea
                      name='bio'
                      maxLength={250}
                      id='bio'
                      className='w-full h-24 max-w-lg textarea textarea-bordered'
                      placeholder=''
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

              <div className='relative z-0 flex items-center w-full gap-3 mb-5 md:w-3/4 group'>
                <div className='w-full form-control'>
                  <label className='label'>
                    <span className='label-text'>
                      Upload Profile Picture {"(automatically focuses on face)"}
                    </span>
                  </label>
                  <div className='flex items-center gap-3'>
                    <ImageUploader
                      image={formData.picture}
                      setFormData={setFormData}
                    ></ImageUploader>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex w-full max-sm:justify-center md:justify-end md:pe-12'>
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                type='submit'
                className={`text-black bg-white font-medium rounded-lg  text-xl  md:text-3xl   px-8 py-3 text-center ${
                  isDisabled ? "cursor-not-allowed opacity-20" : null
                }`}
              >
                {isDisabled ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        <div className='mt-4 border mockup-browser bg-base-300'>
          <div className='mockup-browser-toolbar'>
            <div className='input' style={{ marginLeft: "0" }}>
              {"#include {digitomize} > {socials}"}
            </div>
          </div>
          <div className='flex justify-center px-4 py-16 bg-base-200'>
            <div className='mockup-code'>
              <pre data-prefix='1'>
                <code className='text-white'>npm i socials</code>
              </pre>
              <pre data-prefix='2'>
                <code className='text-success'>installing...</code>
              </pre>
              <pre data-prefix='3' className='bg-warning text-warning-content'>
                <code>coming soon!</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
