// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav>
      <ul>
        {/* <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/create-content">Create Content</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )} */}
        {/* <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
