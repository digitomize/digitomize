import React, {useState, useEffect} from 'react'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';


const ScrollToTop = () => {
    const [scrollToTop, setScrollToTop] = useState(false);
    
    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                setScrollToTop(true)
            }
            else 
            {
                setScrollToTop(false);
            }
        })
    }, [])

    const scrollup = () =>{
        window.scrollTo({
            top : 0,
            behavior:"smooth"
        })
    }
    
  return (
    <div>
      {scrollToTop && (
        <ArrowCircleUpOutlinedIcon
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            height: "55px",
            width: "60px",
            fontSize: "50px", 
            cursor: "pointer", 
            borderRadius:"30px",
            zIndex:"10000",
          }}
          onClick={scrollup} 
        />
      )}
    </div>
  )
}

export default ScrollToTop