import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Hamburger.css";
//import { isConstructorDeclaration } from "typescript";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NONAME } from "dns";

function Hamburger() {
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
    <nav className="hamburger-container">
      <div className="hamburger-button-container">
        <div className="hamburger-button" id="hamburgerId" onClick={navbarOpen}>
          <div className="bar-one" id="barOneId"></div>
          <div className="bar-two" id="barTwoId"></div>
          <div className="bar-three" id="barThreeId"></div>
        </div>
      </div>
    </nav>
  );
}

export default Hamburger;
