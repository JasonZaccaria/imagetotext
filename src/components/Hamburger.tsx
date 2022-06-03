import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Hamburger.css";
//import { isConstructorDeclaration } from "typescript";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NONAME } from "dns";

function Hamburger() {
  let menu = false;
  function hamburgerAction() {
    const hamburgerButton = document.getElementById("menu-btn-id");
    if (!menu) {
      hamburgerButton?.classList.add("open");
      menu = true;
      console.log(menu);
    } else {
      hamburgerButton?.classList.remove("open");
      menu = false;
      console.log(menu);
    }
  }
  return (
    <div className="menu-btn" id="menu-btn-id" onClick={hamburgerAction}>
      <div className="menu-btn__burger"></div>
    </div>
  );
}

export default Hamburger;
