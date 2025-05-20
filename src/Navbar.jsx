import React from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">🎬 CineCue</span>
        <ul className="nav-links">
          <li>Home</li>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
