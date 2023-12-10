import { useState } from "react"
import FormInput from "../components/FormInput"

const UserDashAccount = () => {
  const [isdisabled, setIsDisabled] = useState(false)

  return (
    <div className='flex flex-col gap-8 mb-8'>
      <div className='p-10 flex flex-col gap-8 justify-start items-start w-full h-3/4 bg-eerie-black-2 rounded-xl border border-white border-opacity-5'>
        <p className='text-3xl max-phone:text-2xl font-bold normal-case text-white'>
          Manage your account
        </p>
        <div className='flex flex-col gap-8 max-md:w-full md:w-3/4 '>
          <FormInput
            name='email'
            labelText='Email'
            placeholderText='Enter your email'
          />
          <FormInput
            name='phoneNumber'
            labelText='Phone Number'
            placeholderText='How should we call you ?'
          />
        </div>
        <div className='flex w-full max-md:flex-col gap-4 justify-between max-md:items-center'>
          <p className='normal-case text-xl text-red-500 tracking-tight'>
            Delete Account?
          </p>
          <button
            className='btn btn-success max-md:w-3/4'
            disabled={isdisabled}
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className='p-10 flex flex-col gap-8 justify-start items-start w-full h-3/4 bg-eerie-black-2 rounded-xl border border-white border-opacity-5'>
        <p className='text-3xl max-phone:text-2xl font-bold normal-case text-white'>
          Change your password
        </p>
        <div className='flex gap-8 flex-col md:flex-row md:justify-between w-full'>
          <FormInput
            name='oldPassword'
            type='password'
            labelText='Old password'
            placeholderText='************'
            textArea={false}
            inputClass=' text-white'
          />
          <FormInput
            name='newPassword'
            type='password'
            labelText='New password'
            placeholderText='************'
            textArea={false}
          />
        </div>
        <div className='w-full flex justify-end'>
          <button className='btn btn-success' disabled={isdisabled}>
            Change
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDashAccount
