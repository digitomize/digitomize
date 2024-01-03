import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { AiFillGithub } from "react-icons/ai";
import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";


// const theme = extendTheme({
//   palette: {
//     mode: "dark",
//   },
// });

// export default function Contributors() {
//   const [data, setData] = useState([]);
  


//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.github.com/repos/digitomize/digitomize/contents/.all-contributorsrc",
//         {
//           headers: {
//             Accept: "application/vnd.github.raw",
//           },
//         },
//       );

//       // Access the data from the response
//       const rawData = response.data.contributors;
//       // Set the data to state
//       setData(rawData);
//     } catch (error) {
//       // Handle errors
//       console.error("Error fetching data:", error.message);
//     }
//   };
//   // fetchData();
//   // useEffect(() => {
//   // }, []);
//   return (
//     <>
//       <CssVarsProvider defaultMode="dark">
//         <div className="w-full p-2 flex flex-col gap-2">
//           <h1 className="m-0 p-0 max-phone:text-4xl">Contributors</h1>
//           <div className="flex flex-row">
//             <Marquee
//               pauseOnHover={true}
//               speed={100}
//             >
//               {temp.map((item) => (
//                 <div key={item.name} className="w-full phone:mx-3 max-phone:mx-2">
//                   <div key={item.name} className="w-fit">
//                     <Link to={item.profile}>
//                       <Card
//                         orientation="horizontal"
//                         className="w-fit my-2 hover:scale-105"
//                         size="sm"
//                         key={item.title}
//                         variant="outlined"
//                       >
//                         <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//                           <img
//                             srcSet={`${item.avatar_url}?h=120&fit=crop&auto=format&dpr=2 2x`}
//                             src={`${item.avatar_url}?h=120&fit=crop&auto=format`}
//                             alt={item.name}
//                           />
//                         </AspectRatio>
//                         <Box
//                           sx={{ whiteSpace: "nowrap", mx: 1 }}
//                           className="max-phone:hidden"
//                         >
//                           <Typography level="title-md">
//                             {item.name.slice(0, 15)}
//                           </Typography>
//                           <div className="github flex flex-col gap-1">
//                             <div className="flex flex-row items-center">
//                               <AiFillGithub />
//                               <Typography level="body-sm">
//                                 {item.login}
//                               </Typography>
//                             </div>
//                             <div className="flex flex-row gap-1">
//                               {item.contributions.map((contribution, index) => {
//                                 let badgeColor = "";

//                                 // Determine color based on contribution type
//                                 if (contribution === "code") {
//                                   badgeColor = "badge-primary"; // Set the class for code contributions
//                                 } else if (contribution === "doc") {
//                                   badgeColor = "badge-secondary"; // Set the class for documentation contributions
//                                 } else if (contribution === "design") {
//                                   badgeColor = "badge-accent"; // Set the class for design contributions
//                                 } else {
//                                   badgeColor = "badge-accent"; // Default color for other contributions (you can adjust this)
//                                 }

//                                 return (
//                                   <div
//                                     key={index}
//                                     className={`badge ${badgeColor}`}
//                                   >
//                                     {contribution}
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </Box>
//                       </Card>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </Marquee>
//           </div>
//           <div className="flex flex-row">
//             <Marquee
//               pauseOnHover={true}
//               speed={100}
//               direction="right"
//             >
//               {temp.map((item) => (
//                 <div key={item.name} className="w-full phone:mx-3 max-phone:mx-2">
//                   <Link to={item.profile}>
//                     <Card
//                       orientation="horizontal"
//                       className="w-fit my-2 hover:scale-105"
//                       size="sm"
//                       key={item.title}
//                       variant="outlined"
//                     >
//                       <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//                         <img
//                           srcSet={`${item.avatar_url}?h=120&fit=crop&auto=format&dpr=2 2x`}
//                           src={`${item.avatar_url}?h=120&fit=crop&auto=format`}
//                           alt={item.name}
//                         />
//                       </AspectRatio>
//                       <Box
//                         sx={{ whiteSpace: "nowrap", mx: 1 }}
//                         className="max-phone:hidden"
//                       >
//                         <Typography level="title-md">
//                           {item.name.slice(0, 20)}
//                         </Typography>
//                         <div className="github flex flex-col gap-1">
//                           <div className="flex flex-row items-center">
//                             <AiFillGithub />
//                             <Typography level="body-sm">
//                               {item.login}
//                             </Typography>
//                           </div>
//                           <div className="flex flex-row gap-1">
//                             {item.contributions.map((contribution, index) => {
//                               let badgeColor = "";

//                               // Determine color based on contribution type
//                               if (contribution === "code") {
//                                 badgeColor = "badge-primary"; // Set the class for code contributions
//                               } else if (contribution === "doc") {
//                                 badgeColor = "badge-secondary"; // Set the class for documentation contributions
//                               } else if (contribution === "design") {
//                                 badgeColor = "badge-accent"; // Set the class for design contributions
//                               } else {
//                                 badgeColor = "badge-accent"; // Default color for other contributions (you can adjust this)
//                               }

//                               return (
//                                 <div
//                                   key={index}
//                                   className={`badge ${badgeColor}`}
//                                 >
//                                   {contribution}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </Box>
//                     </Card>
//                   </Link>
//                 </div>
//               ))}
//             </Marquee>
//           </div>
//         </div>
//         <div className="divider"></div>
//       </CssVarsProvider>
//     </>
//   );
// }
// ... (import statements)


export default function Contributors() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/digitomize/digitomize/contents/.all-contributorsrc",
          {
            headers: {
              Accept: "application/vnd.github.raw",
            },
          },
        );

        // Access the data from the response
        const rawData = response.data.contributors;
        // Set the data to state
        setData(rawData);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error.message);
      } finally {
        // Set loading state to false whether the fetch is successful or not
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <div className="w-full p-2 flex flex-col gap-2">
          <h1 className="m-0 p-0 max-phone:text-4xl">Contributors</h1>
          <div className="flex flex-row">
            {isLoading ? (
              // Provide a loading indicator or fallback while data is being fetched
              <div>Loading...</div>
            ) : (
              <Marquee pauseOnHover={true} speed={100}>
                {data.map((item) => (
                  <div
                    key={item.name}
                    className="w-full phone:mx-3 max-phone:mx-2"
                  >
                    <div key={item.name} className="w-fit">
                      <Link to={item.profile}>
                        <Card
                          orientation="horizontal"
                          className="w-fit my-2 hover:scale-105"
                          size="sm"
                          key={item.title}
                          variant="outlined"
                        >
                          <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                            <img
                              srcSet={`${item.avatar_url}?h=120&fit=crop&auto=format&dpr=2 2x`}
                              src={`${item.avatar_url}?h=120&fit=crop&auto=format`}
                              alt={item.name}
                            />
                          </AspectRatio>
                          <Box
                            sx={{ whiteSpace: "nowrap", mx: 1 }}
                            className="max-phone:hidden"
                          >
                            <Typography level="title-md">
                              {item.name.slice(0, 20)}
                            </Typography>
                            <div className="github flex flex-col gap-1">
                              <div className="flex flex-row items-center">
                                <AiFillGithub />
                                <Typography level="body-sm">
                                  {item.login}
                                </Typography>
                              </div>
                              <div className="flex flex-row gap-1">
                                {item.contributions.map((contribution, index) => {
                                  let badgeColor = "";

                                  // Determine color based on contribution type
                                  if (contribution === "code") {
                                    badgeColor = "badge-primary"; // Set the class for code contributions
                                  } else if (contribution === "doc") {
                                    badgeColor = "badge-secondary"; // Set the class for documentation contributions
                                  } else if (contribution === "design") {
                                    badgeColor = "badge-accent"; // Set the class for design contributions
                                  } else {
                                    badgeColor = "badge-accent"; // Default color for other contributions (you can adjust this)
                                  }

                                  return (
                                    <div
                                      key={index}
                                      className={`badge ${badgeColor}`}
                                    >
                                      {contribution}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Box>
                        </Card>
                      </Link>
                    </div>
                  </div>
                ))}
              </Marquee>
            )}
          </div>
          {/* ... (rest of your component) */}
        </div>
        <div className="divider"></div>
      </CssVarsProvider>
    </>
  );
}
