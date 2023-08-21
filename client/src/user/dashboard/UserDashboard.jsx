import { requireAuth } from '../../../utils'
import { userDashboardDetails } from "../../../api";
import { useLoaderData, NavLink, Outlet } from "react-router-dom";
import SignoutButton from "../../components/SignoutButton";


export async function loader({ request }) {
  await requireAuth(request)
  try {
    const data = await userDashboardDetails()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default function UserDashboard() {
  const data = useLoaderData().data.personal_data
  console.log(data)
  return (
    <div className='flex '>
      <div className='flex w-full h-screen flex-col items-center md:pt-12 gap-12 '>
        <div className="flex items-center gap-3  justify-center">
          <div className=" Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full" >
            <img src="https://www.svgrepo.com/show/446517/avatar.svg" alt="avatar" />
          </div>
          <div className="">
            <h2 className='text-2xl'>anurag.com's Dashboard</h2>
          </div>
        </div>

        <div className="container flex  items-center px-[5%]">
          <div  className='flex items-start '>
            <nav className=''>
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                  <NavLink to='personal' className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 " >
                    Personal Info</NavLink>
                </li>
                <li className="mr-2">
                  <NavLink to='ratings' className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Ratings</NavLink>
                </li>
                <li className="mr-2">
                  <NavLink to='github' className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Github</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container w-[100%]  h-fit bg-custom-bg rounded-[10px] border border-custom-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <Outlet context={data} />
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