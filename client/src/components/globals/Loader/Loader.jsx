import React from "react";
import "./Loader.css";
import { dynamicLogo } from "../../AllAssets";
const Loader = () => {
  return (
    <div className="loading-screen">
      <img
        src={dynamicLogo}
        alt="logo"
        className="max-w-[7rem] max-h-[7rem] mb-2 loader"
      />
    </div>
  );
};

export default Loader;
