import { useUserAuth } from "../../../context/UserAuthContext";
import { useState } from "react";
import React from 'react'
import ImageUploader from "../../../components/ImageUploader";
import { useLoaderData } from 'react-router-dom';
import { submitUserFormData } from "../../../../api";
import { toast, ToastContainer } from 'react-toastify';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { MenuItem, Select } from "@mui/material";
import { Form } from "react-router-dom";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Chip from '@mui/material/Chip';


function Socials({ formData, socialFields, handleSocialChange }) {

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <div class="flex-1 mt-8">
                    <h3 class="text-base font-semibold text-gray-200">Connect Your Socials</h3>
                    <p class="mt-3 font-light text-sm text-gray-500">Link your social media profiles to expand your online presence and professional network.</p>
                </div>

                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div class="px-6 py-8 sm:w-9/12">
                        {socialFields.map((field, index) => (
                            <div key={index} className="flex sm:gap-4 gap-3 items-center mt-2">
                                {field.icon}
                                <input style={{ backgroundColor: 'RGB(17, 19, 18)' }}
                                    type="text"
                                    name={field.name}
                                    value={formData.social[field.name]}
                                    placeholder={field.placeholder}
                                    onChange={handleSocialChange}
                                    className="placeholder:text-gray-600 border border-jet rounded px-3 py-[10px] w-full text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Socials;