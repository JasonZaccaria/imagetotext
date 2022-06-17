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
import LoadingAnimation from "./LoadingAnimation";

function Home() {
  //below we have our state for saving our user's log in status, when our menu
  //is open, as well as if our sidepanel is open
  let [testVar, setTestVar] = useState();
  let [loggedIn, setLoggedIn] = useState(false);
  let [menu, setMenu] = useState(false);
  let [currentFile, setCurrentFile] = useState(new Blob());
  let sidePanel = useRef(false);
  let sidePanelCount = useRef(0);
  //below we grab the uploaded file and file name
  async function getFile(e: any) {
    const loadingScreen = document.getElementById("loading-container-id");
    const imageDropTitle = document.getElementById("image-drop-title-id");
    const fileUploadLabel = document.getElementById("file-upload-label-id");
    const convertedTextContainer = document.getElementById(
      "converted-text-container-id"
    );
    const saveData = document.getElementById("save-data-id");
    loadingScreen!.style.display = "flex";
    imageDropTitle!.style.display = "none";
    fileUploadLabel!.style.display = "none";
    console.log(typeof e);
    const imgFile = e.target.files[0];
    console.log(typeof imgFile);
    const formData = new FormData();
    formData.append("file", imgFile);
    console.log(formData);
    setCurrentFile(e.target.files[0]);
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
    //this code below happens after we get our response
    loadingScreen!.style.display = "none";
    /*imageDropTitle!.style.display = "flex";
    fileUploadLabel!.style.display = "flex";*/
    convertedTextContainer!.style.display = "flex";
    setTestVar(responseJson["success"]);
    saveData!.style.display = "flex";
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

  /*useEffect(() => {
    buttonRender(auth);
  }, [loggedIn]);*/

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
    console.log(window.innerWidth);
    sidePanelCount.current++;
    console.log(sidePanelCount.current);
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    if (sidePanel.current && sidePanelCount.current >= 3) {
      console.log("h");
      navbar!.style.width = "0%";
      sidePanelCount.current = 0;
      sidePanel.current = false;
      //also i need to reset the hamburger classes
      menuButton?.classList.remove("open");
      setMenu(false);
    } else if (!sidePanel.current) {
      console.log("hi");
      navbar!.style.width = "0%";
      sidePanelCount.current = 0;
      sidePanel.current = false;
      //setMenu(false);
      //menuButton?.classList.add("open");
    }
  }

  async function saveConversion(e: any) {
    e.preventDefault();
    try {
      console.log(currentFile);
      if (!loggedIn) {
        //const imgFile = e.target.files[0];
        const formData = new FormData();
        formData.append("file", currentFile);
        console.log(formData);
        const url = "http://127.0.0.1:8000/imageconvert";
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: formData,
          credentials: "include",
        });
        let responseJson = await response.json();
        console.log(responseJson);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //below event listener closed the side navbar and resets menu button back to
  //normal after window resize
  window.addEventListener("resize", (e) => {
    console.log("hello change");
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");

    if (window.innerWidth > 1023) {
      navbar!.style.width = "0%";
      sidePanelCount.current = 0;
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });
  useEffect(() => {
    buttonRender(auth);
  }, [loggedIn]);
  return (
    <div className="Home" onClick={closeSideBar}>
      <header className="navbar">
        <div className="page-title-container">
          <h1 className="page-title">Image To Text</h1>
        </div>
        <nav className="hamburger-styling" onClick={navbarOpen}>
          <Hamburger menu={menu} />
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
          <div className="loading-container" id="loading-container-id">
            <h1>Loading</h1>
            <div className="loading-animation-display">
              <LoadingAnimation />
            </div>
          </div>
          <div
            className="converted-text-container"
            id="converted-text-container-id"
          >
            <div className="converted-text">{testVar}</div>
          </div>
          <h2 className="image-drop-title" id="image-drop-title-id">
            Drop image here!
          </h2>
          <input
            className="file-upload"
            id="file"
            type="file"
            onChange={getFile}
          ></input>
          <label
            htmlFor="file"
            className="file-upload-label"
            id="file-upload-label-id"
          >
            Upload image
          </label>
        </div>
      </section>
      <div className="save-data" id="save-data-id">
        <button
          type="submit"
          className="save-data-button"
          onClick={saveConversion}
        >
          Save conversion
        </button>
        <button type="submit" className="new-upload-button">
          New upload
        </button>
      </div>
    </div>
  );
}

export default Home;
