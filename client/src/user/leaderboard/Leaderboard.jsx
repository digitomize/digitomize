import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import NewNavbar from "../../components/NewNavbar";
import { leaderboardData, rankOnLeaderboard } from "../../../api";
import { OpenInNew, WorkspacePremium, Info } from '@mui/icons-material';
import { Skeleton, Stack, Typography, Tooltip, tooltipClasses, styled } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUserDetails } from "../../context/UserContext";
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Leaderboard() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUserData, setCurrentUserData] = useState(null);
    const { userDetails } = useUserDetails();
    // console.log("USERERER", userDetails);
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip className="custom-bg" {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            color: 'white',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
        },
    }));

    const CustomTooltip = () => {
        return (
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit">Digitomize Rating</Typography>
                        <p className="italic">A unified rating scale that normalizes Codeforces, CodeChef, and LeetCode ratings for easy comparison. </p>
                        <p className="bold">Example:</p>
                        <table className="border border-white rounded-xl">
                            <thead>
                                <tr className="border border-white">
                                    <th className="border border-white">Platform</th>
                                    <th className="border border-white ">Rating</th>
                                    <th className="border border-white ">Digitomize Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-white">
                                    <td className="border border-white ">Codeforces</td>
                                    <td className="border border-white ">1200</td>
                                    <td className="border border-white ">1200</td>
                                </tr>
                                <tr className="border border-white">
                                    <td className="border border-white ">CodeChef</td>
                                    <td className="border border-white ">1579</td>
                                    <td className="border border-white ">1200</td>
                                </tr>
                                <tr className="border border-white">
                                    <td className="border border-white ">LeetCode</td>
                                    <td className="border border-white ">1726</td>
                                    <td className="border border-white ">1200</td>
                                </tr>
                            </tbody>
                        </table>
                    </React.Fragment>
                }
            >
                <button>
                    <Info fontSize="small" />
                </button>
            </HtmlTooltip>
        );
    };

    // useEffect(() => {
    async function fetchLoggedUserData() {
        try {
            const userData = await rankOnLeaderboard(userDetails?.personal_data?.username);
            setCurrentUserData(userData?.data);
            console.log(currentUserData);
        } catch (err) {
            console.log(err);
        }
    }
    // fetchLoggedUserData();
    // }, [userDetails]);

    async function fetchLbData() {
        try {
            console.log(currentPage);
            setLoading(true);
            const res = await leaderboardData(currentPage);
            setTotalPages(res.data.total_pages);
            setData(res.data.leaderboard);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchLoggedUserData();
        fetchLbData();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getRank = (index) => {
        return index + 1 + (currentPage - 1) * 5;
    };

    return (
        <>
            <NewNavbar />
            <div className="phone:w-4/6 w-11/12 mx-auto mt-4 text-center">
                <div className="heading text-center my-4">
                    <h1>
                        Leaderboard
                    </h1>

                </div>
                <div className="overflow-x-auto border-2 border-[#D1E5F4] rounded-xl shadow-[9px_9px_0px_#D1E5F4]">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>CodeChef</th>
                                <th>LeetCode</th>
                                <th>CodeForces</th>
                                <th>
                                    <Stack direction={"row"} className="items-center">
                                        Digitomize Rating
                                        <CustomTooltip />
                                    </Stack>
                                </th>
                                {/* <th>Platform Rating</th> */}
                            </tr>
                        </thead>
                        {
                            (loading)
                                ?
                                <tbody className="w-full">
                                    <tr>
                                        <td colSpan="7">
                                            <div className="m-auto flex flex-col items-center">

                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" />
                                                {/* <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" /> */}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                :
                                <tbody>
                                    {/* rows */}
                                    {data &&
                                        data.map((row, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {getRank(index)}
                                                    {
                                                        (getRank(index) == 1) ? <WorkspacePremium sx={{ color: "#FFD700" }} color="inherit" /> : ""
                                                    }
                                                    {
                                                        (getRank(index) == 2) ? <WorkspacePremium sx={{ color: "#C0C0C0" }} color="inherit" /> : ""
                                                    }
                                                    {
                                                        (getRank(index) == 3) ? <WorkspacePremium sx={{ color: "#CD7F32" }} color="inherit" /> : ""
                                                    }

                                                </td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <a href={"/u/" + row.username} target="_blank">
                                                                <div className="mask mask-squircle w-12 h-12 ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                    {/* You can set the image source dynamically */}
                                                                    <img className="mask mask-hexagon" src={row.picture} alt="Avatar Tailwind CSS Component" />
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <a href={"/u/" + row.username} target="_blank">
                                                                <div className="font-bold">{row.name} <OpenInNew fontSize="small" /> </div>
                                                                <div className="text-sm opacity-50">@{row.username}</div>
                                                                {/* You can display more userDetails details here if needed */}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{row.codechef}</td>
                                                <td>{row.leetcode}</td>
                                                <td>{row.codeforces}</td>
                                                <td>{Math.floor(row.digitomize_rating)}</td>
                                                {/* <td>{row.platform_rating}</td> */}
                                            </tr>
                                        ))}
                                    {currentUserData && userDetails &&
                                        <tr key={currentUserData.user_position} className="bg-[#252525]">
                                            <td>
                                                {currentUserData.user_position || "Not ranked"}
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <a href={"/u/" + userDetails.username} target="_blank">
                                                            <div className="mask mask-squircle w-12 h-12 ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                {/* You can set the image source dynamically */}
                                                                <img className="mask mask-hexagon" src={userDetails.personal_data.picture} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <a href={"/u/" + userDetails.personal_data.username} target="_blank">
                                                            <div className="font-bold">{userDetails.personal_data.name}{"(YOU)"} <OpenInNew fontSize="small" /> </div>
                                                            <div className="text-sm opacity-50">@{userDetails.personal_data.username}</div>
                                                            {/* You can display more userDetails details here if needed */}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{currentUserData.ratings.codechef || 0}</td>
                                            <td>{currentUserData.ratings.leetcode || 0}</td>
                                            <td>{currentUserData.ratings.codeforces || 0}</td>
                                            <td>{Math.floor(currentUserData.ratings.digitomize_rating)}</td>
                                            {/* <td>{userDetails.platform_rating}</td> */}
                                        </tr>
                                    }
                                </tbody>
                        }
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>CodeChef</th>
                                <th>LeetCode</th>
                                <th>CodeForces</th>
                                <th>
                                    <Stack direction={"row"} className="items-center">
                                        Digitomize Rating
                                        <CustomTooltip />
                                    </Stack>
                                </th>
                                {/* <th>Platform Rating</th> */}
                            </tr>
                        </tfoot>
                    </table>
                </div>


                {/* <div className="join my-8 mx-auto">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <>
                            <button className={"join-item btn" + (currentPage - 1 == i ? " btn-active" : "")} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>

                        </>
                    ))}
                </div> */}
                <ThemeProvider theme={theme}>
                    <div className="pagination py-8 mx-auto w-fit">
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" className="text-white" siblingCount={0} boundaryCount={1} shape="rounded" sx={{ color: "pink" }} style={{ color: "pink" }} />
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}
