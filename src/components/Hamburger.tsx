import React from "react";
import "../styles/Hamburger.css";

function Hamburger(props: any) {
  let menu: boolean = props.menu;
  let setMenu: React.Dispatch<React.SetStateAction<boolean>> = props.setMenu;
  let navbar: HTMLElement | null = document.getElementById("navbarId");
  console.log(menu);
  function hamburgerAction(): void {
    const hamburgerButton: HTMLElement | null =
      document.getElementById("menu-btn-id");
    if (!menu || navbar?.style.width != "50%") {
      hamburgerButton?.classList.add("open");
      setMenu(true);
      console.log(menu);
    } else {
      hamburgerButton?.classList.remove("open");
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
