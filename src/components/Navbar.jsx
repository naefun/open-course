import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar">
      <ul className="navbar-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mycourses">My Courses</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
