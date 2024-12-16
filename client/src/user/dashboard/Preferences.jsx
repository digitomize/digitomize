import React, { useState, useEffect } from "react";

import { Form, Link } from "react-router-dom";

import Checkbox from "../components/Checkbox";
import UserDashboard from "./UserDashboard";
import {
  changeUserPreferences,
  submitUserFormData,
  userDashboardDetails,
} from "../../../api";
// import { useUserAuth } from '../../context/UserAuthContext'
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { Switch, FormControlLabel } from "@mui/material";
import NewNavbar from "../../components/globals/Navbar/NewNavbar";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../../components/globals/Footer";
import LoadingScreen from "../../components/globals/LoadingScreen";

import leetcode from "../../assets/leetcode.svg";
import codechef from "../../assets/codechef.svg";
import codeforces from "../../assets/codeforces.svg";
import geeksforgeeks from "../../assets/geeksforgeeks.svg";
import codingninjas from "../../assets/codingninjas.png";
import { MetaData } from "../../components/CustomComponents";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
];
const platforms = [
  "leetcode",
  "codingninjas",
  "geeksforgeeks",
  "codechef",
  "codeforces",
];

export async function loader() {
  try {
    const res = userDashboardDetails();
    if (!res.data) {
      return null;
    } else {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default function Preferences() {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          setPreferences(res.data.personal_data.preferences);
          const contestPreference =
            res.data.personal_data.preferences?.contest_notifs;
          console.log("HM", contestPreference);
          setFormData({
            contest_notifs: {
              atcoder: contestPreference.atcoder,
              codeforces: contestPreference.codeforces,
              codechef: contestPreference.codechef,
              leetcode: contestPreference.leetcode,
              geeksforgeeks: contestPreference.geeksforgeeks,
              codingninjas: contestPreference.codingninjas,
            },
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    contest_notifs: {
      atcoder: false,
      codeforces: false,
      codechef: false,
      leetcode: false,
      geeksforgeeks: false,
      codingninjas: false,
    },
  });

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  // console.log(ratingsData);

  const handleToggleChangeObjData = async (event) => {
    const { name } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      contest_notifs: {
        ...prevData.contest_notifs,
        [name]: !prevData.contest_notifs[name],
      },
    }));

    const response = changeUserPreferences(
      name,
      !formData.contest_notifs[name],
    ).catch((err) => {
      // setting old data back
      setFormData((prevData) => ({
        ...prevData,
        contest_notifs: {
          ...prevData.contest_notifs,
          [name]: !prevData.contest_notifs[name],
        },
      }));
      setIsDisabled(false);
    });

    toast.promise(response, {
      pending: "Updating preferences... 🤔",
      success: "Preferences updated successfully! 🎉",
      error: "Failed to update preferences! 😢",
    });

    await response;
    console.log("response", response);
  };

  if (preferences) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Switch
            checked={formData.contest_notifs.atcoder}
            onChange={handleToggleChangeObjData}
            name="atcoder"
          />
          {/* <Switch checked={formData.contest_notifs.atcoder} onChange={handleToggleChangeObjData} name="atcoder" />
          <FormControlLabel control={<Switch checked={formData.contest_notifs.atcoder} onChange={handleToggleChangeObjData} name="atcoder" />} label="Disabled" /> */}
        </ThemeProvider>
      </>
    );
  }
}
