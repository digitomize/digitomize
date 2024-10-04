import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

import "/src/components/css/Home.css";
import SectionOne from "../../components/Home/SectionOne";
import SectionTwo from "../../components/Home/SectionTwo";
import SectionThree from "../../components/Home/SectionThree";
import Footer from "../../components/globals/Footer";
import { messaging } from "../../../firebase";
import { getToken } from "firebase/messaging";
import { MetaData } from "../../components/CustomComponents";

import ScrollToTop from "../../components/globals/ScrollToTop";
// import { isLoggedIn, sendDeviceID } from "../../../api";

export default function Homepage() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1 to get current month in range 1-12

  const shouldShowSnowfall = currentMonth >= 10 || currentMonth <= 3; // Show snowfall from October to March

  // useEffect(() => {
  //   async function requestPermission() {
  //     const loggedIn = await isLoggedIn();
  //     if (loggedIn) {
  //       const permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_REACT_APP_VAPID_KEY });
  //         await sendDeviceID(token);
  //       }
  //     }
  //   }

  //   requestPermission();

  // }, []);

  return (
    <>
      <MetaData path="home" />
      <div>
        <div id="home" className="antialiased">
          {shouldShowSnowfall && (
            <Snowfall
              snowflakeCount={50}
              speed={[0.2, 0.5]}
              wind={[-0.2, 0]}
              style={{ position: "fixed", zIndex: -1 }}
            />
          )}

          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <ScrollToTop toid={"home"} h={2} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
