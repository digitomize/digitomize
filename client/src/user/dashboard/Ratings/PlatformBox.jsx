import { atcoder, leetcode, codechef, codeforces, geeksforgeeks, codingninjas } from "../../../components/AllAssets";
import PlatformModal from "./PlatformModal";


import React, { useState, useEffect } from "react";

import { Form, Link } from "react-router-dom";

// import Checkbox from "../components/Checkbox";
// import UserDashboard from "./UserDashboard";
import { submitUserFormData, userDashboardDetails } from "../../../../api";
// import { useUserAuth } from '../../context/UserAuthContext'
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../../../components/globals/LoadingScreen";


export default function PlatformBox({ platform }) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    let ratingsData = data?.ratings;
    // console.log("RATINGGSS:", ratingsData);
    const username = data?.personal_data.username;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await userDashboardDetails();
                if (res.data) {
                    setData(res.data);
                    ratingsData = res.data.ratings;
                    // console.log("HM", ratingsData);
                    setFormData({
                        username: username,
                        codeforces: {
                            username: ratingsData?.codeforces.data || "",
                            showOnWebsite: ratingsData?.codeforces?.showOnWebsite || true,
                        },
                        codechef: {
                            username: ratingsData?.codechef.data || "",
                            showOnWebsite: ratingsData?.codechef?.showOnWebsite || true,
                        },

                        leetcode: {
                            username: ratingsData?.leetcode.data || "",
                            showOnWebsite: ratingsData?.leetcode?.showOnWebsite || true,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        username: username,
        codeforces: {
            username: ratingsData?.codeforces.data || "",
            showOnWebsite: ratingsData?.codeforces?.showOnWebsite || true,
        },
        codechef: {
            username: ratingsData?.codechef.data || "",
            showOnWebsite: ratingsData?.codechef?.showOnWebsite || true,
        },

        leetcode: {
            username: ratingsData?.leetcode.data || "",
            showOnWebsite: ratingsData?.leetcode?.showOnWebsite || true,
        },
    });


    const handleInputChangeObjData = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                username: value,
            },
        }));
    };
    const updateShowOnWebsite = (field) => (value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                showOnWebsite: value,
            },
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setIsDisabled(true);
        const res = await submitUserFormData(formData)
            .then(() => {
                setIsDisabled(false);
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
            })
            .catch((err) => {
                toast.error(
                    err.response
                        ? err.response.data.error
                        : err.request
                            ? err.request
                            : err.message,
                    {
                        position: "top-left",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    },
                );
                console.log(err);
                setIsDisabled(false);
            });
        // console.log(res);
    }

    if (loading) {
        return <LoadingScreen />;
    }


    return (
        <>
            <div className="mt-10 bg-dashboardColor shadow-light rounded-lg md:flex items-center gap-8 p-[6px]">
                <div className="grow bg-dashboardDarkerColor self-stretch flex justify-center items-center rounded-[6px] md:max-w-[205px]">
                    <img src={platform.icon} className="w-16 my-4" alt="" srcset="" />
                </div>

                <div className="grow py-5 flex justify-between items-center gap-4">
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