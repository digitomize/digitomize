import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { RecoilRoot } from "recoil";
import App from "./App";

import "@radix-ui/themes/styles.css";
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import InstallPWAButton from "@components/globals/InstallPWAButton";

import { Helmet } from "react-helmet";
import metaData from "./metaData.json";

const location = window.location.pathname;
const currentPageData = metaData[location];

const defaultTitle = "digitomize";
const defaultDesc = "Empowering Coders and Developers Worldwide";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
    <InstallPWAButton />
    <App />
    </RecoilRoot>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
