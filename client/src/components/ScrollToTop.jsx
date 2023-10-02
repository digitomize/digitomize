import React, {useState, useEffect} from 'react'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import {Link} from "react-scroll";


const ScrollToTop = () => {
    const [scrollToTop, setScrollToTop] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const containerStyle = {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        height: "60px",
        width: "60px",
        fontSize: "50px",
        cursor: "pointer",
        zIndex: "10000",
        display:"flex",
        alignItems : "center",
        justifyContent : "center",
        backgroundColor: isHovered ? "white" : "black",
        borderRadius: "50px",
        transition: "background-color 0.3s ease", 
        border : isHovered ? "3px solid black" : "3px solid white",
    };

    const iconStyle = {
        height: "100%",
        width: "100%",
        // marginLeft: "-3px",
        color: isHovered ? "black" : "white",
        margin:"0",
        padding:"0",
    };




    const scrollOffset = window.innerHeight; 
    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if(window.scrollY > scrollOffset){
                setScrollToTop(true)
            }
            else 
            {
                setScrollToTop(false);
            }
        })
    }, [])


    const scrollup = async () => {
        setTimeout(() => {
          setIsHovered(false);
        }, 500); 
      };
    

    return (
        <div>
          {scrollToTop && (
            <Link to="newHead" smooth={true} duration={500}>
            <div
                style={containerStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={scrollup}
            >
                <KeyboardDoubleArrowUpOutlinedIcon style={iconStyle}/>
            </div>
            </Link>
          )}
        </div>
      );
      
}

export default ScrollToTop