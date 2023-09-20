import { Element, Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { Skeleton } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { green, pink } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

export default function Home2() {
  return (
    <Element name="second">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col sm:flex-row">
          <div className="left sm:w-[40%] text-center">
            <div className="sm:text-left max-sm:text-center">
              <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium max-sm:min-h-[100px] sm:min-h-[300px]">
                <Typewriter
                  options={{ delay: 100 }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(`User Portfol`)
                      .pauseFor(100)
                      .deleteChars(7)
                      .typeString(
                        `<span class="text-custom-blue font-bold">dynamic </span> portfolio`
                      )
                      // .typeString("Welcomes You")
                      .start();
                  }}
                />
              </h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="sm:hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-2">
              <div className="">
                <div className="mockup-browser border bg-base-300">
                  <div className="mockup-browser-toolbar">
                    <div
                      className="input text-custom-blue"
                      style={{ width: "fit-content" }}
                    >
                      digitomize.com/profile
                    </div>
                  </div>
                  <div className="flex flex-row px-4 py-4 bg-base-200">
                    <div className="flex flex-col w-2/4">
                      {/* <TagFacesIcon fontSize="large" /> */}
                      <Avatar
                        src="/src/assets/hacker.png"
                        className="bg-custom-blue mb-2 self-center"
                        sx={{ padding: "6%", width: 40, height: 40 }}
                      />
                      {/* <Skeleton
                      sx={{ bgcolor: "grey.600" }}
                      variant="circular"
                      width={40}
                      height={40}
                    /> */}
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "0.8rem", bgcolor: "grey.600" }}
                      />
                    </div>
                    <div className="flex flex-col w-2/4">
                      <Skeleton
                        variant="rounded"
                        sx={{ bgcolor: "grey.600" }}
                        width={"100%"}
                        height={"60%"}
                        className="mx-2"
                      />
                      <Skeleton
                        variant="rounded"
                        sx={{ bgcolor: "grey.600" }}
                        width={"100%"}
                        height={"70%"}
                        className="mt-2 mx-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              data-theme="mytheme"
              className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue animate-bounce mt-4 hover:animate-none hover:scale-110"
            >
              Create now
            </button>
          </div>
          <div className="max-sm:hidden w-[60%] right items-end sm:flex flex-col relative h-[60vh]">
            <div className="mockup-browser border bg-base-300 w-full absolute h-full">
              <div className="mockup-browser-toolbar">
                <div style={{marginLeft:"0px"}} className="ml-0 input ml-0">https://digitomize.com/dashboard</div>
              </div>
              <div className="flex justify-center px-4 py-16 bg-base-200">
                Hello!
              </div>
            </div>
            <div className="mockup-phone border-custom-blue me-0 absolute top-28 -right-12">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1">Hi.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
