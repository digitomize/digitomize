import { useState } from "react";
import Contests from "./components/Contests";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Potd from "./components/Potd";

// function App() {
//   return (
//     <Router>
//       <div className="bg-zinc-900 App w-96 min-h-40 mx-auto rounded-xl">
//         <Header />
//         <Route exact path="/" component={Contests} />
//         {/* Add more routes here */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route errorElement={<ErrorPage />}>
//     <Route path="/" element={<Contests />}>
//       <Route index element={<Contests />} />
//       <Route path="contests" element={<Contests />} />
//       {/* <Route path="potd" element={<Potd />} /> */}
//     </Route>
//     // </Route>
//   ),
// );

function ComingSoon() {
  return (
    <div className="w-full mx-auto text-center">
      <h1 className="text-xl">
        Coming Soon
        <span className="loading loading-bars loading-xs"></span>
      </h1>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("contests");

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "contests":
        return <Contests />;
      case "potd":
        return <ComingSoon />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-zinc-900 App w-96 min-h-40 mx-auto rounded-xl">
        <Header />
        <Nav path={currentPage} navigateToPage={navigateToPage} />
        {renderPage()}
        <Footer />
      </div>
    </>
  );
}

export default App;
