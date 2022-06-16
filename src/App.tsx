import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import Hamburger from "./components/Hamburger";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedUser from "./components/ProtectedUser";
import LoadingAnimation from "./components/LoadingAnimation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<LoadingAnimation />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route element={<ProtectedUser />}>
            <Route path="/user" element={<User />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
