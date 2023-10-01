import React, {useState, useEffect} from 'react'
import scroll from '../assets/scroll.png'

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
        <button
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            height: "50px",
            width: "50px",
            fontSize: "50px", 
            cursor: "pointer", 
            borderRadius:"30px",
          }}
          onClick={scrollup} 
        >
          <img src={scroll} alt="scroll" />
        </button>
      )}
    </div>
  )
}

export default ScrollToTop