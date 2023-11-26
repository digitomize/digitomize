import { Outlet, NavLink, useLocation } from "react-router-dom"
import UserDashboard from "../dashboard/UserDashboard"
import NewNavbar from "../../components/NewNavbar";
import { ToastContainer } from "react-toastify";
const links = [
    {
        name: 'Account',
        link: '/u/dashboard/#',
    },
    {
        name: 'Profile',
        link: '/u/dashboard/account',
        // link: '#',
    },
    {
        name: 'Ratings',
        link: '/u/dashboard/ratings',
        // link: '#',
    },
    {
        name: 'Github',
        link: '/u/dashboard/github',
    },
]

export async function loader() {
    try {
        const res = await userDashboardDetails();
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const UserDashLayout = () => {
    const location = useLocation();

    if (location.pathname === '/u/dashboard') {
        return <UserDashboard />
    } else {
        return (
            <>
                <ToastContainer />
                <NewNavbar position='static' />
                <section className='mx-auto w-full max-w-screen-xl px-2.5 md:px-8 min-h-screen h-fit'>
                    <div className='flex gap-7 md:mt-10 h-full'>
                        <div className='w-1/5 bg-eerie-black-2 rounded-xl border border-white border-opacity-5 backdrop-blur-[20px] h-[406px] flex flex-col justify-start items-start pt-8'>
                            {links.map((link, index) => {
                                return (
                                    <NavLink key={index} to={link.link} className={({ isActive }) => isActive ? ' text-blue-500 w-3/4 bg-gray-200 bg-opacity-10  shadow rounded-e-xl' : 'text-white'}>
                                        <p className='p-2 md:p-4 normal-case font-light text-md md:text-2xl tracking-tight'>{link.name}</p>
                                    </NavLink>
                                )
                            })}
                        </div>
                        <div className='w-4/5 bg-eerie-black-2 min-h-screen h-fit rounded-xl border border-white border-opacity-5'>
                            <Outlet />
                        </div>

                    </div>

                </section>
            </>

        )
    }

}

export default UserDashLayout