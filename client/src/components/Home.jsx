import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

function Home() {
  const contentDescription = `Empowering Coders and Developers Worldwide`.toLowerCase();
  return (
    <>
      <Helmet>
        <title>home | digitomize</title>
        <meta property="og:title" content="home | digitomize"/>
        <meta property="og:description" content={contentDescription} />
        <meta name="description" content={contentDescription} />
      </Helmet>
      <div>
        <Navbar />
        <h1>Home goes here</h1>
      </div>
    </>
  );
}

export default Home;
