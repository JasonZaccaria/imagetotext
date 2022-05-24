import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Login.css";
import { isConstructorDeclaration } from "typescript";

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
    const hamburger = document.getElementById("hamburgerId");
    const barOne = document.getElementById("barOneId");
    const barTwo = document.getElementById("barTwoId");
    const barThree = document.getElementById("barThreeId");
    const navbar = document.getElementById("navbarId");

    if (barOne!.className === "bar-one") {
      barOne?.classList.add("translated-bar-one");
      barTwo?.classList.add("translated-bar-two");
      barThree?.classList.add("translated-bar-three");

      barOne?.classList.remove("bar-one");
      barTwo?.classList.remove("bar-two");
      barThree?.classList.remove("bar-three");
    } else if (barOne!.className === "translated-bar-one") {
      barOne?.classList.add("bar-one");
      barTwo?.classList.add("bar-two");
      barThree?.classList.add("bar-three");

      barOne?.classList.remove("translated-bar-one");
      barTwo?.classList.remove("translated-bar-two");
      barThree?.classList.remove("translated-bar-three");
    }

    navbar!.style.width = "50%";
  }
  return (
    <div className="Login">
      <div className="hamburger-container">
        <div className="hamburger-button-container">
          <div
            className="hamburger-button"
            id="hamburgerId"
            onClick={navbarOpen}
          >
            <div className="bar-one" id="barOneId"></div>
            <div className="bar-two" id="barTwoId"></div>
            <div className="bar-three" id="barThreeId"></div>
          </div>
        </div>
        <div className="empty-space"></div>
      </div>
      <div className="login-navbar" id="navbarId">
        <div className="nav-title">Menu</div>
        <div className="navbar-links">
          <div className="register-redirect">Register</div>
          <div className="home-redirect">Home</div>
        </div>
      </div>
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
