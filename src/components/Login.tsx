import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import SlidingNavbar from "./SlidingNavbar";
import Navbar from "./Navbar";
import { useOutletContext } from "react-router-dom";
import logouter from "./Logouter";

function Login() {
  //state for menu button and navbar
  let [menu, setMenu] = useState(false);
  let [incorrectPass, setIncorrectPass] = useState(0);
  /*below we will have our loggedIn context variable we are passed from our protected routes
  now we will use this logged in variable in our useeffect to adjust the links the user sees*/
  const loggedIn: boolean = useOutletContext();
  //function to post user data to register them
  //also includes a request to check for a halt cookie if user has too many attempts
  async function post(e: any): Promise<void> {
    e.preventDefault();
    if (incorrectPass < 10) {
      const submitButton: HTMLButtonElement | null = document.getElementById(
        "login-submit-button-id"
      ) as HTMLButtonElement | null;
      submitButton!.disabled = true;
      const email: string = (
        document.getElementById("loginEmailId") as HTMLInputElement
      ).value;
      const password: string = (
        document.getElementById("loginPasswordId") as HTMLInputElement
      ).value;
      const url: string = `${process.env.REACT_APP_SERVER}/login`;
      const data = { user: email, pass: password };
      const response: Response = await fetch(url, {
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
      if (Object.keys(content)[0] === "accessToken") {
        window.location.replace("/");
      } else if (Object.keys(content)[0] === "halt") {
        window.location.replace("/");
      } else {
        const emailInput: HTMLElement | null =
          document.getElementById("loginEmailId");
        const passwordInput: HTMLElement | null =
          document.getElementById("loginPasswordId");
        const forgotPassword: HTMLElement | null =
          document.getElementById("forgot-password-id");
        emailInput!.style.border = "solid 2px red";
        emailInput!.style.borderRadius = "5px";
        passwordInput!.style.border = "solid 2px red";
        passwordInput!.style.borderRadius = "5px";
        forgotPassword!.style.display = "flex";
      }
      submitButton!.disabled = false;
      setIncorrectPass((incorrectPass += 1));
    } else {
      const haltUser = async () => {
        const url: string = `${process.env.REACT_APP_SERVER}/halt`;
        const response: Response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const getResponseJson = await response.json();
      };
      haltUser();
    }
  }

  //here are the links we show for our navbar on this page
  function slidingNavbarStyling(): void {
    const register: HTMLElement | null = document.getElementById(
      "register-redirect-id"
    );
    const login: HTMLElement | null =
      document.getElementById("login-redirect-id");
    const logout: HTMLElement | null =
      document.getElementById("logout-redirect-id");
    const user: HTMLElement | null =
      document.getElementById("user-redirect-id");
    const home: HTMLElement | null =
      document.getElementById("home-redirect-id");

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
    const slidingNav: HTMLElement | null = document.getElementById("navbarId");
    let sizeOfNav: number = slidingNav!.clientWidth;
    let currentMousePosition: number = e.pageX;
    if (menu && currentMousePosition > sizeOfNav) {
      slidingNav!.style.width = "0";
      setMenu(false);
      const hamburgerButton: HTMLElement | null =
        document.getElementById("menu-btn-id");
      hamburgerButton?.classList.remove("open");
    }
  }

  //this function will be called on resizing to adjust the links we see when user is logged in or not
  window.addEventListener("load", (e) => {
    if (window.innerWidth > 768) {
      const registerLink: HTMLElement | null = document.getElementById(
        "register-login-link-1"
      );
      const logoutLink: HTMLElement | null = document.getElementById(
        "logout-login-link-2"
      );
      const userLink: HTMLElement | null =
        document.getElementById("user-login-link-3");
      const homeLink: HTMLElement | null =
        document.getElementById("home-login-link-4");

      if (loggedIn) {
        registerLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });
  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 768) {
      const registerLink: HTMLElement | null = document.getElementById(
        "register-login-link-1"
      );
      const logoutLink: HTMLElement | null = document.getElementById(
        "logout-login-link-2"
      );
      const userLink: HTMLElement | null =
        document.getElementById("user-login-link-3");
      const homeLink: HTMLElement | null =
        document.getElementById("home-login-link-4");

      if (loggedIn) {
        registerLink!.style.display = "none";
      } else {
        logoutLink!.style.display = "none";
        userLink!.style.display = "none";
      }
    }
  });

  //this event listener closes our navbar when the screen gets too big
  window.addEventListener("resize", (e) => {
    const navbar: HTMLElement | null = document.getElementById("navbarId");
    const menuButton: HTMLElement | null =
      document.getElementById("menu-btn-id");
    //we resize as well as alter which links we saw on the top of the page based on if user is logged in or not
    if (window.innerWidth > 1023) {
      navbar!.style.width = "0%";
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });

  useEffect(() => {
    slidingNavbarStyling();
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
            className="login-link-styling"
            id="register-login-link-l"
          >
            Register
          </a>
          <a
            href="/"
            className="login-link-styling"
            id="logout-login-link-2"
            onClick={logouter}
          >
            Logout
          </a>
          <a href="/user" className="login-link-styling" id="user-login-link-3">
            User
          </a>
          <a href="/" className="login-link-styling" id="home-login-link-4">
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
              id="login-submit-button-id"
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
