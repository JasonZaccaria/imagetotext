import React, { useState, useRef, useEffect } from "react";
import Auth from "./Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { authObject } from "../services/interfaces";

function ProtectedRoutes(children: any) {
  let [loggedIn, setLoggedIn] = useState(false);
  const getAuth = async (): Promise<void> => {
    const response: authObject = await Auth();
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
  getAuth();
  if (loggedIn) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet context={loggedIn} />;
  }
}

export default ProtectedRoutes;
