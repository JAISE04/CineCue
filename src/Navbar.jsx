import React from 'react';
import logo from '../public/cinecue-logo.png'; // adjust path if needed

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} height={50} alt="CineCue Logo" style={{ height: '50px' }} />
    </div>
  );
};

export default Navbar;
