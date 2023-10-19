// Navbar.js
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/digitomizeLogo.png";
import { getUserNameFromCookie } from "../../api";

function Navbar() {
  const name = getUserNameFromCookie();
  const [path, setPath] = useState("/login");
  const [btnMessage, setBtnMessage] = useState("Login");
  const [isMenuActive, setActive] = useState(false);

  function toggleActive() {
    if (isMenuActive) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  useEffect(() => {
    if (name) {
      setBtnMessage(name);
      setPath("/user/dashboard");
    }

    document.body.className = isMenuActive ? "scrollOff" : "";
  }, [isMenuActive, name]);

  //  for navlinks
  const navLinks = [
    { name: "Contests", path: "/contests" },
    {
      name: "Contribute",
      path: "https://github.com/pranshugupta54/digitomize",
    },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <nav>
      <div className="navbar">
        <div className="brand">
          <Link to="/" className="nav-brand-link">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className={`nav-link  ${isMenuActive ? "active" : ""}`}>
          {navLinks.map((item, index) => (
            <Link to={item.path} className="link" key={index}>
              <li onClick={() => toggleActive()} className="contents">
                {item.name}
              </li>
            </Link>
          ))}
        </div>
        {/* for close menu  */}
        <div
          onClick={() => toggleActive()}
          className={`closeMenu ${isMenuActive ? "active" : ""}`}
        >
          <AiOutlineClose />
        </div>
        {/* for open menu  */}
        <div onClick={() => toggleActive()} className="hamburger">
          <FiMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
