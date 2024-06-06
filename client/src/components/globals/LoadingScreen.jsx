import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Refresh, Logout, ReportGmailerrorred } from "@mui/icons-material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default function LoadingScreen({ logout = true }) {
  const [isRefreshBtnDisabled, setRefreshBtnDisabled] = useState(true);
  useEffect(() => {
    // Enable the button after 2 seconds
    const timeoutId = setTimeout(() => {
      setRefreshBtnDisabled(false);
    }, 1000 * 10);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <div className="m-auto flex flex-col items-center w-4/5 py-12">
        {/* <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width: "30%" }} />
                  <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width: "30%" }} /> */}
        <div className="mockup-code w-2/4">
          <pre data-prefix="$">
            <code className="text-white">import</code>{" "}
            <code className="text-red">"{window.location.pathname}"</code>
          </pre>
          <pre data-prefix=">" className="text-warning flex flex-row">
            <code className="flex flex-row">
              importing
              <Typewriter
                options={{ loop: true }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("...")
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
                }}
              />
            </code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code></code>
          </pre>
        </div>
        <div className="buttons my-3 flex flex-wrap justify-center gap-3 mx-auto max-phone:flex-col phone:flex-row items-center">
          <button
            className="btn lowercase"
            disabled={isRefreshBtnDisabled}
            onClick={() => window.location.reload()}
          >
            <Refresh />
            refresh in 10s
          </button>
          {logout &&
            (isRefreshBtnDisabled ? (
              // Render a disabled link when the button is disabled
              <button className="btn lowercase" disabled>
                <Logout />
                <span>logout in 10s</span>
              </button>
            ) : (
              // Render an active link when the button is not disabled
              <Link to="/logout">
                <button className="btn lowercase">
                  <Logout />
                  <span>logout in 10s</span>
                </button>
              </Link>
            ))}
          {isRefreshBtnDisabled ? (
            // Render a disabled link when the button is disabled
            <button className="btn lowercase" disabled>
              <ReportGmailerrorred />
              <span>Report issue in 10s</span>
            </button>
          ) : (
            // Render an active link when the button is not disabled
            <Link to="/discord">
              <button className="btn lowercase">
                <ReportGmailerrorred />
                <span>report issue on discord</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
