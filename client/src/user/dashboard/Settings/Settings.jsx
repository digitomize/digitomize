import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { submitUserFormData } from "../../../../api";
import { MetaData } from "../../../components/CustomComponents";
import Username from "./Username";
import { uniqueToast } from "../../../core/utils/unique-toast";

function Settings() {
    const { personal_data } = useLoaderData();
    const [isDisabled, setIsDisabled] = useState(false);
    const toastId = uniqueToast();
    const [formData, setFormData] = useState({
        username: personal_data.username
    }
    );
    const handleInputChange = (event) => {
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
                    toastId: toastId
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
                    toastId: toastId
                });
                console.error(err);
                setIsDisabled(false);
            });

        // console.log(res);
    }

    return (
        <>
            <MetaData path="u/dashboard/settings" />
            <ToastContainer />
            <div className="bg-dashboardDarkColor font-['Geist']">
                <div class="flex justify-between items-center min-h-[40px]">
                    <div class="flex flex-shrink gap-2 mr-4 items-center min-w-0">
                        <p class="truncate font-medium text-gray-200 text-3xl max-w-[600px]">Settings</p>
                    </div>
                </div>
                <form >
                    <Username username={formData.username} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isDisabled={isDisabled} />
                </form>

            </div>
        </>
    )
}

export default Settings