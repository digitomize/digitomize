import './css/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav>
      <ul className='navbar'>
        <Link to="/">
          <li className='brand'>Digitomize</li>
        </Link>
        <Link to="/contests">
          <li className='contents'>Contests</li>
        </Link>
        <Link to="https://github.com/pranshugupta54/digitomize">
          <li className='contents'>Contribute</li>
        </Link>
        <Link to="#">
          <li className='contents'>Me</li>
        </Link>
     
      </ul>
    </nav>
  );
}

export default Navbar;
