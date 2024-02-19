import React, { Suspense } from "react";
import NewNavbar from "../../../components/globals/Navbar/NewNavbar";
import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { getProfileData } from "../../../../api";
import LoadingScreen from "@components/globals/LoadingScreen";
import { Helmet } from "react-helmet";
export async function loader({ params }) {
  const username = params.username;
  try {
    const profileDataPromise = getProfileData(username);

    return defer({ profileData: profileDataPromise });
  } catch (err) {
    console.log(err);
    return null;
  }
}

function ProfileLayout() {
  const loaderData = useLoaderData();
  return (
    <>
      <NewNavbar position="static" />
      <Suspense fallback={<LoadingScreen logout={false} />}>
        <Await resolve={loaderData.profileData}>
          {(loadedProfileData) => {
            // console.log(loadedProfileData);
            return (
              <>
                <Helmet>
                  <title>
                    {loadedProfileData.personal_data.name} | Digitomize
                  </title>

                  {/* Page Description */}
                  <meta
                    name="description"
                    content={
                      `${loadedProfileData.personal_data.bio?.slice(0, 200) ||
                      loadedProfileData.personal_data.name} | Check contest ratins and connect today! - Find more about ${loadedProfileData.personal_data.name} on Digitomize`
                    }
                  />

                  {/* Robots Meta Tag */}
                  <meta name="robots" content="index, follow" />

                  {/* Open Graph Tags (Facebook) */}
                  <meta property="og:type" content="website" />
                  <meta
                    property="og:url"
                    content={`/u/${loadedProfileData.personal_data.username}`}
                  />
                  <meta
                    property="og:title"
                    content={loadedProfileData.personal_data.name}
                  />
                  <meta
                    property="og:description"
                    content={
                      `${loadedProfileData.personal_data.bio?.slice(0, 200) ||
                      loadedProfileData.personal_data.name} | Check contest ratins and connect today! - Find more about ${loadedProfileData.personal_data.name} on Digitomize`
                    }
                  />
                  {/* <meta property="og:description" content={loadedProfileData.personal_data.bio?.slice(0, 200) ?? loadedProfileData.personal_data.name ?? ''} /> */}

                  <meta
                    property="og:image"
                    content={loadedProfileData.personal_data.picture}
                  />
                  <meta
                    property="og:url"
                    content={`/u/${loadedProfileData.personal_data.username}`}
                  />

                  {/* Twitter Meta Tags */}
                  <meta
                    name="twitter:title"
                    content={loadedProfileData.personal_data.name}
                  />
                  <meta
                    name="twitter:description"
                    content={
                      `${loadedProfileData.personal_data.bio?.slice(0, 200) ||
                      loadedProfileData.personal_data.name} | Check contest ratins and connect today! - Find more about ${loadedProfileData.personal_data.name} on Digitomize`
                    }
                  />
                  <meta
                    name="twitter:image"
                    content={loadedProfileData.personal_data.picture}
                  />
                  <meta name="twitter:card" content="summary" />

                  {/* Canonical URL */}
                  <link
                    rel="canonical"
                    href={`/u/${loadedProfileData.personal_data.username}`}
                  />
                </Helmet>
                <Outlet context={loadedProfileData} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default ProfileLayout;
