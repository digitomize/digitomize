import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

function Home() {
  const contentDescription = `Empowering Coders and Developers Worldwide`;
  return (
    <>
      <Helmet>
        <title>Home | Digitomize</title>
        <meta property="og:title" content="Home | Digitomize"></meta>
        <meta property="og:description" content={contentDescription} />
        <meta property="description" content={contentDescription} />
      </Helmet>
      <div>
        <Navbar />
        <h1>Home goes here</h1>
      </div>
    </>
  );
}

export default Home;
