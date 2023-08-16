// Navbar.js
import './css/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav>
      <div className='navbar'>
        <div className="brand">
        <Link to="/" className='nav-link'>
          <p>Digitomize</p>
        </Link>
        </div>
        <div className='nav-link'>
          <Link to="/contests" className='link'>
            <li className='contents'>Contests</li>
          </Link>
          <Link to="https://github.com/pranshugupta54/digitomize"className='link' >
            <li className='contents'>Contribute</li>
          </Link>
          <Link to="#" className='link'>
            <li className='contents'>Me</li>
          </Link>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
