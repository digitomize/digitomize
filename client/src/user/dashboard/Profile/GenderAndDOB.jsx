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



function GenderAndDOB() {

    const { personal_data, social } = useLoaderData();
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState({
        email: personal_data.email,
        username: personal_data.username,
        name: personal_data.name || "",
        picture: personal_data.picture,
        dateOfBirth: {
            data: personal_data.dateOfBirth.data || "",
            showOnWebsite: personal_data.dateOfBirth.showOnWebsite || true,
        },
        bio: {
            data: personal_data.bio.data || "",
            showOnWebsite: personal_data.bio.showOnWebsite || true,
        },
        phoneNumber: {
            data: personal_data.phoneNumber.data || "",
            showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
        },
    });

    const dobChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: {
                ...prevData.dateOfBirth,
                data: dayjs(date),
            },

        }));
    };


    const handleInputChangeObjData = (event) => {
        console.log("EVENT:", event);
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                data: value,
            },
        }));
    };
    const handleInputChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    async function handleSubmit(event) {
        event.preventDefault();
        setIsDisabled(true);
        const res = await submitUserFormData(formData)
            .then(() => {
                toast.success("updated successfully!", {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setIsDisabled(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(err);
                setIsDisabled(false);
            });

        // console.log(res);
    }
    const { user } = useUserAuth();
    const BIO_LIMIT = 250;

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <div class="flex-1 mt-8">
                    <h3 class="text-base font-semibold text-gray-200">Pronouns and Date of Birth</h3>
                    {/* <p class="mt-3 font-light text-sm text-gray-500">Please enter your full name, or a display name you are comfortable with.</p>
                    <p class="mt-3 font-light text-sm text-gray-500">Click on the avatar to upload a custom one from your files..</p> */}
                </div>

                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div class="px-6 py-8">
                        <div className="sm:w-9/12">
                            <div className="label">
                                <label class="text-xs font-medium text-secondary">Personal pronouns</label>
                            </div>
                            <Select className="w-full"
                                id="gender"
                                name="gender"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    backgroundColor: 'RGB(17, 19, 18)',
                                    fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">
                                    <em>Prefer not to say</em>
                                </MenuItem>
                                <MenuItem value={'He/Him'}>He/Him</MenuItem>
                                <MenuItem value={'She/Her'}>She/Her</MenuItem>
                                <MenuItem value={'They/Them'}>They/Them</MenuItem>
                            </Select>
                        </div>
                        <div className="sm:w-9/12 mt-5">
                            <div className="label">
                                <label class="text-xs font-medium text-secondary">Date of Birth</label>
                            </div>
                            <DatePicker className="text-sm w-full" onChange={dobChange} name="dateOfBirth" id="dateOfBirth" sx={{
                                backgroundColor: 'RGB(17, 19, 18)',
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenderAndDOB;