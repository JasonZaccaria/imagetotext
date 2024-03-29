import React from "react";
import logouter from "./Logouter";
import "../styles/SlidingNavbar.css";

function SlidingNavbar() {
  return (
    <div className="login-navbar" id="navbarId">
      <div className="nav-title">Menu</div>
      <div className="navbar-links">
        <div className="redirect" id="register-redirect-id">
          <a href="/register" className="redirect">
            Register
          </a>
        </div>
        <div className="redirect" id="login-redirect-id">
          <a href="/login" className="redirect">
            Login
          </a>
        </div>
        <div className="redirect" id="logout-redirect-id">
          <a href="/" className="redirect" onClick={logouter}>
            Logout
          </a>
        </div>
        <div className="redirect" id="user-redirect-id">
          <a href="/user" className="redirect">
            Posts
          </a>
        </div>
        <div className="redirect" id="home-redirect-id">
          <a href="/" className="redirect">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default SlidingNavbar;
