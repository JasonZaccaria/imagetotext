import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Register.css";
import { isConstructorDeclaration } from "typescript";

function Register() {
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

  return (
    <div className="Register">
      <div className="navbar">
        <button className="login-button" type="button">
          Login
        </button>
        <button className="home-button" type="button">
          Home
        </button>
      </div>
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
