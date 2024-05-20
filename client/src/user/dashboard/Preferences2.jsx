import React, { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import UserDashboard from "./UserDashboard";
import { changeUserPreferences, submitUserFormData, userDashboardDetails } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { ListItem, ListItemText, Skeleton, List } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Switch } from '@mui/material';
import NewNavbar from "../../components/globals/Navbar/NewNavbar";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../../components/globals/Footer";
import LoadingScreen from "../../components/globals/LoadingScreen";
import { MetaData } from "../../components/CustomComponents";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { atcoder, leetcode, codechef, codeforces, geeksforgeeks, codingninjas } from "../../components/AllAssets";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const platformsData = [
  { name: "leetcode", icon: leetcode },
  { name: "codingninjas", icon: codingninjas },
  { name: "geeksforgeeks", icon: geeksforgeeks },
  { name: "codechef", icon: codechef },
  { name: "codeforces", icon: codeforces },
  { name: "atcoder", icon: atcoder },
];

export async function loader() {
  try {
    const res = userDashboardDetails();
    return res?.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function Preferences() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          setFormData({
            contest_notifs: res.data.personal_data.preferences.contest_notifs,
          });
        }
        // console.log("OKK:",formData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    contest_notifs: Object.fromEntries(platformsData.map(({ name }) => [name, false])),
  });

  const handleToggleChange = async (event) => {
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
        pending: 'Updating preferences... 🤔',
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

  const renderSwitches = () => (
    <>
      <div className="w-7/12 rounded-md flex border border-jet rounded-xl flex-col space-y-[23px] bg-cardsColor font-['Geist']">
        <div
          className="p-8"
        >
          <p className="text-4xl max-sm:text-2xl font-bold normal-case text-white">
            Manage your preferences
          </p>
          <p className="text-sm max-sm:text-base font-normal text-white italic">
            {"(Choose the platforms you want to receive contest notifications from.)"}
          </p>

          <List className="w-fit">
            <div className="platforms flex flex-col">
              {platformsData.map(({ name, icon }) => (
                <ThemeProvider key={name} theme={theme}>
                  <ListItem>
                    {/* <div className="flex flex-row"> */}
                      <ListItemIcon>
                        <img src={icon} alt={name} className="w-8" />
                      </ListItemIcon>
                      <ListItemText id={`switch-list-label-${name}`} primary={name} />
                      <Switch checked={formData.contest_notifs[name]} onChange={handleToggleChange} name={name} inputProps={{
                        'aria-labelledby': `switch-list-label-${name}`,
                      }} />
                    {/* </div> */}
                  </ListItem>
                </ThemeProvider>
              ))}
            </div>
          </List>
        </div>
      </div>
    </>
  );

  return (
    <>
      {loading ? <LoadingScreen /> : renderSwitches()}
    </>
  );
}
