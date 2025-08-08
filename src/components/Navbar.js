import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, User, Settings, X } from "lucide-react";
import logo from "../assets/cinecue-logo-transparent.png";

const Navbar = ({ onSearch, searchQuery, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const location = useLocation();
  const navigate = useNavigate();

  // Sync local query with global search query
  useEffect(() => {
    setLocalQuery(searchQuery || "");
  }, [searchQuery]);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
      setIsFocused(false);

      // Navigate to search results page if we're not on a searchable page
      if (location.pathname !== "/" && location.pathname !== "/movies") {
        navigate("/search");
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);

    // Real-time search on Home and Movies pages
    if (location.pathname === "/" || location.pathname === "/movies") {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setLocalQuery("");
    onClearSearch();
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="logo" onClick={onClearSearch}>
          <img src={logo} height={50} alt="CineCue Logo" />
        </Link>
        <ul className="nav-links">
          <li className={isActiveRoute("/") ? "active" : ""}>
            <Link to="/" onClick={onClearSearch}>
              Home
            </Link>
          </li>
          <li className={isActiveRoute("/movies") ? "active" : ""}>
            <Link to="/movies" onClick={onClearSearch}>
              Movies
            </Link>
          </li>
          <li className={isActiveRoute("/tv-shows") ? "active" : ""}>
            <Link to="/tv-shows" onClick={onClearSearch}>
              TV Shows
            </Link>
          </li>
          <li className={isActiveRoute("/my-list") ? "active" : ""}>
            <Link to="/my-list" onClick={onClearSearch}>
              My List
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className={`search-container ${isFocused ? "expanded" : ""}`}>
            <button
              type="button"
              className="search-icon"
              onClick={() => setIsFocused((prev) => !prev)}
            >
              <Search size={20} strokeWidth={2.5} color="white" />
            </button>

            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={localQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              style={{ width: isFocused ? "200px" : "0px" }}
            />

            {localQuery && isFocused && (
              <button
                type="button"
                className="search-clear"
                onClick={handleClearSearch}
              >
                <X size={16} color="white" />
              </button>
            )}
          </div>
        </form>

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
