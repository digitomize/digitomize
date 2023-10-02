import React, {useState, useEffect} from 'react'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';


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
                <KeyboardDoubleArrowUpOutlinedIcon style={iconStyle}/>
            </div>
          )}
        </div>
      );
      
}

export default ScrollToTop