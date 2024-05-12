import React from "react";
import { Link } from "react-router-dom";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const CustomLinkCard = ({ to, bgColor, icon, title, textColor }) => {
  return (
    <Link to={to} className="noCursor w-full ">
      <div
        className={"border-jet border transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#050127] hover:scale-[1.02] w-full h-[250px] p-8"}
      >
        <div className="noCursor w-full h-full flex items-end">
          <div className="noCursor w-full flex flex-col gap-4">
            {icon && React.cloneElement(icon, { size: "18%" })}
            <div className="noCursor flex justify-between items-center w-full">
              <p className={`text-3xl tracking-tight font-medium ${textColor}`}>
                {title}
              </p>
              <BsFillArrowUpRightCircleFill
                color="#F0FFF0"
                className="noCursor phone:w-1/6 phone:h-1/6 ml-2 w-2/4 h-2/4"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CustomLinkCard;
