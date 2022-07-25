import React, { useState, useRef, useEffect } from "react";
import "../styles/Register.css";
import Navbar from "./Navbar";
import SlidingNavbar from "./SlidingNavbar";
import { BrowserRouter as Router, useOutletContext } from "react-router-dom";

function Register() {
  //state for menu button
  let [menu, setMenu] = useState(false);
  //below is our passed in login context from protected routes
  const loggedIn: boolean = useOutletContext();

  //function to post user data to register them
  async function post(e: any): Promise<void> {
    e.preventDefault();
    const email: string = (
      document.getElementById("emailId") as HTMLInputElement
    ).value;
    const password: string = (
      document.getElementById("passwordId") as HTMLInputElement
    ).value;
    const url: string = `${process.env.REACT_APP_SERVER}/register`;
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
    console.log(content);
    if (Object.keys(content)[0] === "failure") {
      const emailInput: HTMLElement | null = document.getElementById("emailId");
      const passwordInput: HTMLElement | null =
        document.getElementById("passwordId");
      const incorrectEmail: HTMLElement | null =
        document.getElementById("incorrect-email-id");
      emailInput!.style.border = "solid 2px red";
      emailInput!.style.borderRadius = "5px";
      passwordInput!.style.border = "solid 2px red";
      passwordInput!.style.borderRadius = "5px";
      incorrectEmail!.style.display = "flex";
    }
  }

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
    const slidingNav: HTMLElement | null = document.getElementById("navbarId");
    let sizeOfNav: number = slidingNav!.clientWidth;
    let currentMousePosition: number = e.pageX;
    console.log(currentMousePosition);
    console.log(sizeOfNav);
    if (menu && currentMousePosition > sizeOfNav) {
      console.log("hasdfasfdasfda");
      slidingNav!.style.width = "0";
      setMenu(false);
      const hamburgerButton: HTMLElement | null =
        document.getElementById("menu-btn-id");
      hamburgerButton?.classList.remove("open");
    }
  }

  //this function will be called on resizing to adjust the links we see when user is logged in or not
  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 768) {
      const loginLink: HTMLElement | null = document.getElementById(
        "login-register-link-1"
      );
      const logoutLink: HTMLElement | null = document.getElementById(
        "logout-register-link-2"
      );
      const userLink: HTMLElement | null = document.getElementById(
        "user-register-link-3"
      );
      const homeLink: HTMLElement | null = document.getElementById(
        "home-register-link-4"
      );

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

  window.addEventListener("resize", (e) => {
    console.log("hello change");
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");
    if (window.innerWidth > 1023) {
      navbar!.style.width = "0%";
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });

  useEffect(() => {
    slidingNavbarStyling();
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
            className="register-link-styling"
            id="login-register-link-l"
          >
            Login
          </a>
          <a
            href="/"
            className="register-link-styling"
            id="logout-register-link-2"
          >
            Logout
          </a>
          <a
            href="user"
            className="register-link-styling"
            id="user-register-link-3"
          >
            User
          </a>
          <a
            href="/"
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
          <p className="incorrect-email" id="incorrect-email-id">
            Email already in system!
          </p>
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
