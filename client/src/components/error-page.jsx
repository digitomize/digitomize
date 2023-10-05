import { useRouteError, Link } from "react-router-dom";
import "./css/error-page.css";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const contentDescription = `ERROR 404`;
  return (
    <>
      <Helmet>
        <title>Error | Digitomize</title>
        <meta property="og:title" content="Error | Digitomize"/>
        <meta property="og:description" content={contentDescription} />
        <meta name="description" content={contentDescription} />
      </Helmet>
      <Navbar />
      <div className="error-container">
        <div className="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText && `Error : ${error.statusText}`}</i>
          </p>
          <button className="button-4">
            <Link to="/contests">Return to contests</Link>
          </button>
        </div>
      </div>
    </>
  );
}
