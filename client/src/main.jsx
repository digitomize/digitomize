import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

import '@radix-ui/themes/styles.css';
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import InstallPWAButton from "/src/components/globals/InstallPWAButton";

import { Helmet } from "react-helmet";
import metaData from "./metaData.json";

const location = window.location.pathname;
const currentPageData = metaData[location];

const defaultTitle = "digitomize";
const defaultDesc = "Empowering Coders and Developers Worldwide";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Helmet>
      <title>{currentPageData?.title || defaultTitle}</title>
      <meta
        name="description"
        content={currentPageData?.description || defaultDesc}
      />
    </Helmet>
    <InstallPWAButton />
        <App />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
