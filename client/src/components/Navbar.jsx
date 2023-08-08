import React from 'react';
import './css/Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul className='navbar'>
        <li className='brand'>DIGITOMIZE</li>
        <li className='contents'>HOME</li>
        <li className='contents'>USERS</li>
        <li className='contents'>ME</li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
