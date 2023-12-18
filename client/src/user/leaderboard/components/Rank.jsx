import { EmojiEvents, OpenInNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import boy from "../../../assets/boyV7.png";
import { Skeleton } from "@mui/material";

const Rank = ({ color, pt = 8, user }) => {
  return (
    <div className={`pt-${pt}`}>
      <Link to={"/u/" + (user?.username || "loading")}>
        <div className="relative flex justify-center">
          {/* Profile Picture */}
          <img
            src={user?.picture || boy} // Replace with the actual source of your profile picture
            alt="Profile"
            className="w-[84px] h-[84px] mask mask-hexagon"
          />

          {/* Badge */}
          <EmojiEvents
            sx={{ color: color }}
            fontSize="large"
            color="inherit"
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-5 bottom-0"
          />
        </div>
        <div className="name">
          <div className="flex flex-row pt-4 justify-center">
            {user?.name ? (
              <h2 className="text-center text-light-blue">
                {user?.name}
                <OpenInNew fontSize="small" />
              </h2>
            ) : (
              <Skeleton
                variant="rounded"
                width={"4rem"}
                height={"1rem"}
                sx={{ bgcolor: "grey.600" }}
                className="my-2"
              />
            )
            }
            {/* <h2 className="text-center text-light-blue">
              {user?.name || <Skeleton
                        variant="rounded"
                        width={"4rem"}
                        height={"2rem"}
                        sx={{ bgcolor: "grey.600" }}
                        className="my-2"
                      />}
            </h2>
            <OpenInNew fontSize="small" /> */}
          </div>
          <p className="text-center text-light-blue text-xs max-phone:hidden">
            {user?.username&&`(@${user?.username || "loading..."})`}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Rank;
