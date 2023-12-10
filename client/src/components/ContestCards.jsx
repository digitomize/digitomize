import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router-dom"
// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  atcoder,
  codeforces,
} from "./AllAssets"

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
  atcoder,
]

import { createTheme, ThemeProvider } from "@mui/material/styles"
const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

// import './styles.css';

// import required modules
import { Autoplay, EffectCards } from "swiper/modules"

export default function ContestCards() {
  const platforms = [
    {
      name: "leetcode",
      description:
        "Platform for honing coding skills through a variety of algorithmic challenges.",
      icon: leetcode,
    },
    {
      name: "atcoder",
      description:
        "Competitive programming platform that hosts contests and offers practice problems.",
      icon: atcoder,
    },
    {
      name: "codeforces",
      description:
        "Online competitive programming platform with a global community and regular contests.",
      icon: codeforces,
    },
    {
      name: "codechef",
      description:
        "Competitive programming platform featuring coding contests and challenges.",
      icon: codechef,
    },
    {
      name: "geeksforgeeks",
      description:
        "Platform providing a variety of coding resources, tutorials, and practice problems.",
      icon: geeksforgeeks,
    },
    {
      name: "codingninjas",
      description:
        "Educational platform offering coding courses, challenges, and programming competitions.",
      icon: codingninjas,
    },
  ]

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className=''>
          <Swiper
            effect={"cards"}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 15,
            }}
            grabCursor={true}
            // loop={true}
            modules={[Autoplay, EffectCards]}
            className='mySwiper'
          >
            {platforms.map((item) => (
              <SwiperSlide>
                <div className=''>
                  <Card
                    sx={{ maxWidth: 250, borderRadius: "12px" }}
                    className='border-jet border-2'
                  >
                    <CardContent className='flex justify-center'>
                      <CardMedia
                        className=''
                        sx={{ height: 100, width: 100 }}
                        image={`${item.icon}`}
                        title='green iguana'
                      />
                    </CardContent>
                    <CardContent className='text-center'>
                      <h1 className='text-xl mb-2 mt-0'>{item.name}</h1>
                      <p className='font-myFont text-[#9eb3bd]'>
                        {item.description}
                      </p>
                    </CardContent>
                    <CardActions className='justify-center'>
                      <Link to='/contests'>
                        <button
                          data-theme='mytheme'
                          className='btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue hover:animate-none hover:scale-110'
                        >
                          check out
                        </button>
                      </Link>
                    </CardActions>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ThemeProvider>
    </>
  )
}
