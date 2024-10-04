import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { AiFillGithub } from "react-icons/ai";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { motion } from "framer-motion";

const theme = extendTheme({
  palette: {
    mode: "dark",
  },
});

export default function Contributors() {
  const [data, setData] = useState([]);
  const temp = [
    {
      login: "pranshugupta54",
      name: "Pranshu Gupta",
      avatar_url: "https://avatars.githubusercontent.com/u/76090263?v=4",
      profile: "https://github.com/pranshugupta54",
      contributions: ["code", "doc"],
    },
    {
      login: "Saanvi26",
      name: "Saanvi Lakhanpal",
      avatar_url: "https://avatars.githubusercontent.com/u/129958210?v=4",
      profile: "https://github.com/Saanvi26",
      contributions: ["code"],
    },
    {
      login: "anur4ag",
      name: "Anurag Sharma",
      avatar_url: "https://avatars.githubusercontent.com/u/71564387?v=4",
      profile: "https://github.com/anur4ag",
      contributions: ["code"],
    },
    {
      login: "govardhan-26",
      name: "GOVARDHAN RAO NAIDU BABBADI",
      avatar_url: "https://avatars.githubusercontent.com/u/89705565?v=4",
      profile: "https://github.com/govardhan-26",
      contributions: ["code"],
    },
    {
      login: "PushpakRaut",
      name: "Pushpak Raut",
      avatar_url: "https://avatars.githubusercontent.com/u/85230759?v=4",
      profile: "https://github.com/PushpakRaut",
      contributions: ["code"],
    },
    {
      login: "MeenuyD",
      name: "Meenu Yadav",
      avatar_url: "https://avatars.githubusercontent.com/u/116630390?v=4",
      profile: "https://github.com/MeenuyD",
      contributions: ["code"],
    },
    {
      login: "christianfds",
      name: "Christian Franchin",
      avatar_url: "https://avatars.githubusercontent.com/u/16166854?v=4",
      profile: "https://github.com/christianfds",
      contributions: ["code"],
    },
    {
      login: "hs309123",
      name: "Surveer Singh",
      avatar_url: "https://avatars.githubusercontent.com/u/97107856?v=4",
      profile: "https://www.linkedin.com/in/surveer-singh-5876761b9",
      contributions: ["code"],
    },
    {
      login: "SauravGupta123",
      name: "Saurav Gupta",
      avatar_url: "https://avatars.githubusercontent.com/u/103091748?v=4",
      profile: "https://github.com/SauravGupta123",
      contributions: ["code"],
    },
    {
      login: "anmol111pal",
      name: "Anmol Pal",
      avatar_url: "https://avatars.githubusercontent.com/u/93645325?v=4",
      profile: "https://github.com/anmol111pal",
      contributions: ["code"],
    },
    {
      login: "xnatsuk",
      name: "Louise Tona",
      avatar_url: "https://avatars.githubusercontent.com/u/57514190?v=4",
      profile: "https://github.com/xnatsuk",
      contributions: ["code"],
    },
    {
      login: "HarshMakadiya",
      name: "Harsh",
      avatar_url: "https://avatars.githubusercontent.com/u/70363509?v=4",
      profile: "https://github.com/HarshMakadiya",
      contributions: ["code"],
    },
    {
      login: "j-mahapatra",
      name: "Jagannath Mahapatra",
      avatar_url: "https://avatars.githubusercontent.com/u/107102771?v=4",
      profile: "https://github.com/j-mahapatra",
      contributions: ["code"],
    },
    {
      login: "MayurShirodkarOfficial",
      name: "Mayur Shirodkar",
      avatar_url: "https://avatars.githubusercontent.com/u/69785986?v=4",
      profile: "https://github.com/MayurShirodkarOfficial",
      contributions: ["code"],
    },
    {
      login: "ayusshh19",
      name: "Ayush Shukla",
      avatar_url: "https://avatars.githubusercontent.com/u/89308426?v=4",
      profile: "https://spiffy-crepe-a5d6b0.netlify.app/",
      contributions: ["code"],
    },
    {
      login: "shresritik",
      name: "Ritik Shrestha",
      avatar_url: "https://avatars.githubusercontent.com/u/66729712?v=4",
      profile: "http://shresritik.web.app",
      contributions: ["code"],
    },
    {
      login: "Bishwajitpvt",
      name: "Bishwajit Samanta",
      avatar_url: "https://avatars.githubusercontent.com/u/77453811?v=4",
      profile: "https://github.com/Bishwajitpvt",
      contributions: ["doc"],
    },
    {
      login: "Yash-Khattar",
      name: "Yash Khattar",
      avatar_url: "https://avatars.githubusercontent.com/u/67179751?v=4",
      profile: "https://github.com/Yash-Khattar",
      contributions: ["design"],
    },
    {
      login: "kapilkumar9395",
      name: "Kapil Kumar",
      avatar_url: "https://avatars.githubusercontent.com/u/50052501?v=4",
      profile: "https://github.com/kapilkumar9395",
      contributions: ["code"],
    },
    {
      login: "DeltaCoderr",
      name: "Subodh Inamdar",
      avatar_url: "https://avatars.githubusercontent.com/u/51528076?v=4",
      profile: "https://github.com/DeltaCoderr",
      contributions: ["code"],
    },
    {
      login: "priyankarpal",
      name: "Priyankar Pal",
      avatar_url: "https://avatars.githubusercontent.com/u/88102392?v=4",
      profile: "http://priyank.live",
      contributions: ["code"],
    },
    {
      login: "inbuilt-aura",
      name: "AMAN MADDHESHIYA",
      avatar_url: "https://avatars.githubusercontent.com/u/74290697?v=4",
      profile: "https://portfolio-aman-three.vercel.app/",
      contributions: ["code"],
    },
    {
      login: "AlmightyNan",
      name: "AlmightyNan",
      avatar_url: "https://avatars.githubusercontent.com/u/93263738?v=4",
      profile: "https://github.com/AlmightyNan",
      contributions: ["code"],
    },
    {
      login: "menghif",
      name: "Francesco Menghi",
      avatar_url: "https://avatars.githubusercontent.com/u/53121061?v=4",
      profile: "http://francescomenghi.com",
      contributions: ["code"],
    },
    {
      login: "DeepRahangdale",
      name: "Deep",
      avatar_url: "https://avatars.githubusercontent.com/u/115669089?v=4",
      profile: "https://deeprahangdale-portfolio.vercel.app",
      contributions: ["code"],
    },
    {
      login: "Rushi1109",
      name: "Rushi1109",
      avatar_url: "https://avatars.githubusercontent.com/u/91152294?v=4",
      profile: "https://github.com/Rushi1109",
      contributions: ["code"],
    },
    {
      login: "vrun1208",
      name: "Varun Patodia",
      avatar_url: "https://avatars.githubusercontent.com/u/58364635?v=4",
      profile: "https://github.com/vrun1208",
      contributions: ["code"],
    },
    {
      login: "LynxSumit",
      name: "Sumit Upadhyay",
      avatar_url: "https://avatars.githubusercontent.com/u/114245865?v=4",
      profile: "https://lynxsumit.vercel.app",
      contributions: ["code"],
    },
    {
      login: "Khagesh2409",
      name: "Khagesh Sharma",
      avatar_url: "https://avatars.githubusercontent.com/u/120746199?v=4",
      profile: "https://github.com/Khagesh2409",
      contributions: ["code"],
    },
    {
      login: "manojna191",
      name: "Manojna Vinjamuri",
      avatar_url: "https://avatars.githubusercontent.com/u/79504458?v=4",
      profile: "https://github.com/manojna191",
      contributions: ["code"],
    },
    {
      login: "decaplanet",
      name: "Deca",
      avatar_url: "https://avatars.githubusercontent.com/u/126875757?v=4",
      profile: "https://decaplanet.com",
      contributions: ["design"],
    },
    {
      login: "Nishantkumar012",
      name: "Nishantkumar012",
      avatar_url: "https://avatars.githubusercontent.com/u/124617537?v=4",
      profile: "https://github.com/Nishantkumar012",
      contributions: ["code"],
    },
    {
      login: "cybertron15",
      name: "cybertron15",
      avatar_url: "https://avatars.githubusercontent.com/u/48357640?v=4",
      profile: "http://troncodes.com",
      contributions: ["code"],
    },
    {
      login: "sarthaakpal",
      name: "sarthaak pal",
      avatar_url: "https://avatars.githubusercontent.com/u/123382000?v=4",
      profile: "https://palsarthaak.wixsite.com/sarthaakpal/portfolio",
      contributions: ["design"],
    },
  ];

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
    }
  };
  // fetchData();
  // useEffect(() => {
  // }, []);
  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <div className="w-full p-2 flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="my-4 py-4 text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center"
          >
            <span className="block mt-1 md:mt-6">
              <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">
                Contributors
              </span>
            </span>
          </motion.h1>
          <div className="flex flex-row mt-4">
            <Marquee pauseOnHover={true} speed={100}>
              {temp.map((item) => (
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
                            {item.name.slice(0, 15)}
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
          </div>
          <div className="flex flex-row mb-4">
            <Marquee pauseOnHover={true} speed={100} direction="right">
              {temp.map((item) => (
                <div
                  key={item.name}
                  className="w-full phone:mx-3 max-phone:mx-2"
                >
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
              ))}
            </Marquee>
          </div>
        </div>
      </CssVarsProvider>
    </>
  );
}
