import { EmojiEvents, OpenInNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import boy from "../../../assets/boyV7.png";
import { Skeleton } from "@mui/material";

const Rank = ({ color, pt = 8, user }) => {
  console.log(user)
  return (
    <div className={`pt-${pt}`}>
      {user?.username && user?.name ?
      <Link to={"/u/" + (user?.username)}>
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
      <div className="name mt-4">
        <h2 className="text-center text-light-blue">
              {user?.name}
              <OpenInNew fontSize="small" />
            </h2>
        <p className="text-center text-light-blue text-xs max-phone:hidden">
          {`@${user?.username}`}
        </p>
      </div>
    </Link>:
    <>
    <div className="relative flex justify-center">
        <Skeleton
          variant="circular"
          width={"84px"}
          height={"84px"}
          sx={{ bgcolor: "grey.600" }}
          className="my-2"
          />
        <EmojiEvents
          sx={{ color: color }}
          fontSize="large"
          color="inherit"
          className="absolute left-1/2 transform -translate-x-1/2 translate-y-5 bottom-0"
          />
    </div>
    <div className="name mt-4">
      <Skeleton
        variant="rounded"
        width={"full"}
        height={"1rem"}
        sx={{ bgcolor: "grey.600" }}
        className="my-2"
      />
    </div>
    </>
    }
  </div>
  );
};

export default Rank;
