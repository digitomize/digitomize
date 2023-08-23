import React, { useState } from 'react'
import { Form, useLoaderData } from "react-router-dom"
import { userDashboardDetails, submitUserFormData } from '../../../api'

export async function loader() {
  try {
    const data = await userDashboardDetails()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default function UserDashGithub() {
  const githubData = useLoaderData().data.github
  const username = useLoaderData().data.personal_data.username

  const [formData, setFormData] = useState({
    username,
    github: {
      data: githubData.data || "anur4ag",
      showOnWebsite: githubData.showOnWebsite || true,
    }
  });

  const handleInputChangeObjData = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        data: value,
      },
    }));
  };

  function svgImage() {
    return (

      <a href={`https://github.com/${githubData.data}`}>
        <img height="200" align="center" src={`https://github-readme-stats.vercel.app/api?username=${githubData.data}&theme=blue-green&show_icons=true`} />
      </a>

    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await submitUserFormData(formData);
    console.log(res);
    svgImage()
  }

  return (
    <div className=" ">
      <div className='px-8 py-12'>
        <Form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <div className="relative z-0 w-full md:w-3/4 mb-4 group">
            <input type="text" name="github" id="github" className="block py-2.5 px-0 w-full text-md text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" placeholder="" value={formData.github.data} onChange={handleInputChangeObjData} />
            <label htmlFor="github" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Github Username</label>
          </div>
          <button type="submit" className="text-black bg-white font-medium rounded-lg text-sm w-full sm:w-[20%] px-5 py-2.5 text-center mt-8 ">Update</button>
        </Form>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {svgImage()}
        </div>
      </div>
    </div>
  )
}
