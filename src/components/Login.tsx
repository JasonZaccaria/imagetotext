import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Login.css";
import { isConstructorDeclaration } from "typescript";
import Hamburger from "./Hamburger";
import SlidingNavbar from "./SlidingNavbar";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useOutlet,
} from "react-router-dom";

function Login() {
  //state for menu button and navbar
  let [menu, setMenu] = useState(false);

  //below we will have our loggedIn context variable we are passed from our protected routes
  //now we will use this logged in variable in our useeffect to adjust the links the user sees
  const loggedIn: boolean = useOutletContext();
  console.log(loggedIn);

  //function to post user data to register them
  async function post(e: any) {
    e.preventDefault();
    const email = (document.getElementById("loginEmailId") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("loginPasswordId") as HTMLInputElement
    ).value;
    const url = "http://127.0.0.1:8000/login";
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
    /*new changes here 7/11*/
    if (Object.keys(content)[0] === "accessToken") {
      window.location.replace("/user");
    } else {
      const emailInput = document.getElementById("loginEmailId");
      const passwordInput = document.getElementById("loginPasswordId");
      const forgotPassword = document.getElementById("forgot-password-id");
      emailInput!.style.border = "solid 2px red";
      emailInput!.style.borderRadius = "5px";
      passwordInput!.style.border = "solid 2px red";
      passwordInput!.style.borderRadius = "5px";
      forgotPassword!.style.display = "flex";
      console.log("not workign as intended");
    }
  }

  //here are the links we show for our navbar on this page
  function slidingNavbarStyling(): void {
    const register = document.getElementById("register-redirect-id");
    const login = document.getElementById("login-redirect-id");
    const logout = document.getElementById("logout-redirect-id");
    const user = document.getElementById("user-redirect-id");
    const home = document.getElementById("home-redirect-id");

    if (loggedIn) {
      login!.style.display = "none";
    } else {
      login!.style.display = "none";
      logout!.style.display = "none";
      user!.style.display = "none";
    }
  }

  //here is our function for closing our navbar
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
  window.addEventListener("load", (e) => {
    console.log("heasdfdafsd");
    if (window.innerWidth > 768) {
      const registerLink = document.getElementById("register-login-link-1");
      const logoutLink = document.getElementById("logout-login-link-2");
      const userLink = document.getElementById("user-login-link-3");
      const homeLink = document.getElementById("home-login-link-4");

      if (loggedIn) {
        registerLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });
  window.addEventListener("resize", (e) => {
    console.log("heasdfdafsd");
    if (window.innerWidth > 768) {
      const registerLink = document.getElementById("register-login-link-1");
      const logoutLink = document.getElementById("logout-login-link-2");
      const userLink = document.getElementById("user-login-link-3");
      const homeLink = document.getElementById("home-login-link-4");

      if (loggedIn) {
        registerLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });
  /*function LoginBiggerScreenLinks(): void {
    console.log("testing to see if login fuction works");
    if (window.innerWidth > 768) {
      console.log("heasdfdafsd");
      const registerLink = document.getElementById("register-login-link-1");
      const logoutLink = document.getElementById("logout-login-link-2");
      const userLink = document.getElementById("user-login-link-3");
      const homeLink = document.getElementById("home-login-link-4");

      if (loggedIn) {
        registerLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  }*/

  //this event listener closes our navbar when the screen gets too big
  window.addEventListener("resize", (e) => {
    console.log("hello change");
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");
    //we resize as well as alter which links we saw on the top of the page based on if user is logged in or not
    if (window.innerWidth > 1023) {
      //LoginBiggerScreenLinks();
      navbar!.style.width = "0%";
      //sidePanelCount.current = 0;
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });

  useEffect(() => {
    slidingNavbarStyling();
    //LoginBiggerScreenLinks();
  }, []);
  return (
    <div className="Login" onClick={navbarClose}>
      <section className="login-navbar-section">
        <Navbar menu={menu} setMenu={setMenu} />
      </section>
      <SlidingNavbar />
      <nav className="login-navbar-container">
        <h1 className="login-navbar-title">Image To Text</h1>
        <div className="login-navbar-links">
          <a
            href="/register"
            /*to="/register"*/
            className="login-link-styling"
            id="register-login-link-l"
          >
            Register
          </a>
          <a
            href="/"
            /*to="/*/ className="login-link-styling"
            id="logout-login-link-2"
          >
            Logout
          </a>
          <a
            href="/user"
            /*to="/user"*/
            className="login-link-styling"
            id="user-login-link-3"
          >
            User
          </a>
          <a
            href="/"
            /*to="/"*/ className="login-link-styling"
            id="home-login-link-4"
          >
            Home
          </a>
        </div>
      </nav>
      <div className="login-form-container">
        <div className="login-form-title">Login</div>
        <form
          id="loginFormId"
          name="formName"
          action="http://127.0.0.1:8000/login"
        >
          <div className="login-email-container">
            <input
              type="email"
              id="loginEmailId"
              name="emailName"
              placeholder="Email"
            ></input>
          </div>
          <div className="login-password-container">
            <input
              type="password"
              id="loginPasswordId"
              name="passwordName"
              placeholder="Password"
            ></input>
          </div>
          <div className="forgot-password" id="forgot-password-id">
            Invalid email or password!
          </div>
          <div className="login-submit-container">
            <button
              type="submit"
              onClick={post}
              className="login-submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
