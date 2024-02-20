import React, { useEffect, useState, useRef } from "react";
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
import { MetaData } from "../../components/CustomComponents";
import NewNavbar from "../../components/globals/Navbar/NewNavbar";
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
import { useUserDetails } from "@context/UserContext";
import Rank from "./components/Rank";
import ShareModel from "@components/share_model";
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
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [currentUserData, setCurrentUserData] = useState(null);
  const { userDetails } = useUserDetails();
  const [top3, setTop3] = useState([]);
  console.log(currentPage)
  const [selectedPlatform, setSelectedPlatform] = useState(
    searchParams.get("platform") || "",
  );
  const [name, setName] = useState("");
  const [selectedRating, setSelectedRating] = useState("digitomize");
  const platforms = ["leetcode", "codechef", "codeforces"];
  const platformsIcon = [leetcode, codechef, codeforces];
  const ratings = ["digitomize", "codechef", "leetcode", "codeforces"];
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const close_model = () => setShow(false);
  const [show, setShow] = useState(false);
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
      // console.log(res.data);
      // console.log(res.data.leaderboard);
      // console.log(top3[0]);
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
    // console.log(event.target.value);
    setSelectedPlatform(event.target.value);
    if (event.target.value.length !== 0) {
      setSearchParams({ platform: event.target.value, page: 1 });
    } else {
      searchParams.delete("platform");
      setSearchParams(searchParams);
    }
    setCurrentPage(1);
    if (screenSize.width <= 640) setSelectedRating(event.target.value);
  };
  const main_model = (
    <ShareModel
      close_model={close_model}
      contestLink={window.location.href}
      //theme={colorTheme}
      theme=""
    />
  );
  return (
    <>
      <MetaData path="u/leaderboard" />
      <NewNavbar position="static" />
      <div className="text-white text-center flex flex-col items-center justify-center">
        <h1 className="max-sm:text-[20px] max-sm:leading-6 mt-5 leading-[60px]">
          One Scoreboard for
          <br />
          All Your{" "}
          <span className="bg-digitomize-bg py-[1px] sm:py-1 rounded-md">
            &nbsp;Coding Battles&nbsp;
          </span>
        </h1>
      </div>
      <div className="flex justify-center max-phone:gap-6 phone:gap-12 phone:w-4/6 w-11/12 mx-auto  h-fit">
        <Rank
          color="#C0C0C0"
          pt="3"
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
        <div className=" rounded-[20px] max-phone:overflow-x-hidden overflow-x-auto">
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
                                  <OpenInNew style={{ fontSize: "15px" }} />{" "}
                                </div>
                                <div className="  sm:text-[11px] text-[8px] font-light text-left">
                                  @
                                  {screenSize.width <= 350
                                    ? row.username.length <= 15
                                      ? row.username
                                      : row.username.slice(0, 15) + "..."
                                    : row.username}
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
                    className="bg-[#252525] text-center"
                  >
                    <td>
                      {"#" + currentUserData.user_position || "Not ranked"}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <Link
                            to={"/u/" + userDetails.personal_data.username}
                            target="_blank"
                          >
                            <div className="mask mask-circle sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] ring ring-primary ring-offset-base-100 ring-offset-2">
                              {/* You can set the image source dynamically */}
                              <img
                                className="mask mask-circle"
                                src={userDetails.personal_data.picture}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </Link>
                        </div>
                        <div>
                          <Link to={"/u/" + userDetails.personal_data.username}>
                            <div className="font-semibold text-left sm:text-[14px] text-[12px]">
                              {userDetails.personal_data.name}
                              {"(YOU)"}{" "}
                              <OpenInNew style={{ fontSize: "15px" }} />{" "}
                            </div>
                            <div className=" sm:text-[11px] text-[8px] font-light text-left">
                              @
                              {screenSize.width <= 350
                                ? userDetails.personal_data.username.length <=
                                  15
                                  ? userDetails.personal_data.username
                                  : userDetails.personal_data.username.slice(
                                    0,
                                    15,
                                  ) + "..."
                                : userDetails.personal_data.username}
                            </div>
                            {/* You can display more userDetails details here if needed */}
                          </Link>
                        </div>
                      </div>
                    </td>
                    {/* <td>{currentUserData.ratings.codechef || 0}</td>
                    <td>{currentUserData.ratings.leetcode || 0}</td>
                    <td>{currentUserData.ratings.codeforces || 0}</td>
                    <td>
                      {Math.floor(currentUserData.ratings.digitomize_rating)}
                    </td> */}
                    <td className="max-sm:hidden">
                      {currentUserData.ratings.codechef || 0}
                    </td>
                    <td className="max-sm:hidden">
                      {currentUserData.ratings.leetcode || 0}
                    </td>
                    <td className="max-sm:hidden">
                      {currentUserData.ratings.codeforces || 0}
                    </td>
                    <td className="max-sm:hidden">
                      {Math.floor(currentUserData.ratings.digitomize_rating)}
                    </td>
                    <td className="sm:hidden">
                      {selectedRating === "digitomize"
                        ? Math.floor(currentUserData.ratings.digitomize_rating)
                        : selectedRating === "leetcode"
                          ? currentUserData.ratings.leetcode
                          : selectedRating === "codechef"
                            ? currentUserData.ratings.codechef
                            : currentUserData.ratings.codeforces}
                    </td>
                    {/* <td>{userDetails.platform_rating}</td> */}
                  </tr>
                )}
              </tbody>
            )}
            {/* foot */}
          </table>
        </div>
        <button
          onClick={() => setShow(true)}
          className="flex sm:hidden justify-center w-fit ml-auto items-center mt-3 border border-badge bg-badge  text-badge-txt px-6 py-1 font-['Geist'] rounded-full text-sm"
        >
          Share the board now
          <div className="h-8 ml-1 max-md:w-12 clip flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              viewBox="0 0 24 24"
              id="Share"
            >
              <path
                d="M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z"
                fill="#ffffff"
                className="color000000 svgShape"
              ></path>
            </svg>
          </div>
        </button>
        {show && main_model}
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
