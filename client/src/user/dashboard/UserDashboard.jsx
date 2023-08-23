import { requireAuth } from '../../../utils'
import { getUserNameFromCookie } from "../../../api";
import { useLoaderData, NavLink, Outlet } from "react-router-dom";
import SignoutButton from "../../components/SignoutButton";


export async function loader({ request }) {
  await requireAuth(request)
  try {
    const data = await getUserNameFromCookie()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default function UserDashboard() {
  const username = useLoaderData()
  // const username = data.personal_data.username
  return (
    <div className='flex mt-8 md:mt-0'>
      <div className='flex w-full h-screen flex-col items-center md:pt-12 gap-12 '>
        <div className="flex items-center gap-3  justify-center">
          <div className=" Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full" >
            <img src="https://www.svgrepo.com/show/446517/avatar.svg" alt="avatar" />
          </div>
          <div className="">
            <h2 className='text-2xl'>{`${username}'s Dashboard`}</h2>
          </div>
        </div>

        <div className="container flex  items-center px-[5%] ">
          <div className='flex items-start '>
            <nav className=''>
              <ul className="flex flex-nowrap text-md font-medium text-center text-gray-400 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-4">
                  <NavLink to='personal' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>
                    Personal Info</NavLink>
                </li>
                <li className="mr-4">
                  <NavLink to='ratings' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Ratings</NavLink>
                </li>
                <li className="">
                  <NavLink to='github' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Github</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container w-[100%]  h-fit bg-custom-bg rounded-[10px] border border-custom-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <Outlet />
          </div>
        </div>
        {/* <SignoutButton /> */}
      </div>
    </div>
  )
}









// <NavLink to='personal' className="border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl " >
//               Personal Info
//             </NavLink>

//             <NavLink to='ratings' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Ranking 
//             </NavLink>
//             <NavLink to='github' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Github Repos
//             </NavLink>