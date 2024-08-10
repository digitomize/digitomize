import React, { useState, useEffect } from "react";
import { submitUserFormData, userDashboardDetails } from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../../../components/globals/LoadingScreen";
import PlatformBox from "./PlatformBox";
import platformData from "./platformData";
import { MetaData } from "../../../components/CustomComponents";
import { uniqueToast } from "../../../core/utils/unique-toast";

export async function loader() {
    try {
        const res = userDashboardDetails();
        if (!res.data) {
            return null;
        } else {
            return res.data;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


export default function Ratings() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const toastId = uniqueToast();
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
                console.error(err);
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
    async function handleSubmit() {
        // event.preventDefault();
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
                    toastId: toastId
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
                        toastId: toastId
                    },
                );
                console.error(err);
                setIsDisabled(false);
            });
        // console.log(res);
    }


    if (loading) {
        return (
            <>
                <LoadingScreen />
            </>
        );
    }

    // console.log(ratingsData);


    return (
        <>
            <MetaData path="u/dashboard/ratings" />
            <ToastContainer />
            <div className="container bg-dashboardDarkColor font-['Geist'] w-auto">
                <div className="flex justify-between items-center min-h-[40px]">
                    <div className="flex flex-shrink gap-2 mr-4 items-center min-w-0">
                        <p className="truncate font-medium text-gray-200 text-3xl max-w-[600px] max-phone:hidden">Integrate your ratings</p>
                        <p className="truncate font-medium text-gray-200 text-3xl max-w-[600px] phone:hidden">Ratings</p>
                    </div>
                </div>
                {
                    platformData.map((platform, index) => (
                        <PlatformBox formData={formData} handleInputChangeObjData={handleInputChangeObjData} handleSubmit={handleSubmit} platform={platform} key={index}/>
                    ))
                }
            </div>
        </>
    );
}