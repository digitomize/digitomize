import PlatformModal from "./PlatformModal";
import React from "react";

export default function PlatformBox({formData,handleInputChangeObjData, handleSubmit, platform }) {

    return (
        <>
            <div className="mt-10 bg-dashboardColor shadow-light rounded-lg md:flex items-center gap-8 p-[6px]">
                <div className="grow bg-dashboardDarkerColor self-stretch flex justify-center items-center rounded-[6px] md:max-w-[205px]">
                    <img src={platform.icon} className="w-16 my-4" alt="" srcset="" />
                </div>

                <div className="grow py-5 flex justify-between items-center gap-4 max-phone:flex-col">
                    <div className="ml-6 md:ml-0 max-w-[350px]">
                        <h3 className="text-base capitalize font-semibold text-gray-200">{platform.name}</h3>
                        <p className="mt-1 font-light text-sm text-gray-500">{platform.content}</p>
                    </div>
                    <div className="mr-6 justify-self-end">
                        <PlatformModal formData={formData} handleInputChangeObjData={handleInputChangeObjData} handleSubmit={handleSubmit} btnText={"Connect"} platform={platform} />
                    </div>
                </div>

            </div>
        </>
    )
}