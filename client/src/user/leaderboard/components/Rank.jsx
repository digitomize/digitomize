import { EmojiEvents, OpenInNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import boy from "../../../assets/boyV7.png";
import { Skeleton, selectClasses } from "@mui/material";

const Rank = ({ color, pt = 6, user, selectedPlatform }) => {
  console.log(user);
  let rating;
  if (user) {
    if (selectedPlatform.length == 0) rating = user.digitomize_rating;
    else if (selectedPlatform === "leetcode") rating = user.leetcode;
    else if (selectedPlatform === "codechef") rating = user.codechef;
    else rating = user.codeforces;
  }

  return (
    <div className={`pt-${pt}`}>
      {user?.username && user?.name ? (
        <Link to={"/u/" + user?.username}>
          <div className="relative flex justify-center flex-col items-center">
            <div className="flex z-[10] flex-col items-center justify-center sm:translate-y-7 translate-y-4">
              {/* Badge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="50"
                viewBox="0 0 66 50"
                fill="none"
                className="sm:w-[66px] sm:h-[50px]  w-[29px] h-[24px]"
              >
                <path
                  d="M64.0812 14.1811C63.5908 13.7535 62.9843 13.4813 62.3389 13.399C61.6935 13.3168 61.0381 13.4282 60.4561 13.7191L46.812 20.5126L35.4206 1.59126C35.1278 1.10573 34.7144 0.704095 34.2207 0.425298C33.727 0.1465 33.1696 0 32.6026 0C32.0356 0 31.4782 0.1465 30.9845 0.425298C30.4908 0.704095 30.0775 1.10573 29.7847 1.59126L18.3932 20.5208L4.75453 13.7272C4.17393 13.4389 3.5211 13.3285 2.87796 13.4098C2.23483 13.4911 1.63003 13.7606 1.13948 14.1844C0.648929 14.6082 0.294472 15.1674 0.12059 15.7919C-0.0532915 16.4164 -0.0388509 17.0783 0.1621 17.6947L10.2165 48.4993C10.3176 48.8088 10.4869 49.0916 10.712 49.3269C10.937 49.5621 11.212 49.7439 11.5166 49.8587C11.8213 49.9734 12.1479 50.0183 12.4722 49.99C12.7965 49.9616 13.1103 49.8608 13.3905 49.695C13.4584 49.6542 20.4069 45.6515 32.6026 45.6515C44.7984 45.6515 51.7468 49.6542 51.8093 49.6923C52.0896 49.8597 52.4039 49.9619 52.7291 49.9912C53.0542 50.0205 53.3818 49.9763 53.6875 49.8617C53.9932 49.7471 54.2691 49.5651 54.4949 49.3292C54.7206 49.0934 54.8903 48.8097 54.9914 48.4993L65.0459 17.7028C65.2526 17.0863 65.2712 16.4223 65.0995 15.7951C64.9277 15.168 64.5732 14.6061 64.0812 14.1811ZM51.6245 44.79C48.3636 43.4069 41.8636 41.3036 32.6026 41.3036C23.3417 41.3036 16.8416 43.4069 13.5807 44.79L5.07791 18.749L17.3253 24.8551C18.0666 25.2207 18.918 25.2954 19.7117 25.0645C20.5054 24.8337 21.1838 24.3139 21.6134 23.6078L32.6026 5.3413L43.5919 23.6023C44.0218 24.3074 44.6998 24.8262 45.4927 25.057C46.2856 25.2877 47.1361 25.2138 47.8772 24.8496L60.1273 18.749L51.6245 44.79ZM45.6109 36.0943C45.5222 36.5972 45.2592 37.0528 44.8682 37.3813C44.4771 37.7097 43.983 37.89 43.4723 37.8905C43.3448 37.8903 43.2175 37.8794 43.0919 37.8579C36.148 36.6659 29.0518 36.6659 22.108 37.8579C21.54 37.9581 20.9556 37.8286 20.4832 37.4978C20.0108 37.1671 19.6891 36.6622 19.5889 36.0943C19.4887 35.5264 19.6183 34.9419 19.949 34.4695C20.2797 33.9971 20.7846 33.6754 21.3525 33.5753C28.7962 32.2963 36.4036 32.2963 43.8473 33.5753C44.4141 33.6748 44.9183 33.995 45.2494 34.4656C45.5805 34.9363 45.7115 35.5191 45.6136 36.0862L45.6109 36.0943Z"
                  fill={color}
                />
              </svg>
              {/* Profile Picture */}
              <img
                className="rounded-full sm:w-[108px] sm:h-[108px] w-[50px] h-[50px] mask mask-circle"
                style={{ border: `3px solid ${color}` }}
                src={user?.picture || boy} // Replace with the actual source of your profile picture
                alt="Profile"
              />
            </div>
            {color === "#FFD700" ? (
              <div className="bg-[#252525]  rounded-[12px] text-center gap-x-[8px] max-sm:h-[94px] sm:h-[132px] sm:w-[110px] max-sm:w-[55px] flex flex-col items-center justify-center font-semibold tracking-[0.42px] sm:text-[14px] text-[10px]">
                <h2 className="text-[#fff]">{user?.name}</h2>
                <h2 style={{ color: color }}>{Math.floor(rating)}</h2>
              </div>
            ) : color === "#C0C0C0" ? (
              <div className="bg-[#252525]  rounded-[12px] text-center gap-x-[8px] max-sm:h-[82px] sm:h-[117px] sm:w-[110px]  max-sm:w-[55px] flex flex-col items-center justify-center font-semibold tracking-[0.42px] sm:text-[14px] text-[10px]">
                <h2 className="text-[#fff]">{user?.name}</h2>
                <h2 style={{ color: color }}>{Math.floor(rating)}</h2>
              </div>
            ) : (
              <div className="bg-[#252525]  rounded-[12px] text-center gap-x-[8px] max-sm:h-[70px] sm:h-[107px] sm:w-[110px]  max-sm:w-[55px] flex flex-col items-center justify-center font-semibold tracking-[0.42px] sm:text-[14px] text-[10px]">
                <h2 className="text-[#fff]">{user?.name}</h2>
                <h2 style={{ color: color }}>{Math.floor(rating)}</h2>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <>
          <div className="relative flex justify-center flex-col items-center">
            <div className="flex z-[10] flex-col items-center justify-center translate-y-10">
              {/* Badge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="50"
                viewBox="0 0 66 50"
                fill="none"
              >
                <path
                  d="M64.0812 14.1811C63.5908 13.7535 62.9843 13.4813 62.3389 13.399C61.6935 13.3168 61.0381 13.4282 60.4561 13.7191L46.812 20.5126L35.4206 1.59126C35.1278 1.10573 34.7144 0.704095 34.2207 0.425298C33.727 0.1465 33.1696 0 32.6026 0C32.0356 0 31.4782 0.1465 30.9845 0.425298C30.4908 0.704095 30.0775 1.10573 29.7847 1.59126L18.3932 20.5208L4.75453 13.7272C4.17393 13.4389 3.5211 13.3285 2.87796 13.4098C2.23483 13.4911 1.63003 13.7606 1.13948 14.1844C0.648929 14.6082 0.294472 15.1674 0.12059 15.7919C-0.0532915 16.4164 -0.0388509 17.0783 0.1621 17.6947L10.2165 48.4993C10.3176 48.8088 10.4869 49.0916 10.712 49.3269C10.937 49.5621 11.212 49.7439 11.5166 49.8587C11.8213 49.9734 12.1479 50.0183 12.4722 49.99C12.7965 49.9616 13.1103 49.8608 13.3905 49.695C13.4584 49.6542 20.4069 45.6515 32.6026 45.6515C44.7984 45.6515 51.7468 49.6542 51.8093 49.6923C52.0896 49.8597 52.4039 49.9619 52.7291 49.9912C53.0542 50.0205 53.3818 49.9763 53.6875 49.8617C53.9932 49.7471 54.2691 49.5651 54.4949 49.3292C54.7206 49.0934 54.8903 48.8097 54.9914 48.4993L65.0459 17.7028C65.2526 17.0863 65.2712 16.4223 65.0995 15.7951C64.9277 15.168 64.5732 14.6061 64.0812 14.1811ZM51.6245 44.79C48.3636 43.4069 41.8636 41.3036 32.6026 41.3036C23.3417 41.3036 16.8416 43.4069 13.5807 44.79L5.07791 18.749L17.3253 24.8551C18.0666 25.2207 18.918 25.2954 19.7117 25.0645C20.5054 24.8337 21.1838 24.3139 21.6134 23.6078L32.6026 5.3413L43.5919 23.6023C44.0218 24.3074 44.6998 24.8262 45.4927 25.057C46.2856 25.2877 47.1361 25.2138 47.8772 24.8496L60.1273 18.749L51.6245 44.79ZM45.6109 36.0943C45.5222 36.5972 45.2592 37.0528 44.8682 37.3813C44.4771 37.7097 43.983 37.89 43.4723 37.8905C43.3448 37.8903 43.2175 37.8794 43.0919 37.8579C36.148 36.6659 29.0518 36.6659 22.108 37.8579C21.54 37.9581 20.9556 37.8286 20.4832 37.4978C20.0108 37.1671 19.6891 36.6622 19.5889 36.0943C19.4887 35.5264 19.6183 34.9419 19.949 34.4695C20.2797 33.9971 20.7846 33.6754 21.3525 33.5753C28.7962 32.2963 36.4036 32.2963 43.8473 33.5753C44.4141 33.6748 44.9183 33.995 45.2494 34.4656C45.5805 34.9363 45.7115 35.5191 45.6136 36.0862L45.6109 36.0943Z"
                  fill={color}
                />
              </svg>
              {/* Profile Picture */}
              <Skeleton
                variant="circular"
                width={"88px"}
                height={"88px"}
                sx={{ bgcolor: "grey.600" }}
                className="my-2"
              />
            </div>
          </div>
          <div className="bg-[#252525] rounded-[12px] text-center gap-x-[8px] h-[120px] w-[110px] flex flex-col items-center justify-center font-semibold tracking-[0.42px] text-[14px]">
            <Skeleton
              variant="rounded"
              width={"full"}
              height={"120px"}
              sx={{ bgcolor: "grey.600" }}
              className="my-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Rank;
