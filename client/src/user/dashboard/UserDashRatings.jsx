import React, { useState, useEffect } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import Checkbox from '../components/Checkbox'
import { submitUserFormData, userDashboardDetails } from '../../../api'
// import { useUserAuth } from '../../context/UserAuthContext'
import { toast } from 'react-toastify'
import { Skeleton } from "@mui/material"

export async function loader() {
  try {
    const res = userDashboardDetails()
    if (!res.data) {
      return null;
    }
    else {
      return res.data;
    }
  } catch (err) {
    console.log(err)
    return null
  }

}

export default function UserDashRatings() {
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const ratingsData = data?.ratings
  const username = data?.personal_data.username
  const [formData, setFormData] = useState({
    username: username,
    codeforces: {
      username: ratingsData?.codeforces.data || "",
      showOnWebsite: ratingsData?.codeforces?.showOnWebsite || false,
    },
    codechef: {
      username: ratingsData?.codechef.data || "",
      showOnWebsite: ratingsData?.codechef?.showOnWebsite || false,
    },

    leetcode: {
      username: ratingsData?.leetcode.data || "",
      showOnWebsite: ratingsData?.leetcode?.showOnWebsite || false,
    }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="m-auto flex flex-col items-cente r w-4/5 my-12">
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%"}}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%"}}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%" }}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        </div>
    );
  }


  // console.log(ratingsData)
  
  console.log(ratingsData);
  

  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        username: value,
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
        toast.success('updated successfully!', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }).catch(err => {
        toast.error('error updating', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(err)
      })
    console.log(res);
  }

  if (data) {
    return (
      <div className="px-8 py-12 ">
        {/* <div className="w-full flex justify-center md:justify-end mb-12 md:mb-8">
        <Checkbox />
      </div> */}
        <Form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="text"
              name="codeforces"
              id="codeforces"
              className="block py-2.5 px-0 w-full text-md text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={formData.codeforces.username}
              onChange={handleInputChangeObjData}
            />
            <label
              htmlFor="codeforces"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Codeforces
            </label>
            <Checkbox isCheckedState={formData.codeforces.showOnWebsite} setState={updateShowOnWebsite('codeforces')} />
          </div>
          {/* <div className="relative z-0 w-full md:w-3/4 mb-12 group">
          <input
            type="text"
            name="geeksForGeeks"
            id="geeksForGeeks"
            className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label
            htmlFor="geeksForGeeks"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Geeks For Geeks
          </label>
        </div> */}
          <div className="relative z-0 w-full md:w-3/4 mb-12 group">
            <input
              type="text"
              name="leetcode"
              id="leetcode"
              className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={formData.leetcode.username}
              onChange={handleInputChangeObjData}
            />
            <label
              htmlFor="leetcode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Leetcode
            </label>
            <Checkbox isCheckedState={formData.leetcode.showOnWebsite} setState={updateShowOnWebsite('leetcode')} />
          </div>
          <div className="relative z-0 w-full md:w-3/4 mb-6 group">
            <input
              type="text"
              name="codechef"
              id="codechef"
              className="block py-2.5 px-0 w-full text-md text-gray-200  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={formData.codechef.username}
              onChange={handleInputChangeObjData}
            />
            <label
              htmlFor="codechef"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Codechef
            </label>
            <Checkbox isCheckedState={formData.codechef.showOnWebsite} setState={updateShowOnWebsite('codechef')} />
          </div>
          <button
            type="submit"
            className="text-black bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-8 "
          >
            Update
          </button>
        </Form>
      </div>
    );
  }
}
