import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "../styles/User.css";
import Hamburger from "./Hamburger";
import Navbar from "./Navbar";
import SlidingNavbar from "./SlidingNavbar";
import { FileWatcherEventKind } from "typescript";
function User() {
  //must set menu state to pass into navbar component
  let [menu, setMenu] = useState(false);

  function navbarClose(e: any) {
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

  async function getUserData() {
    const url: string = "http://127.0.0.1:8000/data";
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const readResponse = await response.blob();
    let myImage = document.querySelector("img");
    let objectUrl = URL.createObjectURL(readResponse);
    myImage!.src = objectUrl;
    console.log(readResponse);
    console.log(objectUrl);
  }
  getUserData();

  return (
    <div className="User" onClick={navbarClose}>
      <div className="navbar-user">
        <Navbar menu={menu} setMenu={setMenu} />
      </div>
      <div className="sliding-navbar-user">
        <SlidingNavbar />
      </div>
      <section className="user-data-section"></section>
      <img id="img"></img>
    </div>
  );
}

export default User;
