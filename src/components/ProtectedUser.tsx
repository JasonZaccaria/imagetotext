import Auth from "./Auth";
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { render } from "@testing-library/react";
function ProtectedUser(children: any) {
  let [loggedIn, setLoggedIn] = useState(true);
  const getAuth = async () => {
    const response = await Auth();
    try {
      if (response["failure"]) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    } catch (err) {
      setLoggedIn(false);
    }
  };
  /*useEffect(() => {
    getAuth();
  }, [loggedIn]);*/
  getAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedUser;
