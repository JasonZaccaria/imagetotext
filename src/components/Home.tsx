import React, { useState, useRef, useEffect } from "react";
import "../styles/Home.css";
import Hamburger from "./Hamburger";
import SlidingNavbar from "./SlidingNavbar";
import LoadingAnimation from "./LoadingAnimation";
import logouter from "./Logouter";
import { authObject } from "../services/interfaces";

function Home() {
  /*below we have our states for managing logged in, menu, curretfiles, and refs
  for our sidepanel*/
  let [loggedIn, setLoggedIn] = useState(false);
  let [menu, setMenu] = useState(false);
  let [currentFile, setCurrentFile] = useState(new Blob());
  let [currentString, setCurrentString] = useState("");
  let [currentTitle, setCurrentTitle] = useState("");
  let sidePanel: React.MutableRefObject<boolean> = useRef(false);
  let sidePanelCount: React.MutableRefObject<number> = useRef(0);

  //below we grab the uploaded file and convert it into text and display to user
  async function getFile(e: any): Promise<void> {
    try {
      const loadingScreen: HTMLElement | null = document.getElementById(
        "loading-container-id"
      );
      const imageDropTitle: HTMLElement | null = document.getElementById(
        "image-drop-title-id"
      );
      const fileUploadLabel: HTMLElement | null = document.getElementById(
        "file-upload-label-id"
      );
      const convertedTextContainer: HTMLElement | null =
        document.getElementById("converted-text-container-id");
      const saveData: HTMLElement | null =
        document.getElementById("save-data-id");
      loadingScreen!.style.display = "flex";
      imageDropTitle!.style.display = "none";
      fileUploadLabel!.style.display = "none";
      console.log(typeof e);
      const imgFile = e.target.files[0];
      console.log(typeof imgFile);
      const formData: FormData = new FormData();
      formData.append("file", imgFile);
      console.log(formData);
      setCurrentFile(e.target.files[0]);
      const url: string = `${process.env.REACT_APP_SERVER}/imageconvert`;
      const response: Response = await fetch(url, {
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
      if (Object.keys(responseJson)[0] === "success") {
        console.log(responseJson);
        loadingScreen!.style.display = "none";
        convertedTextContainer!.style.display = "flex";
        setCurrentString(responseJson["success"]);
        saveData!.style.display = "flex";
      } else {
        console.log("could not convert into text");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  }

  //below we use a get request to autenticate user form server and update loggedIn state
  async function auth(): Promise<void> {
    const url: string = `${process.env.REACT_APP_SERVER}/auth`;
    const response: Response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const compareResponse: authObject = await response.json();
    try {
      if (Object.keys(compareResponse)[0] === "success") {
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
  async function buttonRender(func: Function): Promise<void> {
    func();
    const registerButton: HTMLElement | null =
      document.getElementById("register-button-id");
    const loginButton: HTMLElement | null =
      document.getElementById("login-button-id");
    const logoutButton: HTMLElement | null =
      document.getElementById("logout-button-id");
    const userButton: HTMLElement | null =
      document.getElementById("user-button-id");

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

  function navbarOpen(): void {
    /*this function opens up the side navbar on button click and renders only specific buttons
    depending on if user is logged in or not*/
    sidePanel.current = true;
    sidePanelCount.current = sidePanelCount.current += 1;
    const navbar: HTMLElement | null = document.getElementById("navbarId");
    const registerRedirect: HTMLElement | null = document.getElementById(
      "register-redirect-id"
    );
    const loginRedirect: HTMLElement | null =
      document.getElementById("login-redirect-id");
    const logoutRedirect: HTMLElement | null =
      document.getElementById("logout-redirect-id");
    const userRedirect: HTMLElement | null =
      document.getElementById("user-redirect-id");

    if (navbar!.style.width !== "50%") {
      navbar!.style.width = "50%";
      sidePanel.current = true;
    } else {
      navbar!.style.width = "0%";
      sidePanel.current = false;
    }
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

  async function openSaveConversion(): Promise<void> {
    if (!loggedIn) {
      console.log("nopes");
      window.location.replace("/register");
    } else {
      const postTitle: HTMLElement | null =
        document.getElementById("post-title-id");
      const postTitleContent: HTMLElement | null = document.getElementById(
        "post-title-content-id"
      );
      postTitle!.style.display = "flex";
      postTitleContent!.style.display = "flex";
    }
  }

  function closeSaveConversion(): void {
    const postTitle: HTMLElement | null =
      document.getElementById("post-title-id");
    const postTitleContent: HTMLElement | null = document.getElementById(
      "post-title-content-id"
    );
    postTitle!.style.display = "none";
    postTitleContent!.style.display = "none";
  }

  function test(): string {
    const titleOfPost: string = (
      document.getElementById("save-title-input-id") as HTMLInputElement
    ).value;
    return titleOfPost;
  }

  async function saveConversion(e: any): Promise<void> {
    e.preventDefault();
    try {
      console.log(currentFile);
      if (loggedIn) {
        let titleOfPost: string = test();
        console.log(currentTitle);
        console.log("QW");
        const formData: FormData = new FormData();
        formData.append("file", currentFile);
        formData.append("stringConversion", currentString);
        formData.append("title", titleOfPost);
        console.log(formData);
        const url: string = `${process.env.REACT_APP_SERVER}/userdata`;
        const response: Response = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: formData,
          credentials: "include",
        });
        let responseJson = await response.json();
        console.log(responseJson);
        if (Object.keys(responseJson)[0] === "failure") {
          window.location.reload();
        } else {
          let postTitle: HTMLElement | null =
            document.getElementById("post-title-id");
          postTitle!.style.display = "none";
          //now we add code to create a new button to replace save conversion over to view posts tab
          const newUserButton: HTMLButtonElement =
            document.createElement("button");
          const saveDataButton: HTMLElement | null = document.getElementById(
            "save-data-button-first"
          );
          const saveDataDiv: HTMLElement | null =
            document.getElementById("save-data-id");
          saveDataButton!.style.display = "none";
          document.getElementById("save-data-id");
          saveDataDiv?.appendChild(newUserButton);
          newUserButton.classList.add("newUserButton");
          newUserButton.innerText = "Posts";
          newUserButton.addEventListener("click", () => {
            window.location.replace("/user");
          });
        }
      }

      console.log("not logged in so no data was saved");
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  /*below event listener closes the side navbar and resets menu button back to
  normal after window resize*/
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

  function reloadPage() {
    window.location.reload();
  }

  //copying over from user page
  function navbarClose(e: any): void {
    console.log("clicking here");
    console.log(menu);
    const slidingNav: HTMLElement | null = document.getElementById("navbarId");
    let sizeOfNav: number = slidingNav!.clientWidth;
    let currentMousePosition: number = e.pageX;
    console.log(currentMousePosition);
    console.log(sizeOfNav);
    if (menu && currentMousePosition > sizeOfNav) {
      console.log("hasdfasfdasfda");
      slidingNav!.style.width = "0";
      setMenu(false);
      const hamburgerButton: HTMLElement | null =
        document.getElementById("menu-btn-id");
      hamburgerButton?.classList.remove("open");
    }
  }

  //changes here for drop file
  const dropFile = async (e: any): Promise<void> => {
    e.preventDefault();
    console.log("files dropped");
    //console.log(e.target.files[0]);
    console.log(typeof e.dataTransfer.items[0].getAsFile());
    const droppedFile = e.dataTransfer.items[0].getAsFile();
    const loadingScreen: HTMLElement | null = document.getElementById(
      "loading-container-id"
    );
    const imageDropTitle: HTMLElement | null = document.getElementById(
      "image-drop-title-id"
    );
    const fileUploadLabel: HTMLElement | null = document.getElementById(
      "file-upload-label-id"
    );
    const convertedTextContainer: HTMLElement | null = document.getElementById(
      "converted-text-container-id"
    );
    const saveData: HTMLElement | null =
      document.getElementById("save-data-id");
    loadingScreen!.style.display = "flex";
    imageDropTitle!.style.display = "none";
    fileUploadLabel!.style.display = "none";
    console.log(typeof e);
    const imgFile = droppedFile;
    console.log(typeof imgFile);
    const formData: FormData = new FormData();
    formData.append("file", imgFile);
    console.log(formData);
    setCurrentFile(imgFile);
    const url: string = `${process.env.REACT_APP_SERVER}/imageconvert`;
    const response: Response = await fetch(url, {
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
    loadingScreen!.style.display = "none";
    convertedTextContainer!.style.display = "flex";
    setCurrentString(responseJson["success"]);
    saveData!.style.display = "flex";
  };

  const dragoverHandler = (e: any): void => {
    e.preventDefault();
    console.log("files dragged over");
  };

  useEffect(() => {
    buttonRender(auth);
  }, [loggedIn]);

  return (
    <div className="Home" onClick={navbarClose}>
      <header className="navbar">
        <div className="page-title-container">
          <h1 className="page-title">Image To Text</h1>
        </div>
        <nav className="hamburger-styling" onClick={navbarOpen}>
          <Hamburger menu={menu} setMenu={setMenu} />
        </nav>
        <nav className="links">
          <a href="/register" className="register-link" id="register-button-id">
            Register
          </a>
          <a href="/login" className="login-link" id="login-button-id">
            Login
          </a>
          <a
            href="/"
            className="logout-link"
            id="logout-button-id"
            onClick={logouter}
          >
            Logout
          </a>
          <a href="/user" className="userprofile-link" id="user-button-id">
            Posts
          </a>
        </nav>
      </header>
      <SlidingNavbar />
      <h1 className="main-title">Turn any image into usable text below!</h1>
      <section
        className="main-box"
        onDrop={dropFile}
        onDragOver={dragoverHandler}
      >
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
            <div className="converted-text">{currentString}</div>
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
          id="save-data-button-first"
          onClick={openSaveConversion}
        >
          Save conversion
        </button>
        <button
          type="submit"
          className="new-upload-button"
          onClick={reloadPage}
        >
          New upload
        </button>
      </div>
      <div className="post-title" id="post-title-id">
        <div className="post-title-content" id="post-title-content-id">
          <h3 className="post-title-label">Save converted text and image</h3>
          <input
            type="text"
            id="save-title-input-id"
            className="save-title-input"
            name="save-title-input"
            placeholder="Title"
          ></input>
          <div className="save-title-button-container">
            <button
              type="submit"
              className="save-title-button"
              id="save-data-button-id"
              onClick={saveConversion}
            >
              Save
            </button>
            <button
              type="submit"
              className="cancel-title-button"
              onClick={closeSaveConversion}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
