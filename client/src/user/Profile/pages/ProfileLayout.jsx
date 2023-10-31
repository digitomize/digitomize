import React, { Suspense } from 'react'
import NewNavbar from '../../../components/NewNavbar'
import { Outlet, useLoaderData, defer, Await } from 'react-router-dom'
import { getProfileData } from '../../../../api'

export async function loader({ params }) {
    const username = params.username;
    try {
        const profileDataPromise = getProfileData(username);

        return defer({ profileData: profileDataPromise })
    } catch (err) {
        console.log(err);
        return null
    }
}

function ProfileLayout() {
    const loaderData = useLoaderData();
    return (
        <>
            <NewNavbar position='static' />
            <Suspense fallback={<h1>loading.......</h1>}>
                <Await resolve={loaderData.profileData}>
                    {(loadedProfileData) => {
                        console.log(loadedProfileData)
                        return (
                            <Outlet context={loadedProfileData} />
                        )
                    }}
                </Await>
            </Suspense>
        </>
    )
}

export default ProfileLayout