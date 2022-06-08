import React from "react";
import { Link } from "react-router-dom";
import "../styles/SlidingNavbar.css";

function SlidingNavbar() {
  return (
    <div className="login-navbar" id="navbarId">
      <div className="nav-title">Menu</div>
      <div className="navbar-links">
        <div className="redirect" id="register-redirect-id">
          <Link to="/register" className="redirect">
            Register
          </Link>
        </div>

        <div className="redirect" id="login-redirect-id">
          <Link to="/login" className="redirect">
            Login
          </Link>
        </div>
        <div className="redirect" id="logout-redirect-id">
          <Link to="/logout" className="redirect">
            Logout
          </Link>
        </div>
        <div className="redirect" id="user-redirect-id">
          <Link to="/user" className="redirect">
            User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SlidingNavbar;
