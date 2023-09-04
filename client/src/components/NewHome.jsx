import "./css/NewHome.css";
import React from "react";
import { useState } from 'react';

export default function Updates() {
  return (
    <div>
      <div className="container m-auto flex flex-row">
        <div className="container select-none flex flex-col items-center text-center w-50 text-[70px]  sm:text-[75px] lg:text-[110px] font-extrabold justify-center">
          <span className="develop w-fit">
            <span className="animated-develop">Compete.</span>
            <div className="develop-shadow"></div>
          </span>
          <span className="preview w-fit">
            <span className="animated-preview">Develop.</span>
            <div className="preview-shadow"></div>
          </span>
          <span className="ship w-fit">
            <span className="animated-ship">Showcase.</span>
            <div className="ship-shadow"></div>
          </span>
        </div>
        <div className="container right-section w-50">
          <div className="mockup-window border bg-base-300">
            <div className="flex justify-center px-4 py-16 bg-base-200">
              Hello!
            </div>
          </div>
          <button className="btn btn-outline btn-info">Info</button>
<button className="btn btn-outline btn-success">Success</button>
<button className="btn btn-outline btn-warning">Warning</button>
<button className="btn btn-outline btn-error">Error</button>
        </div>
      </div>
    </div>
  );
}
