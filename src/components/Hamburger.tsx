import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "../styles/Hamburger.css";
//import { isConstructorDeclaration } from "typescript";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NONAME } from "dns";

function Hamburger(props: any) {
  let [menu, setMenu] = useState(props.menu);
  let navbar = document.getElementById("navbarId");
  //let menu = false;
  console.log(menu);
  function hamburgerAction() {
    const hamburgerButton = document.getElementById("menu-btn-id");
    if (!menu || navbar?.style.width != "50%") {
      hamburgerButton?.classList.add("open");
      //menu = true;
      setMenu(true);
      console.log(menu);
    } else {
      hamburgerButton?.classList.remove("open");
      //menu = false;
      setMenu(false);
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
