import React, {useState, useEffect} from 'react'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

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
        bottom: "50px",
        right: "50px",
        height: "60px",
        width: "60px",
        fontSize: "50px",
        cursor: "pointer",
        zIndex: "10000",
        backgroundColor: isHovered ? "white" : "black",
        borderRadius: "30px",
        transition: "background-color 0.3s ease", // Add a transition for smooth effect
    };

    const iconStyle = {
        height: "100%",
        width: "100%",
        marginLeft: "-3px",
        color: isHovered ? "black" : "white",
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
    
    const scrollup = () => {
        const scrollOffset = window.innerHeight; 
        
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      };
    
    return (
        <div>
          {scrollToTop && (
            <div
                style={containerStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={scrollup}
            >
                <ArrowCircleUpOutlinedIcon style={iconStyle}/>
            </div>
          )}
        </div>
      );
      
}

export default ScrollToTop