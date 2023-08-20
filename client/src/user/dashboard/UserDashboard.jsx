import { requireAuth } from '../../../utils'
  import { userDashboardDetails } from "../../../api";
import { useLoaderData, NavLink, Outlet } from "react-router-dom";
import SignoutButton from "../../components/SignoutButton";

export async function loader ({ request }) {
    await requireAuth(request)
    try {
        const data = await userDashboardDetails()
        return data
    } catch(err) {
        console.error(err)
        return null
    }
}

export default function UserDashboard() {
    const data= useLoaderData().data.personal_data
    console.log(data)
  return (
    <div className='flex flex-col items-start ms-4 mt-8 me-4 md:ms-16 md:mt-12 gap-12 md:me-8'>
      <div className="flex items-center gap-3">
        <div className=" Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full" >
          <img src="https://www.svgrepo.com/show/446517/avatar.svg" alt="avatar" />
        </div>
          <div className="">
            <h2 className='text-2xl'>anurag.com's Dashboard</h2>
          </div>
      </div>
      
      <div className="">
        <nav className='flex justify-start'>
            <NavLink to='personal' className="border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-xl " >
              Personal Info
            </NavLink>

            <NavLink to='ratings' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-xl">
                Ranking 
            </NavLink>
            <NavLink to='github' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-xl">
                Github Repos
            </NavLink>
        </nav>
      </div>
      <div className="container flex  items-center">
      <div className="container w-[80%] h-full bg-custom-bg rounded-[10px] border border-custom-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <Outlet context={data}/>
      </div>
    </div>
    <SignoutButton />
    </div>

  )
}

