import React, {useState, useEffect} from 'react'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import {Link} from "react-scroll";


const ScrollToTop = (props) => {
    const [scrollToTop, setScrollToTop] = useState(false);

    const { toid, h } = props;
    

    useEffect(()=>{
        window.addEventListener("scroll", () => {

            const scrollOffset = window.innerHeight;

            if(window.scrollY > 100 + h*scrollOffset){
                setScrollToTop(true)
            }
            else 
            {
                setScrollToTop(false);
            }"allContests"
        })
    }, [])

    return (
        <div>
          {scrollToTop && (
            <Link to={toid} smooth={true} duration={100}>
            <div
                className='fixed bottom-[30px] right-[30px] h-[60px] w-[60px] text-[100px] cursor-pointer z-10000 flex justify-center items-center rounded-full duration-300 ease bg-black-500 hover:bg-white text-white border-2 border-white hover:text-black hover:border-black'               
                
            >
                <KeyboardDoubleArrowUpOutlinedIcon className=''/>
            </div>
            </Link>
          )}
        </div>
      );
      
}

export default ScrollToTop