import React from 'react';
import logo from './logo.png';
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </nav>
  );
};

export default Navbar;
