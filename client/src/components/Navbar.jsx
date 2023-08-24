// Navbar.js
import { useState, useEffect } from 'react';
import './css/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/digitomizeLogo.png'
import { useUserAuth } from '../context/UserAuthContext';

function Navbar() {
  // const name = getUserNameFromCookie()
  const [isMenuActive, setActive] = useState(false);
  const { user, logOut } = useUserAuth()
  console.log(user)

  const handleSignout = async () => {
    try {
      await logOut()
    } catch (err) {
      console.log(err.message)
    }
  }

  function toggleActive() {
    // console.log("clicekd");
    if (isMenuActive) {
      setActive(false);
    }
    else {
      setActive(true);
    }
  }

  useEffect(() => {

    document.body.className = isMenuActive ? "scrollOff" : '';
  }, [isMenuActive]);


  return (
    <nav>
      <div className='navbar'>


        <div className="brand">
          <Link to="/" className='nav-brand-link'>

            <img src={logo} alt="Logo" width="75%" />
          </Link>
        </div>

        <div className={`nav-link  ${isMenuActive ? 'active' : ''}`}>
          <Link to="/contests" className='link'>
            <li onClick={() => toggleActive()} className='contents'>Contests</li>
          </Link>
          <Link to="https://github.com/pranshugupta54/digitomize" className='link' >
            <li onClick={() => toggleActive()} className='contents'>Contribute</li>
          </Link>
          <Link to='/login' className='link'>
            <li onClick={() => toggleActive()} className='contents'>Login</li>
          </Link>
          {user && <li onClick={handleSignout} className='contents'>Signout</li>}
        </div>

        <div onClick={() => toggleActive()} className={`closeMenu ${isMenuActive ? 'active' : ''}`}>close</div>

        <div onClick={() => toggleActive()} className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
