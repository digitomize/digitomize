import { useEffect } from "react";
import ReactDOM from 'react-dom';
import '../components/css/socials.css';
import Stack from "@mui/material/Stack";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShareModel = ({close_model, copyToClipboard, contestLink, theme }) => {
    //const [ showModel, setShowModel ] = useState('');

    const handleContainerClick = (e) => {
      e.stopPropagation();
    };

    useEffect(() =>{
        document.body.style.overflowY = "hidden";
        return () =>{
            document.body.style.overflowY = "scroll";
        }
    }, [])


    const handleWhatsAppClick = () =>{
        const Message = `Check out this link: ${contestLink}`;
        const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(Message)}`;
        try {
          window.open(whatsappLink);
        } catch (e) {
          console.log(e);
        }
    }

    const handleTelegramClick = () => {
        const Message = `Check out this link: ${contestLink}`;
        const telegramLink = `https://telegram.me/share/url?url=${encodeURIComponent(Message)}`;
        try {
          window.open(telegramLink);
        } catch (e) {
          console.log(e);
        }
    };

    const handleLinkedinClick = () => {
        const Message = `Check out this link: ${contestLink}`;
      const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(contestLink)}`;
      
        try {
          window.open(linkedinLink);
        }
        catch (e) {
          console.log(e);
        }
    };

    const handleTwitterClick = () => {
        const Message = `Check out this link: ${contestLink}`;
        const linkedinLink = `https://twitter.com/share?url=${encodeURIComponent(Message)}`;
        try {
          window.open(linkedinLink);
        }
        catch (e) {
          console.log(e);
        }
    };

    const copy_text =() => {
        navigator.clipboard.writeText(contestLink);
        setInterval(()=>{
          document.querySelector('.text-copied').classList.add('hidden');
        }, 1000);
        document.querySelector('.text-copied').classList.remove('hidden');
    }  

    return ReactDOM.createPortal(
        <>
        <div className="model_container" onClick={close_model}>
            <div className="model_wrapper gradiant-model-border" onClick={handleContainerClick} style={{background:`${theme}`!= '' ? `${theme}`: 'whitesmoke'}}>
                <div>
                    <p>Share this link via</p>
                </div>
                <div className="flex">
                    <Stack 
                        justifyContent="center"
                        alignItems="center"
                        spacing= {3}
                        direction="row"
                    />
                    <button style={{padding:"10px"}} onClick={handleWhatsAppClick}><WhatsAppIcon sx={{transform: "scale(1.5)"}}/></button>
                    <button style={{padding:"10px"}} onClick={handleTelegramClick}><TelegramIcon sx={{transform: "scale(1.5)"}}/></button>
                    <button style={{padding:"10px"}} onClick={handleLinkedinClick}><LinkedInIcon sx={{transform: "scale(1.5)"}}/></button>
                    <button style={{padding:"10px"}} onClick={handleTwitterClick}><img className="h-7 w-7 bg-gray-300 p-1 rounded-sm" src="https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"/></button> 
                </div>
                <div>
                    or copy link
                </div>
                
            <div className="input_url">
                <span className="text-copied hidden">copied!</span>
                <input type="text" className="input_value" value={contestLink}/>
                
                <button onClick={copy_text}><ContentCopyIcon/></button>
            </div>
                
          </div>
        </div>
        </>,
            document.getElementById('portal_div')
    );
}

export default ShareModel;