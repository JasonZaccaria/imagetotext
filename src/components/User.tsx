import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "../styles/User.css";
import Hamburger from "./Hamburger";
import Navbar from "./Navbar";
import SlidingNavbar from "./SlidingNavbar";
import logouter from "./Logouter";
import { FileWatcherEventKind } from "typescript";
import LoadingAnimation from "./LoadingAnimation";
function User(props: any) {
  //must set menu state to pass into navbar component
  let [menu, setMenu] = useState(false);
  let [updateOnce, setUpdateOnce] = useState();
  //let [loggedIn, setLoggedIn] = useState(false);
  //let menu = useRef(false);

  /*async function logouter() {
    const response = await fetch("http://127.0.0.1:8000/logout", {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }*/

  function navbarClose(e: any): void {
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

  function slidingNavbarStyling(): void {
    const register = document.getElementById("register-redirect-id");
    const login = document.getElementById("login-redirect-id");
    const logout = document.getElementById("logout-redirect-id");
    const user = document.getElementById("user-redirect-id");
    const home = document.getElementById("home-redirect-id");
    register!.style.display = "none";
    login!.style.display = "none";
    user!.style.display = "none";
  }

  async function getUserData() {
    const loadingContainer = document.getElementById(
      "loading-animation-container-id"
    );
    const loadingDotOne = document.getElementById("loading-dot-one-id");
    const loadingDotTwo = document.getElementById("loading-dot-two-id");
    const loadingDotThree = document.getElementById("loading-dot-three-id");
    loadingContainer!.style.display = "flex";
    loadingContainer!.style.width = "50%";
    loadingContainer!.style.height = "50%";
    loadingDotOne!.style.width = "1.5em";
    loadingDotOne!.style.height = "1.5em";
    loadingDotTwo!.style.width = "1.5em";
    loadingDotTwo!.style.height = "1.5em";
    loadingDotThree!.style.width = "1.5em";
    loadingDotThree!.style.height = "1.5em";
    const url: string = `${process.env.REACT_APP_SERVER}/data`;
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    //const readResponse = await response.blob();
    /*const readResponse = await response.json();
    let myImage = document.querySelector("img");
    console.log(readResponse);
    myImage!.src = `data:image/png;base64,${readResponse["image"][0]}`;

    for (let i = 0; i < readResponse["image"].length; i++) {
      console.log("hi");
    }*/
    //above can be uncommented
    //changes start below
    const readResponse = await response.json();
    /*now i will stop the animation by closing the animation display*/
    loadingContainer!.style.display = "none";
    const imageSection = document.getElementById("user-data-section-id");
    for (let i = 0; i < readResponse["image"].length; i++) {
      let newUserPost: HTMLDivElement = document.createElement("div");
      newUserPost.classList.add("newUserPost");
      newUserPost.id = `newUserPostId${i}`; //new addition for delete button
      let newUserPostContent: HTMLDivElement = document.createElement("div");
      newUserPostContent.classList.add("newUserPostContent");
      let newUserPostText: HTMLDivElement = document.createElement("div");
      newUserPostText.classList.add("newUserPostText");
      let newUserPostTop: HTMLDivElement = document.createElement("div");
      newUserPostTop.classList.add("newUserPostTop");
      let newTitle: HTMLParagraphElement = document.createElement("p");
      newTitle.classList.add("newTitle");
      let newText: HTMLParagraphElement = document.createElement("p");
      newText.classList.add("newText");
      let newImg: HTMLImageElement = document.createElement("img");
      newImg.classList.add("newImg");
      let newImgContainer: HTMLDivElement = document.createElement("div");
      newImgContainer.classList.add("newImgContainer");
      let newDate: HTMLParagraphElement = document.createElement("p");
      newDate.classList.add("newDate");
      newTitle.innerHTML = readResponse["image"][i][0];
      //newDate.innerHTML = readResponse["image"][i][3];
      /*testing here for date rearranging*/
      let tempDate: Date = new Date(readResponse["image"][i][3]);
      let dateYear = tempDate.getFullYear();
      let dateMonth = tempDate.getMonth();
      let dateDay = tempDate.getDay();
      let DateConversion: string = `${dateMonth}/${dateDay}/${dateYear}`;
      newDate.innerText = DateConversion;
      newText.innerText = readResponse["image"][i][1];
      let base64Img: string = readResponse["image"][i][2];
      let mimeType: string = readResponse["image"][i][4];
      newImg!.src = `data:${mimeType};base64,${base64Img}`;
      imageSection?.appendChild(newUserPost);
      newUserPost.appendChild(newImgContainer);
      newImgContainer.appendChild(newImg);
      newUserPost.appendChild(newUserPostContent);
      newUserPostContent.appendChild(newUserPostTop);
      newUserPostContent.appendChild(newText);
      newUserPostTop.appendChild(newTitle);
      newUserPostTop.appendChild(newDate);
      //now we will add a delete button feature
      let deletePost = document.createElement("div");
      deletePost.classList.add("deletePost");
      newUserPostContent.appendChild(deletePost);
      let deleteSymbol = document.createElement("div");
      deleteSymbol.classList.add("deleteSymbol");
      deletePost.appendChild(deleteSymbol);
      deleteSymbol.addEventListener("click", () => {
        console.log("delete button has been activated");
        deleteSymbol.style.display = "none";
        let confirmText = document.createElement("p");
        let confirmYes = document.createElement("div");
        let confirmNo = document.createElement("div");
        confirmText.innerText = "Delete Post?";
        confirmText.classList.add("confirmText");
        confirmYes.classList.add("confirmYes");
        confirmNo.classList.add("confirmNo");
        deletePost.appendChild(confirmText);
        deletePost.appendChild(confirmYes);
        deletePost.appendChild(confirmNo);
        //now we are making the symbols for the confirm yes and no buttons
        let yesCheck = document.createElement("div");
        let noCheck = document.createElement("div");
        yesCheck.classList.add("yesCheck");
        noCheck.classList.add("noCheck");
        confirmYes.appendChild(yesCheck);
        confirmNo.appendChild(noCheck);

        //test
        confirmNo.addEventListener("click", async () => {
          console.log("testing testing testing");
          confirmYes.remove();
          confirmNo.remove();
          confirmText.remove();
          deleteSymbol.style.display = "flex";
        });
        //test

        confirmYes.addEventListener("click", async () => {
          let firstParent = confirmYes.parentElement; //delete post
          let secondParent = firstParent?.parentElement; //newuserpostcontent
          let postContainer = secondParent?.parentElement; //newuserpost
          let imageContainer = postContainer?.firstChild;
          let firstChildOfSecondParent = secondParent?.firstChild;
          let titleFound = firstChildOfSecondParent?.firstChild;
          let titleText = titleFound?.textContent;
          const url = `${process.env.REACT_APP_SERVER}/deletePost`;
          const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ titleOfPost: titleText }),
            credentials: "include",
          });
          console.log(response.json());
          //below is the logic for closing the delete button and destroying the elements that were created

          //now as part of the event listener we will delete the post from the screen after hte response has been retrived
          postContainer!.classList.add("removePost");
          postContainer!.classList.remove("newUserPost");
          postContainer!.innerText = "";
        });
      });
    }
  }

  //below function shows links instead of hamburger button for larger screens

  //added over from home page to close navbar if window size is changed too big
  window.addEventListener("resize", (e) => {
    console.log("hello change");
    const navbar = document.getElementById("navbarId");
    const menuButton = document.getElementById("menu-btn-id");

    if (window.innerWidth > 1023) {
      navbar!.style.width = "0%";
      //sidePanelCount.current = 0;
      menuButton?.classList.remove("open");
      setMenu(false);
    }
  });
  /*changes on 7/11 to add onload animation*/
  useEffect(() => {
    getUserData();
    slidingNavbarStyling();
  }, [updateOnce]);

  return (
    <div className="User" onClick={navbarClose}>
      <div className="navbar-user" /*onClick={logouter}*/ id="navbar-user-id">
        <Navbar menu={menu} setMenu={setMenu} />
      </div>
      <div className="navbar-large-device" id="navbar-large-device-id">
        <h1 className="navbar-large-device-title">Image To Text</h1>
        <div className="navbar-user-link-container">
          <a href="/" className="user-links" onClick={logouter}>
            Logout
          </a>
          <a href="/" className="user-links">
            Home
          </a>
        </div>
      </div>
      <div className="sliding-navbar-user">
        <SlidingNavbar />
      </div>
      <section className="user-data-section" id="user-data-section-id">
        <img id="img"></img>
        <div
          className="loading-animation-container"
          id="loading-animation-container-id"
        >
          <LoadingAnimation />
        </div>
      </section>
    </div>
  );
}

export default User;
