import React from "react";
import ImageUploader from "../../../components/ImageUploader";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { submitUserFormData } from "../../../../api";
import { toast, ToastContainer } from "react-toastify";
import BasicInfo from "./Selecting";
import { changeUserPreferences, userDashboardDetails } from "../../../../api";

import {
  atcoder,
  leetcode,
  codechef,
  codeforces,
  geeksforgeeks,
  codingninjas,
} from "../../../components/AllAssets";

import LoadingScreen from "../../../components/globals/LoadingScreen";
import { MetaData } from "../../../components/CustomComponents";

const platformsData = [
  { name: "leetcode", icon: leetcode },
  { name: "codingninjas", icon: codingninjas },
  { name: "geeksforgeeks", icon: geeksforgeeks },
  { name: "codechef", icon: codechef },
  { name: "codeforces", icon: codeforces },
  { name: "atcoder", icon: atcoder },
];

function Preferences() {
  const loaderData = useLoaderData();
  // console.log(loaderData);
  // ! CAN USE THIS BUT NO LOADING SCREEN - need to check this

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        // console.log(" res", res);
        if (res.data) {
          setFormData({
            contest_notifs: res.data.personal_data.preferences.contest_notifs,
          });
        }
        // console.log("OKK:", formData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    contest_notifs: Object.fromEntries(
      platformsData.map(({ name }) => [name, false]),
    ),
  });

  const handleToggleChange = async (event) => {
    // console.log(event);
    const { name } = event.target;
    const toggledValue = !formData.contest_notifs[name];
    setFormData((prevData) => ({
      ...prevData,
      contest_notifs: {
        ...prevData.contest_notifs,
        [name]: toggledValue,
      },
    }));

    try {
      const response = changeUserPreferences(name, toggledValue);
      toast.promise(response, {
        pending: "Updating preferences... 🤔",
        success: `Preference for ${name} updated to ${toggledValue} successfully! 🎉`,
        error: {
          render({ data }) {
            // console.log(data.message);
            return `${data.message}`;
          },
          icon: "✅",
        },
      });
      // console.log(response);
    } catch (err) {
      console.error(err);
      // Revert toggle state on failure
      setFormData((prevData) => ({
        ...prevData,
        contest_notifs: {
          ...prevData.contest_notifs,
          [name]: !toggledValue,
        },
      }));
    }
  };
  if (loading) {
    return (
      <div className="w-full">
        <LoadingScreen />;
      </div>
    );
  }

  return (
    <>
      <MetaData path="u/dashboard/preferences" />
      <ToastContainer />
      <div className="bg-dashboardDarkColor font-['Geist']">
        <div className="flex justify-between items-center min-h-[40px]">
          <div className="flex flex-shrink gap-2 mr-4 items-center min-w-0">
            <p className="truncate font-medium text-gray-200 text-3xl max-w-[600px]">
              Preferences
            </p>
          </div>
        </div>
        <form>
          <BasicInfo
            platformsData={platformsData}
            formData={formData}
            setFormData={setFormData}
            handleToggleChange={handleToggleChange}
          />

          {/* <GenderAndDOB handleInputChange={handleInputChange} dobChange={dobChange} /> */}
          {/* 
          <SubmitBtn handleSubmit={handleSubmit} /> */}
        </form>
      </div>
    </>
  );
}

export default Preferences;
