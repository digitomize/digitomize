import { useRouteError, Link } from "react-router-dom";
import "./css/error-page.css";
import Navbar from "./NewNavbar";
import { Helmet } from "react-helmet";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const contentDescription = `ERROR 404`.toLowerCase();
  return (
    <>
      <Helmet>
        <title>error | digitomize</title>
        <meta property="og:title" content="error | digitomize" />
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
            <Link to="/discord">Report on Discord</Link>
          </button>
        </div>
      </div>
    </>
  );
}
