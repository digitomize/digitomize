import React from 'react'
import { LockOutlined, TrendingUp } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

const navlinks = [
    {
        name: 'Contests',
        icon: <TrendingUp />,
        link: '/contests'
    },
    {
        name: 'Hackathons',
        icon: <LockOutlined />,
        link: '/hackathons'
    },
    {
        name: 'Internships',
        icon: <LockOutlined />,
        link: '/internships'
    },
    {
        name: 'Jobs',
        icon: <LockOutlined />,
        link: '/jobs'
    }
]

const ContestPageLayout = () => {
    return (
        <div className="w-11/12 mx-auto antialiased">
            <div className="heading w-4/5 mx-auto text-center my-4">
                <h1 className="text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
                    <span>All at</span>
                    <span className="block mt-1 md:mt-6">
                        <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">one</span>
                        place
                    </span>
                </h1>

            </div>
            <div className="buttons flex gap-4 justify-center my-8 flex-wrap">
                {
                    navlinks.map((link, idx) => {
                        return (
                            <NavLink key={idx} to={link.link} className={({ isActive }) => isActive ? 'btn bg-custom-blue text-white' : 'btn btn-outline'} >
                                {link.name}
                                {link.icon}
                            </NavLink>
                        )
                    })
                }
            </div>
            <Outlet />
        </div>
    )
}

export default ContestPageLayout