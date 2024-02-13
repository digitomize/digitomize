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

import { ListItem, ListItemText, Skeleton, List } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Switch } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";




function BasicInfo({ platformsData, formData, setFormData, handleToggleChange }) {
    const BIO_LIMIT = 250;

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">

                <div class="flex-1 mt-8">
                    <h3 class="text-base font-semibold text-gray-200">Select your platforms</h3>
                    <p class="mt-3 font-light text-sm text-gray-500">Customize your coding experience by selecting preferred platforms to suit your needs.</p>
                    {/* <p class="mt-3 font-light text-sm text-gray-500">Click on the avatar to upload a custom one from your files..</p> */}
                </div>


                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div
                        className="px-6 py-8"
                    >
                        <List className="w-fit">
                            <div className="platforms flex flex-col">
                                {platformsData.map(({ name, icon }) => (
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
                                ))}
                            </div>
                        </List>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasicInfo;