import { useRouteError, Link } from "react-router-dom"
import './css/error-page.css'
import NewNavbar from "./NewNavbar";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <>
      <NewNavbar />
        <div className="error-container">
          <div className="error-page" >
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{ error.statusText && `Error : ${error.error.message}`}</i>
            </p>
            <button className="button-4"><Link to="/contests">Return to contests</Link></button>
            
          </div>
      </div>
      </>
    );
  }