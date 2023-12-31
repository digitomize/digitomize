import React, { useState, useEffect } from 'react';
import axios from "axios";

const OSSFriendsPage = () => {
    const [openSourceFriends, setOpenSourceFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://formbricks.com/api/oss-friends");
              
                if (response.status === 200) {
                  const data = response.data;
                  console.log('Data:', data);
                } else {
                  console.error('Request failed with status:', response.status);
                }
              } catch (error) {
                console.error('Error making the request:', error);
              }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="w-10/12 mx-auto text-center">
                <h1 className="mt-2 text-white max-md:text-4xl md:text-5xl flex flex-row flex-wrap justify-center gap-2">
                    <span>Our </span>{" "}
                        <span className="bg-digitomize-bg px-2 relative rounded-md">
                        {" "}
                            <span className="relative z-10">
                                Open Source
                            </span>
                        </span>{" "}
                        friends
                    {" "}
                </h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {openSourceFriends.map((friend) => (
                        <>
                            <div
                                className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] my-4 sm:w-96 min-h-[250px] p-6 rounded-xl bg-cardsColor flex flex-col hover:scale-[1.02] hover:bg-cardsHover m-1"
                                key={vanity}>
                                <div className="flex justify-between">
                                    <p
                                        id="startTime"
                                        className="text-card-text font-light leading-tight lowercase text-lg max-md:text-sm">
                                        {friend.name}
                                    </p>
                                    <Tooltip title={host} placement="bottom" arrow>
                                        <img src={hostToSVGMap[host]} alt={host} width="13%" className="object-contain" />
                                    </Tooltip>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OSSFriendsPage;
