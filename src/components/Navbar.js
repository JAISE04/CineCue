import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User, Settings } from "lucide-react";
import logo from "../assets/cinecue-logo-transparent.png";

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} height={50} alt="CineCue Logo" />
        </Link>
        <ul className="nav-links">
          <li className={isActiveRoute("/") ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActiveRoute("/movies") ? "active" : ""}>
            <Link to="/movies">Movies</Link>
          </li>
          <li className={isActiveRoute("/tv-shows") ? "active" : ""}>
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li className={isActiveRoute("/my-list") ? "active" : ""}>
            <Link to="/my-list">My List</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className={`search-container ${isFocused ? "expanded" : ""}`}>
          <button
            className="search-icon"
            onClick={() => setIsFocused((prev) => !prev)}
          >
            <Search size={20} strokeWidth={2.5} color="white" />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            autoFocus={isFocused}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsFocused(false);
                // TODO: Handle global search across pages
              }
            }}
            style={{ width: isFocused ? "200px" : "0px" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
        </div>

        <div className="navbar-icons">
          <Bell size={20} className="nav-icon" />
          <User size={20} className="nav-icon" />
          <Settings size={20} className="nav-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
