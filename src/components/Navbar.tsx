import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import Hamburger from "./Hamburger";

function Navbar(props: any) {
  //this state keeps track fi the side panel is open or not
  let menu = props.menu;
  let setMenu = props.setMenu;
  function navbarOpen() {
    const slidingNav = document.getElementById("navbarId");
    if (!menu) {
      slidingNav!.style.width = "50%";
      setMenu(true);
    } else {
      slidingNav!.style.width = "0%";
      setMenu(false);
    }
  }

  function navbarClose() {
    if (menu) {
      const slidingNav = document.getElementById("navbarId");
      slidingNav!.style.width = "0";
      setMenu(false);
      const hamburgerButton = document.getElementById("menu-btn-id");
      hamburgerButton?.classList.remove("open");
    }
  }

  return (
    <div className="Navbar-component">
      <h1 className="navbar-component-title">Image To Text</h1>
      <div className="navbar-component-menu" onClick={navbarOpen}>
        <Hamburger menu={menu} setMenu={setMenu} />
      </div>
    </div>
  );
}

export default Navbar;
