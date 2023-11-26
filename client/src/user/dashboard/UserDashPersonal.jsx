import React, { useState } from 'react'
import { userDashboardDetails, submitUserFormData } from '../../../api';
import NewNavbar from '../../components/NewNavbar';
import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { toast } from "react-toastify";
import FormInput from '../components/FormInput';

export async function loader() {
  try {
    const res = await userDashboardDetails();
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const UserDashPersonal = () => {
  const personalData = useLoaderData().personal_data;
  const picture = personalData.picture;
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
  }
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
    <div className='p-10 flex flex-col gap-8'>
      <p className='text-3xl max-phone:text-2xl font-bold normal-case text-white'> Setup your Digitomize account</p>
      <div className='flex'>
        <div className='w-40 h-40 border border-zinc-500 border-opacity-60 rounded-lg'>
          <img src={picture} alt="" className='w-full h-full object-contain' />
        </div>
        <div className='flex flex-col gap-4 ps-4 items-center justify-center'>
          <div className='btn btn-sm md:btn-md btn-success text-sm md:text-md normal-case text-white shadow'>Upload image</div>
          <div className='btn btn-error normal-case text-white shadow'>Remove image</div>
        </div>
      </div>
      <div className='flex gap-8 flex-col md:flex-row md:justify-between '>

        <FormInput name='name' value={formData.name} handleInputChange={handleInputChange} type="text" labelText="Name" placeholderText="What should we call you?" textArea={false} inputClass=' text-white' />
        <FormInput name='username' value={formData.username} handleInputChange={handleInputChange} type="text" labelText="@username" placeholderText="aka ?" textArea={false} />

      </div>
      <div className='flex flex-col gap-4'>
        <FormInput name='bio' value={formData.bio.data} handleInputChangeObjData={handleInputChangeObjData} textArea={true} labelText='Bio' placeholderText='Tell the community about yourself' inputClass="h-36 max-h-44" />
      </div>
      <div className='flex justify-between items-center gap-8'>
        <div className='md:w-1/2'>
          <FormInput name='dateOfBirth' value={formData.dateOfBirth.data} handleInputChangeObjData={handleInputChangeObjData} type='date' labelText='Date of Birth' />

        </div>
        <button onClick={handleSubmit} className='btn btn-success'>Save Changes</button>
      </div>
      <div>

      </div>

    </div>
  )
}

export default UserDashPersonal