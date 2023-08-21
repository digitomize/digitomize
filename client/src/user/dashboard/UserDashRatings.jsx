import React from 'react'
import { Form } from 'react-router-dom'
import Checkbox from '../components/Checkbox'

export default function UserDashRatings() {
  return (
    <div className="px-8 py-12 ">
      <div className='w-full flex justify-center md:justify-end mb-12 md:mb-8'>
        <Checkbox />
      </div>
      <Form className='flex flex-col items-center'>
        <div className="relative z-0 w-full md:w-3/4 mb-12 group">
              <input type="text" name="codeforces" id="codeforces" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
              <label htmlFor="codeforces" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Codeforces</label>
        </div>
        <div className="relative z-0 w-full md:w-3/4 mb-12 group">
              <input type="text" name="geeksForGeeks" id="geeksForGeeks" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
              <label htmlFor="geeksForGeeks" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Geeks For Geeks</label>
        </div>
        <div className="relative z-0 w-full md:w-3/4 mb-12 group">
              <input type="text" name="leetcode" id="leetcode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
              <label htmlFor="leetcode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Leetcode</label>
        </div>
        <div className="relative z-0 w-full md:w-3/4 mb-6 group">
              <input type="text" name="codechef" id="codechef" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
              <label htmlFor="codechef" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Codechef</label>
        </div>
        <button type="submit" className="text-black bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-8 ">Update</button>
      </Form>
    </div>
  )
}
