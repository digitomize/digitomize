import React from "react";
import comingSoonSvg from "@assets/comming_soon.svg";


const ComingSoonLoader = ({ value }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center antialiased">
                {/* <h1 className="m-3 text-white text-4xl text-center capitalize">
                    <span style={{ textShadow: "5px 5px 5px rgba(21, 132, 255, 0.9)" }}>
                        {value}
                    </span>
                </h1> */}

                <div className="max-h-screen mt-4 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="m-3 text-white text-4xl text-center capitalize">
                            <span style={{ textShadow: "5px 5px 5px rgba(21, 132, 255, 0.9)" }}>
                                {value}
                            </span>
                        </h1>
                        <img src={comingSoonSvg} alt="Coming Soon" className="mb-6 mx-auto w-80 md:w-60 lg:w-80" />
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">Coming Soon</h1>
                        <p className="text-sm md:text-base lg:text-lg mb-8">
                            We're working hard to bring you something awesome. Stay tuned!
                        </p>
                        <div className="flex max-sm:flex-col max-sm:items-center justify-center gap-2">
                            <input
                                type="email"
                                placeholder="#include <email>"
                                className="px-4 py-2 mr-2 outline-none border-b-2 border-white bg-transparent text-white placeholder-white"
                            />
                            <button className="btn btn-primary btn-active px-6 py-2 w-fit bg-button-primary hover:bg-button-primary-hover text-white">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>
                {/* <progress className="progress w-56 mt-12"></progress> */}
            </div>
        </div>
    );
};

export default ComingSoonLoader;