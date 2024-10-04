import { IoTrendingUp } from "react-icons/io5";
import { Swords } from "lucide-react";
import { Link } from "react-router-dom";

function Nav({ path, navigateToPage }) {
  return (
    <div className="mx-auto flex justify-around">
      <button
        className={`btn btn-sm ${
          path !== "contests" ? "btn-outline" : "bg-custom-blue text-white"
        }`}
        onClick={() => navigateToPage("contests")}
      >
        Contests
        <IoTrendingUp />
      </button>
      <button
        className={`btn btn-sm ${
          path !== "potd" ? "btn-outline" : "bg-custom-blue text-white"
        }`}
        onClick={() => navigateToPage("potd")}
      >
        POTD
        <Swords size={15} />
      </button>
    </div>
  );
}

export default Nav;
