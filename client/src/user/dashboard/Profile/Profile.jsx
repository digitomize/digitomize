import React from 'react'
import ImageUploader from '../../../components/ImageUploader'
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { submitUserFormData } from '../../../../api';
import { toast, ToastContainer } from 'react-toastify';
import BasicInfo from "./BasicInfo";
import GenderAndDOB from "./GenderAndDOB";
import SubmitBtn from "./SubmitBtn";
import dayjs from "dayjs";
import { MetaData } from "../../../components/CustomComponents";
import { uniqueToast } from '../../../core/utils/unique-toast';
function UserDashBoardProfile() {
  const { personal_data, social } = useLoaderData();
  const [isDisabled, setIsDisabled] = useState(false);
  const toastId = uniqueToast();
  const [formData, setFormData] = useState({
    email: personal_data.email,
    username: personal_data.username,
    name: personal_data.name || "",
    picture: personal_data.picture,
    dateOfBirth: {
      data: personal_data.dateOfBirth.data || "",
      showOnWebsite: personal_data.dateOfBirth.showOnWebsite || true,
    },
    bio: {
      data: personal_data.bio.data || "",
      showOnWebsite: personal_data.bio.showOnWebsite || true,
    },
    phoneNumber: {
      data: personal_data.phoneNumber.data || "",
      showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
    },
  });
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    }
    const dobChange = (date) => {
      setFormData((prevData) => ({
          ...prevData,
          dateOfBirth: {
              ...prevData.dateOfBirth,
              data: dayjs(date),
          },

      }));
    // console.log(res);
  };
  return (
    <>
      <MetaData path="u/dashboard/profile"/>
      <ToastContainer />
      <div className="bg-dashboardDarkColor font-['Geist']">
        <div className="flex justify-between items-center min-h-[40px]">
          <div className="flex flex-shrink gap-2 mr-4 items-center min-w-0">
            <p className="truncate font-medium text-gray-200 text-3xl max-w-[600px]">Profile</p>
          </div>
        </div>


       
       <form >
       <BasicInfo formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleInputChangeObjData={handleInputChangeObjData}  />
        
        <GenderAndDOB formData={formData}  handleInputChange={handleInputChangeObjData} dobChange={dobChange}/>
        
        <SubmitBtn handleSubmit={handleSubmit}/>
       </form>

        {/* <div className="mt-8 flex flex-col xl:flex-row gap-8 xl:gap-20">
          <div className="flex-1 mt-8 ml-4 xl:ml-0">
            <h3 className="heading">Sign in using password</h3>
            <p className="mt-3 text-secondary">Set your password if you want to be able to sign in using password.</p>
          </div>
          <div className="flex-2 rounded-lg shadow bg-elevation-2 border border-neutral-60 dark:border-neutral-600">

          </div>

        </div> */}

        {/* <div>
          <div className="relative z-0 w-full md:w-3/4 mb-5  group flex items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[14px]">
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
            <div className="w-full">
              <div className="form-control w-full flex flex-row">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Email:</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="input-sm input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full ">
                <label htmlFor="phoneNumber" className="label">
                  <span className="label-text"> Phone number</span>
                </label>
                <div className="flex  items-center gap-3 ">
                  <input
                    type="tel"
                    name="phoneNumber"
                    maxLength={10}
                    id="phoneNumber"
                    value={formData.phoneNumber.data}
                    onChange={handleInputChangeObjData}
                    className="input-sm input input-bordered w-full max-w-lg "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:space-x-[80px] space-x-4 mx-auto sm:mb-12 mb-5">
            <div className="relative z-0 w-full md:w-3/4 group flex items-center ">
              <div className="form-control w-full   max-w-lg   ">
                <label htmlFor="firstName" className="label">
                  <span className="label-text text-[14px]">Name</span>
                </label>
                <div className="flex items-center ">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-sm input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-0 w-full md:w-3/4 group flex items-center gap-3 ">
              <div className="form-control w-full max-w-lg    ">
                <label htmlFor="username" className="label">
                  <span className="label-text text-[14px]"> Username</span>
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
                    className="input-sm input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex sm:flex-row flex-col-reverse sm:space-x-[70px]  mb-[50px]'>
            <div className="relative z-0 w-full md:w-[60%]  group flex items-center gap-3">
              <div className="form-control   w-full">
                <label className="label">
                  <span className="label-text text-[14px]">Bio</span>
                </label>
                <div className=" w-full">
                  <textarea
                    name="bio"
                    maxLength={250}
                    id="bio"
                    className="textarea-sm textarea w-full textarea-bordered h-full"
                    placeholder=""
                    value={formData.bio.data}
                    onChange={handleInputChangeObjData}
                  ></textarea>
                </div>
                <p className='mt-1 text-[14px] text-[#888888]'>Brief description for your profile.</p>
              </div>
            </div>
            <div className='flex max-sm:flex-row sm:flex-col max-sm:mb-4  max-sm:space-x-3 sm:space-y-3 sm:w-[40%]'>
              <div className="relative z-0 w-full md:w-full group flex items-center gap-3">
                <div className="form-control w-full  ">
                  <label htmlFor="dateOfBirth" className="label">
                    <span className="label-text text-[14px]"> Date of birth</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth.data}
                      onChange={handleInputChangeObjData}
                      placeholder="Type here"
                      className="input-sm input input-bordered w-full max-w-lg "
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-0 w-full md:w-full group flex items-center gap-3">
                <div className="form-control w-full  ">
                  <label htmlFor="dateOfBirth" className="label">
                    <span className="label-text text-[14px]">Gender</span>
                  </label>
                  <div className="flex  items-center gap-3">
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value="gender"
                      placeholder="Type here"
                      className="input-sm input input-bordered w-full max-w-lg "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-sm:justify-center md:justify-end md:pe-12">
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
                {isDisabled ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div> */}

      </div>
    </>
  );
}

export default UserDashBoardProfile;