import React, { useState, useEffect } from "react";

import { Form, Link } from "react-router-dom";

// import Checkbox from "../components/Checkbox";
// import UserDashboard from "./UserDashboard";
import { submitUserFormData, userDashboardDetails } from "../../../../api";
// import { useUserAuth } from '../../context/UserAuthContext'
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";
// import NewNavbar from "../../components/globals/Navbar/NewNavbar";
// import DashboardNavbar from "../components/DashboardNavbar";
// import Footer from "../../components/globals/Footer";
import LoadingScreen from "../../../components/globals/LoadingScreen";


// import { MetaData } from "../../components/CustomComponents";
import PlatformBox from "./PlatformBox";

import platformData from "./platformData";
import { MetaData } from "../../../components/CustomComponents";

export async function loader() {
    try {
        const res = userDashboardDetails();
        if (!res.data) {
            return null;
        } else {
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}


export default function Ratings() {

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
                <div class="flex justify-between items-center min-h-[40px]">
                    <div class="flex flex-shrink gap-2 mr-4 items-center min-w-0">
                        <p class="truncate font-medium text-gray-200 text-3xl max-w-[600px]">Integrate your ratings</p>
                    </div>
                </div>
                {
                    platformData.map((platform, index) => (
                        <PlatformBox platform={platform} />
                    ))
                }
            </div>
        </>
    )
};