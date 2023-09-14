// Navbar.js
import { useState, useEffect } from "react";
// import "./css/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/digitomizeLogo.png";
// import { useUserAuth } from '../context/UserAuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Navbar() {
  // const name = getUserNameFromCookie()
  const [isMenuActive, setActive] = useState(false);
  // const { user, logOut } = useUserAuth()
  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  function toggleActive() {

    if (window.innerWidth < 768) {
      if (isMenuActive) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }

  useEffect(() => {
    document.body.className = isMenuActive ? "overflow-hidden" : "";
  }, [isMenuActive]);

  return (
    <nav>
      <div className="flex justify-between md:px-16 px-12 md:pt-12 items-center">
        <div className="w-56 max-sm:mt-8">
          <Link to="/">
            <img src={logo} alt="Logo" width="75%" />
          </Link>
        </div>

        <div className={`${isMenuActive ? "bg-black h-full flex justify-center inset-x-0 inset-y-0 z-50 fixed flex-col items-center" : "hidden"} md:flex`}>
          <Link to="/home">
            <li onClick={() => toggleActive()} className="flex text-nav-text text-3xl font-light p-4 lowercase hover:white">
              Home
            </li>
          </Link>
          <Link to="/contests">
            <li onClick={() => toggleActive()} className="flex text-nav-text text-3xl font-light p-4 lowercase hover:white">
              Contests
            </li>
          </Link>
          <Link to="https://github.com/pranshugupta54/digitomize">
            <li onClick={() => toggleActive()} className="text-nav-text flex text-3xl font-light p-4 lowercase hover:white">
              Contribute
            </li>
          </Link>
          <Link to="/login">
            <li onClick={() => toggleActive()} className="text-nav-text  flex text-3xl font-light p-4 lowercase hover:white">
              Login
            </li>
          </Link>
          {/* <li onClick={handleSignout} className='contents'>Signout</li> */}
        </div>

        <div
          onClick={() => toggleActive()}
          className={`${isMenuActive ? "mx-6 my-2 block fixed right-5 z-50" : "hidden"}`}
        >
          close
        </div>

        <div onClick={() => toggleActive()} className="md:hidden max-sm:block cursor-pointer">
          <span className="block w-6 h-0.5 my-1.5 bg-white mx-auto"></span>
          <span className="block w-6 h-0.5 my-1.5 bg-white mx-auto"></span>
          <span className="block w-6 h-0.5 my-1.5 bg-white mx-auto"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
