import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Login.css";
import { isConstructorDeclaration } from "typescript";
import Hamburger from "./Hamburger";
import SlidingNavbar from "./SlidingNavbar";

function Login() {
  //func below checks for position of click to close our nav menu when open
  //document.addEventListener("click", (e) => {
  //const navBarSize = document.getElementById("navbarId");
  //if (e.clientX > navBarSize!.clientWidth) {
  //console.log("this should close");
  //navBarSize!.style.width = "0%";
  //}
  //console.log(e.clientX);
  //});

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
  }

  //here is our function to open the sliding nav menu
  function navbarOpen() {
    const navbar = document.getElementById("navbarId");
    navbar!.style.width = "50%";
  }
  return (
    <div className="Login">
      <nav className="navbar-top">
        <h1 className="login-title">Image To Text</h1>
        <div className="hamburger-container" onClick={navbarOpen}>
          <Hamburger />
        </div>
      </nav>
      <SlidingNavbar />
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
          <div className="forgot-password">Forgot password? click here!</div>
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
