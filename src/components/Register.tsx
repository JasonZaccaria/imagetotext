import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Register.css";
import { isConstructorDeclaration } from "typescript";
import Navbar from "./Navbar";
import SlidingNavbar from "./SlidingNavbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

function Register() {
  //state for menu button
  let [menu, setMenu] = useState(false);

  //below is our passed in login context from protected routes
  const loggedIn: boolean = useOutletContext();

  //function to post user data to register them
  async function post(e: any) {
    e.preventDefault();
    const email = (document.getElementById("emailId") as HTMLInputElement)
      .value;
    const password = (document.getElementById("passwordId") as HTMLInputElement)
      .value;
    const url = "http://127.0.0.1:8000/register";
    //console.log(email);
    //console.log(password);
    const data = { user: email, pass: password };
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const content = await response.json();
    console.log(content);
  }

  function slidingNavbarStyling(): void {
    const register = document.getElementById("register-redirect-id");
    const login = document.getElementById("login-redirect-id");
    const logout = document.getElementById("logout-redirect-id");
    const user = document.getElementById("user-redirect-id");
    const home = document.getElementById("home-redirect-id");
    //register!.style.display = "none";
    //login!.style.display = "none";
    //user!.style.display = "none";

    if (loggedIn) {
      login!.style.display = "none";
      register!.style.display = "none";
    } else {
      register!.style.display = "none";
      logout!.style.display = "none";
      user!.style.display = "none";
    }
  }

  function navbarClose(e: any): void {
    console.log("clicking here");
    console.log(menu);
    const slidingNav = document.getElementById("navbarId");
    let sizeOfNav = slidingNav!.clientWidth;
    let currentMousePosition = e.pageX;
    console.log(currentMousePosition);
    console.log(sizeOfNav);
    if (menu && currentMousePosition > sizeOfNav) {
      console.log("hasdfasfdasfda");
      slidingNav!.style.width = "0";
      setMenu(false);
      const hamburgerButton = document.getElementById("menu-btn-id");
      hamburgerButton?.classList.remove("open");
    }
  }

  //this function will be called on resizing to adjust the links we see when user is logged in or not
  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 768) {
      const loginLink = document.getElementById("login-register-link-1");
      const logoutLink = document.getElementById("logout-register-link-2");
      const userLink = document.getElementById("user-register-link-3");
      const homeLink = document.getElementById("home-register-link-4");

      if (loggedIn) {
        loginLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });

  window.addEventListener("load", (e) => {
    console.log("im loaded up");
    if (window.innerWidth > 768) {
      const loginLink = document.getElementById("login-register-link-1");
      const logoutLink = document.getElementById("logout-register-link-2");
      const userLink = document.getElementById("user-register-link-3");
      const homeLink = document.getElementById("home-register-link-4");

      if (loggedIn) {
        loginLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });

  function LoginBiggerScreenLinks(): void {
    console.log("register testing if function works");
    if (window.innerWidth > 768) {
      const loginLink = document.getElementById("login-register-link-1");
      const logoutLink = document.getElementById("logout-register-link-2");
      const userLink = document.getElementById("user-register-link-3");
      const homeLink = document.getElementById("home-register-link-4");

      if (loggedIn) {
        loginLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  }

  window.addEventListener("resize", (e) => {
    console.log("hello change");
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");

    if (window.innerWidth > 1023) {
      navbar!.style.width = "0%";
      //sidePanelCount.current = 0;
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });

  useEffect(() => {
    slidingNavbarStyling();
    //LoginBiggerScreenLinks();
  });

  return (
    <div className="Register" onClick={navbarClose}>
      <section className="register-navbar-section">
        <Navbar menu={menu} setMenu={setMenu} />
      </section>
      <div className="sliding-navbar-register">
        <SlidingNavbar />
      </div>
      <nav className="register-navbar-link-container">
        <h1 className="register-navbar-title">Image To Text</h1>
        <div className="register-navbar-links">
          <a
            href="/login"
            /*to="/login"*/
            className="register-link-styling"
            id="login-register-link-l"
          >
            Login
          </a>
          <a
            href="/"
            /*to="/"*/
            className="register-link-styling"
            id="logout-register-link-2"
          >
            Logout
          </a>
          <a
            href="user"
            /*to="/user"*/
            className="register-link-styling"
            id="user-register-link-3"
          >
            User
          </a>
          <a
            href="/"
            /*to="/"*/
            className="register-link-styling"
            id="home-register-link-4"
          >
            Home
          </a>
        </div>
      </nav>
      <div className="form-container">
        <div className="register-title">Register</div>
        <form
          id="formId"
          name="formName"
          action="http://127.0.0.1:8000/register"
        >
          <div className="enter-email-container">
            <input
              type="email"
              id="emailId"
              name="emailName"
              placeholder="Email"
            ></input>
          </div>
          <div className="enter-password-container">
            <input
              type="password"
              id="passwordId"
              name="passwordName"
              placeholder="Password"
            ></input>
          </div>
          <div className="submit-container">
            <button type="submit" onClick={post} className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
