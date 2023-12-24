import React, { useEffect, useState } from "react";
import {
  useLocation,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  leetcode,
  codechef,
  codeforces,
  logo,
} from "../../components/AllAssets";
import NewNavbar from "../../components/globals/NewNavbar";
import { leaderboardData, rankOnLeaderboard } from "../../../api";
import { OpenInNew, Info } from "@mui/icons-material";
import {
  outlinedInputClasses,
  Skeleton,
  Stack,
  Typography,
  Tooltip,
  tooltipClasses,
  styled,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useUserDetails } from "../../context/UserContext";
import Rank from "./components/Rank";
import Snowfall from "react-snowfall";
import SnowFlakes from "../../components/Home/components/SnowFlakes";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Leaderboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [currentUserData, setCurrentUserData] = useState(null);
  const { userDetails } = useUserDetails();
  const [top3, setTop3] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(
    searchParams.get("platform") || "",
  );
  const [name, setName] = useState("");
  const [selectedRating, setSelectedRating] = useState("digitomize");
  const platforms = ["leetcode", "codechef", "codeforces"];
  const platformsIcon = [leetcode, codechef, codeforces];
  const ratings = ["digitomize", "codechef", "leetcode", "codeforces"];
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [isSnowfallActive, setSnowfallActive] = useState(true);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  // console.log("USERERER", userDetails);
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip className="custom-bg" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: "white",
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
            <p className="italic">
              A unified rating scale that normalizes Codeforces, CodeChef, and
              LeetCode ratings for easy comparison.{" "}
            </p>
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

  useEffect(() => {
    fetchLoggedUserData();
  }, [userDetails]);

  async function fetchLoggedUserData() {
    try {
      const userData = await rankOnLeaderboard(
        userDetails?.personal_data?.username,
      );
      setCurrentUserData(userData?.data);
      // console.log(currentUserData);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchLbData() {
    try {
      // console.log(currentPage);
      setLoading(true);
      const res = await leaderboardData(currentPage, selectedPlatform);
      setTotalPages(res.data.total_pages);
      setData(res.data.leaderboard);
      setTop3(res.data.top3);
      console.log(res.data);
      console.log(res.data.leaderboard);
      console.log(top3[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLbData();
    fetchLoggedUserData();
  }, [currentPage, selectedPlatform]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    if (selectedPlatform.length != 0)
      setSearchParams({ platform: selectedPlatform, page: value });
    else setSearchParams({ page: value });
  };

  const getRank = (index) => {
    return index + 4 + (currentPage - 1) * 5;
  };
  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedPlatform(event.target.value);
    if (event.target.value.length !== 0)
      setSearchParams({ platform: event.target.value, page: currentPage });
    else {
      searchParams.delete("platform");
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      {isSnowfallActive && <Snowfall snowflakeCount={70} speed={[0, 0.7]} wind={[0, 0.5]} />}
      <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="top-left" />
      <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="bottom-right" />
      <NewNavbar position="static" />
      <div className="text-white text-center my-4  flex flex-col items-center justify-center">
        <h1 className="max-sm:text-[20px] max-sm:leading-6 leading-[60px]">
          One Scoreboard for
          <br />
          All Your{" "}
          <span className="bg-[#1584FF] py-[1px] sm:py-1">
            &nbsp;Coding Battles&nbsp;
          </span>
        </h1>
        <div className="border border-[#25478B] max-sm:text-[14px] bg-[#004CE454] rounded-lg w-fit px-4 py-1 mt-3 flex flex-row items-center justify-center">
          Share the board now
          <svg
            className="ml-2 cursor-pointer max-sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="#fff"
          >
            <path
              d="M10 12C9.44444 12 8.97222 11.825 8.58333 11.475C8.19444 11.125 8 10.7 8 10.2C8 10.13 8.00556 10.0574 8.01667 9.9822C8.02778 9.907 8.04445 9.8396 8.06667 9.78L3.36667 7.32C3.17778 7.47 2.96667 7.5876 2.73333 7.6728C2.5 7.758 2.25556 7.8004 2 7.8C1.44444 7.8 0.972222 7.625 0.583333 7.275C0.194444 6.925 0 6.5 0 6C0 5.5 0.194444 5.075 0.583333 4.725C0.972222 4.375 1.44444 4.2 2 4.2C2.25556 4.2 2.5 4.2426 2.73333 4.3278C2.96667 4.413 3.17778 4.5304 3.36667 4.68L8.06667 2.22C8.04445 2.16 8.02778 2.0926 8.01667 2.0178C8.00556 1.943 8 1.8704 8 1.8C8 1.3 8.19444 0.875 8.58333 0.525C8.97222 0.175 9.44444 0 10 0C10.5556 0 11.0278 0.175 11.4167 0.525C11.8056 0.875 12 1.3 12 1.8C12 2.3 11.8056 2.725 11.4167 3.075C11.0278 3.425 10.5556 3.6 10 3.6C9.74444 3.6 9.5 3.5576 9.26667 3.4728C9.03333 3.388 8.82222 3.2704 8.63333 3.12L3.93333 5.58C3.95556 5.64 3.97222 5.7076 3.98333 5.7828C3.99444 5.858 4 5.9304 4 6C4 6.07 3.99444 6.1426 3.98333 6.2178C3.97222 6.293 3.95556 6.3604 3.93333 6.42L8.63333 8.88C8.82222 8.73 9.03333 8.6126 9.26667 8.5278C9.5 8.443 9.74444 8.4004 10 8.4C10.5556 8.4 11.0278 8.575 11.4167 8.925C11.8056 9.275 12 9.7 12 10.2C12 10.7 11.8056 11.125 11.4167 11.475C11.0278 11.825 10.5556 12 10 12Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center max-phone:gap-6 phone:gap-12 phone:w-4/6 w-11/12 mx-auto mt-8 h-fit">
        <Rank
          color="#C0C0C0"
          pt="4"
          user={top3[1]}
          selectedPlatform={selectedPlatform}
        />
        <Rank
          color="#FFD700"
          pt="0"
          user={top3[0]}
          selectedPlatform={selectedPlatform}
        />
        <Rank
          color="#CD7F32"
          user={top3[2]}
          selectedPlatform={selectedPlatform}
        />
      </div>
      <div className="phone:w-4/6 w-11/12 mx-auto flex flex-row justify-between items-center mt-8">
        <div>
          <Box
            className={"bg-[#474748] w-[230px] rounded-[8px] max-sm:hidden "}
            component="form"
            sx={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            <TextField
              id="filled-search"
              label="username "
              type="search"
              variant="filled"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
              onKeyDown={(event) => {
                if (event.key === "Enter") event.preventDefault();
              }}
              sx={{
                color: "#fff",
                fontSize: 16,
              }}
              InputLabelProps={{
                style: { color: "white" }, // Change 'green' to your desired label color
              }}
              InputProps={{
                style: { color: "white" }, // Change 'lightblue' to your desired background color
              }}
            />
          </Box>
        </div>
        <div>
          <FormControl
            variant="filled"
            className={
              "bg-[#474748] rounded-[8px] sm:w-[165px] w-[135px] sm:text-[16px] text-[12px]"
            }
          >
            <InputLabel
              id="demo-simple-select-filled-label"
              sx={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
              }}
              className={"w-full"}
            >
              select platform
            </InputLabel>
            <Select
              InputLabelProps={{
                style: { color: "white" }, // Change 'green' to your desired label color
              }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedPlatform}
              className={"bg-[#474748] text-white"}
              onChange={handleChange}
              sx={{
                color: "#fff",
                fontSize: 16,
              }}
            >
              <MenuItem value="">
                <h2 className="text-black">None</h2>
              </MenuItem>
              {platforms.map((platform, idx) => (
                <MenuItem key={platform} value={platform}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="mr-[5px] ">
                      <img
                        src={platformsIcon[idx]}
                        alt="a"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </span>
                    <span className="sm:text-[16px] text-[12px]">
                      {platform}
                    </span>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="phone:w-4/6 w-[95%] mx-auto mt-4 text-center text-white">
        <div className=" rounded-[20px] max-phone:overflow-x-hidden overflow-x-scroll">
          <table
            className={`table  ${screenSize.width <= 435 ? "table-xs" : ""
              }  bg-[#252525]  w-full`}
          >
            {/* head */}
            <thead className="bg-[#474747] text-white text-center max-sm:text-[12px]">
              <tr className="">
                <th>rank</th>
                <th>user</th>
                <th className="max-sm:hidden">codechef</th>
                <th className="max-sm:hidden">leetcode</th>
                <th className="max-sm:hidden">codeforces</th>
                <th className="max-sm:hidden">
                  <div className="items-center flex flex-row justify-center gap-x-1 w-full">
                    digitomize rating
                    <CustomTooltip />
                  </div>
                </th>
                <th className="sm:hidden">
                  <FormControl fullWidth variant="filled">
                    <InputLabel
                      sx={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      id="demo-simple-select-label"
                    >
                      Rating
                    </InputLabel>
                    <Select
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                      className="text-white"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedRating}
                      label="Rating"
                      onChange={handleRatingChange}
                    >
                      {ratings.map((rating, idx) => (
                        <MenuItem key={rating} value={rating}>
                          <div style={{ fontSize: 12 }}>
                            <span className="sm:text-[16px] text-[12px] ">
                              {rating}
                            </span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </th>
                {/* <th>Platform Rating</th> */}
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="7">
                    <div className="m-auto flex flex-col items-center">
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />
                      {/* <Skeleton variant="rounded" width={"100%"} height={"2rem"} sx={{ bgcolor: "grey.600" }} className="my-2" /> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {/* rows */}
                {data &&
                  data
                    .filter((obj) => obj.username.includes(name))
                    .map((row, index) => (
                      <tr
                        key={index}
                        className="bg-[#323131] text-center rounded-md  "
                      >
                        <td>#{getRank(index)}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <Link to={"/u/" + row.username}>
                                <div className="mask mask-circle sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] ring ring-primary ring-offset-base-100 ring-offset-2">
                                  {/* You can set the image source dynamically */}
                                  <img
                                    className="mask mask-circle"
                                    src={row.picture}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </Link>
                            </div>
                            <div>
                              <Link to={"/u/" + row.username}>
                                <div className="font-semibold text-left sm:text-[14px] text-[12px] ">
                                  {row.name.toLowerCase()}{" "}
                                  <OpenInNew style={{ fontSize: "10px" }} />{" "}
                                </div>
                                <div className="  sm:text-[11px] text-[8px] font-light text-left">
                                  @{row.username}
                                </div>
                                {/* You can display more userDetails details here if needed */}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="max-sm:hidden">{row.codechef}</td>
                        <td className="max-sm:hidden">{row.leetcode}</td>
                        <td className="max-sm:hidden">{row.codeforces}</td>
                        <td className="max-sm:hidden">
                          {Math.floor(row.digitomize_rating)}
                        </td>
                        <td className="sm:hidden">
                          {selectedRating === "digitomize"
                            ? Math.floor(row.digitomize_rating)
                            : selectedRating === "leetcode"
                              ? row.leetcode
                              : selectedRating === "codechef"
                                ? row.codechef
                                : row.codeforces}
                        </td>
                        {/* <td>{row.platform_rating}</td> */}
                      </tr>
                    ))}
                {currentUserData && userDetails && (
                  <tr
                    key={currentUserData.user_position}
                    className="bg-[#252525]"
                  >
                    <td>{currentUserData.user_position || "Not ranked"}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <Link
                            to={"/u/" + userDetails.personal_data.username}
                            target="_blank"
                          >
                            <div className="mask mask-squircle w-12 h-12 ring ring-primary ring-offset-base-100 ring-offset-2">
                              {/* You can set the image source dynamically */}
                              <img
                                className="mask mask-hexagon"
                                src={userDetails.personal_data.picture}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </Link>
                        </div>
                        <div>
                          <Link to={"/u/" + userDetails.personal_data.username}>
                            <div className="font-bold">
                              {userDetails.personal_data.name}
                              {"(YOU)"} <OpenInNew fontSize="small" />{" "}
                            </div>
                            <div className="text-sm opacity-50">
                              @{userDetails.personal_data.username}
                            </div>
                            {/* You can display more userDetails details here if needed */}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{currentUserData.ratings.codechef || 0}</td>
                    <td>{currentUserData.ratings.leetcode || 0}</td>
                    <td>{currentUserData.ratings.codeforces || 0}</td>
                    <td>
                      {Math.floor(currentUserData.ratings.digitomize_rating)}
                    </td>
                    {/* <td>{userDetails.platform_rating}</td> */}
                  </tr>
                )}
              </tbody>
            )}
            {/* foot */}
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
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="text-white"
              siblingCount={1}
              boundaryCount={1}
              shape="rounded"
              sx={{ color: "pink" }}
              style={{ color: "pink" }}
            />
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
