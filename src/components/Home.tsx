import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Home.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { NONAME } from "dns";
import Hamburger from "./Hamburger";
import SlidingNavbar from "./SlidingNavbar";
function Home() {
  //below we have our state for saving our user's log in status
  let [loggedIn, setLoggedIn] = useState(false);
  //let [sidePanel, setSidePanel] = useState(false);
  //let [sidePanelCount, setSidePanelCount] = useState(0);
  let sidePanel = useRef(false);
  let sidePanelCount = useRef(0);
  //below we grab the uploaded file and file name
  async function getFile(e: any) {
    //below function grabs uploaded file
    console.log(typeof e);
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imgFile);
    const url = "http://127.0.0.1:8000/imageconvert";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: formData,
      /*headers: {
        //Access: "application/json",
        "Content-Type": "application/json",
      },*/
      credentials: "include",
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }

  //below we use a get request to autenticate user form server and update loggedIn state
  async function auth() {
    const url = "http://127.0.0.1:8000/auth";
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const compareResponse = await response.json();
    try {
      if (compareResponse["success"] === "user authenticated") {
        //here we are authenticated and we need to set our useState hook as true;
        setLoggedIn(true);
        console.log("success user authenticated");
      } else {
        //here we need to set our useState hook as false
        setLoggedIn(false);
        console.log("failure user not logged in");
      }
    } catch (err) {
      console.log(err);
      console.log("server issue user not logged in");
    }
  }

  //below function renders specific login buttons depending on the return value of our auth func
  async function buttonRender(func: Function) {
    func();
    const registerButton = document.getElementById("register-button-id");
    const loginButton = document.getElementById("login-button-id");
    const logoutButton = document.getElementById("logout-button-id");
    const userButton = document.getElementById("user-button-id");

    if (loggedIn) {
      registerButton!.style.display = "none";
      loginButton!.style.display = "none";
      logoutButton!.style.display = "flex";
      userButton!.style.display = "flex";
    } else {
      registerButton!.style.display = "flex";
      loginButton!.style.display = "flex";
      logoutButton!.style.display = "none";
      userButton!.style.display = "none";
    }
  }
  useEffect(() => {
    buttonRender(auth);
  }, [loggedIn]);
  async function imagConverter(e: any) {
    e.preventDefault();
    console.log("hi");
    const url = "http://127.0.0.1:8000/imageconvert";
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }

  function navbarOpen(): void {
    //this function opens up the side navbar on button click and renders only specific buttons
    //depending on if user is logged in or not
    //setSidePanel(true);
    //setSidePanelCount((sidePanelCount += 1));
    sidePanel.current = true;
    sidePanelCount.current = sidePanelCount.current += 1;
    const navbar = document.getElementById("navbarId");
    const registerRedirect = document.getElementById("register-redirect-id");
    const loginRedirect = document.getElementById("login-redirect-id");
    const logoutRedirect = document.getElementById("logout-redirect-id");
    const userRedirect = document.getElementById("user-redirect-id");

    if (navbar!.style.width != "50%") {
      navbar!.style.width = "50%";
      sidePanel.current = true;
    } else {
      navbar!.style.width = "0%";
      sidePanel.current = false;
    }
    //navbar!.style.width = "50%";
    console.log(loggedIn);
    if (loggedIn) {
      registerRedirect!.style.display = "none";
      loginRedirect!.style.display = "none";
      logoutRedirect!.style.display = "flex";
      userRedirect!.style.display = "flex";
    } else {
      registerRedirect!.style.display = "flex";
      loginRedirect!.style.display = "flex";
      logoutRedirect!.style.display = "none";
      userRedirect!.style.display = "none";
    }
  }

  function closeSideBar(e: any) {
    sidePanelCount.current++;
    console.log(sidePanelCount.current);
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    if (sidePanel.current && sidePanelCount.current >= 3) {
      navbar!.style.width = "0%";
      sidePanelCount.current = 0;
      sidePanel.current = false;
      //also i need to reset the hamburger classes
      /*menuButton?.classList.remove("open");*/
    } else if (!sidePanel.current) {
      navbar!.style.width = "0%";
      sidePanelCount.current = 0;
      sidePanel.current = false;
      /*menuButton?.classList.add("open");*/
    }
  }

  //closeSideBar();

  return (
    <div className="Home" onClick={closeSideBar}>
      <header className="navbar">
        <div className="page-title-container">
          <h1 className="page-title">Image To Text</h1>
        </div>
        <nav className="hamburger-styling" onClick={navbarOpen}>
          <Hamburger />
        </nav>
        <nav className="links">
          <Link
            className="register-link"
            id="register-button-id"
            to="/register"
          >
            Register
          </Link>
          <Link className="login-link" id="login-button-id" to="/login">
            Login
          </Link>
          <Link className="logout-link" id="logout-button-id" to="/logout">
            Logout
          </Link>
          <Link
            className="userprofile-link"
            id="user-button-id"
            to="/userprofile"
          >
            Posts
          </Link>
        </nav>
      </header>
      <SlidingNavbar />
      <h1 className="main-title">Turn any image into usable text below!</h1>
      <section className="main-box">
        <div className="text-conversion-box">
          <h2 className="image-drop-title">Drop image here!</h2>
          <input
            className="file-upload"
            id="file"
            type="file"
            onChange={getFile}
          ></input>
          <label htmlFor="file" className="file-upload-label">
            Upload image
          </label>
        </div>
      </section>
      <div className="save-data">
        <button
          type="submit"
          className="save-data-button"
          onClick={imagConverter}
        >
          Save conversion
        </button>
      </div>
    </div>
  );
}

export default Home;
