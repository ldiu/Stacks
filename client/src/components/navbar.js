import React from "react";
import '../style.css';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <NavLink className="navbarLogo" to="/" style={{ textDecoration: 'none' }}>
          <div id="logo">$TACK$</div>
        </NavLink>
        <Link to="/login" id="loginButton" style={{ textDecoration: 'none' }}>Login</Link>
      </nav>
    </div>
  );
}