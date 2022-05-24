import React from "react";
import logo from "./logo.svg";
import "../styles/User.css";
import { isConstructorDeclaration } from "typescript";

function User() {
  //function to post user data to register them
  async function get(e: any) {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/data";
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      //body: JSON.stringify(data),
    });
    const content = await response.json();
    console.log(content);
  }

  return (
    <div className="User">
      <div className="formContainer">
        <form id="formId" name="formName" action="http://127.0.0.1:8000/data">
          <button type="submit" onClick={get}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default User;
