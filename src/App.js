import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { Play, Download, Search, Star, Calendar, Clock, Filter, Grid, List, ChevronDown, User, Bell, Settings } from "lucide-react";
import logo from "./assets/cinecue-logo-transparent.png";



const SHEET_CSV_URL = process.env.REACT_APP_SHEET_CSV_URL;

const MovieCard = ({ title, poster, preview, download, year, rating, genre, duration }) => (
  <div className="movie-card">
    <img src={poster} alt={title} className="movie-poster" />
    
    {rating && (
      <div className="movie-rating">
        <Star size={12} fill="gold" color="gold" />
        <span>{rating}</span>
      </div>
    )}
    
    {year && (
      <div className="movie-year">
        {year}
      </div>
    )}

    <div className="movie-hover">
      <div className="movie-info">
        <h3 className="hover-title">{title}</h3>
        {genre && <p className="hover-genre">{genre}</p>}
        {duration && (
          <div className="hover-duration">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        )}
      </div>
      
      <div className="movie-icons">
        <div className="movie-icons-row">
          <a href={preview} target="_blank" rel="noreferrer" title="Watch">
            <div className="icon">
              <Play size={20} />
            </div>
          </a>
        </div>
        <div className="movie-icons-row">
          <a href={download} target="_blank" rel="noreferrer" title="Download">
            <div className="icon">
              <Download size={20} />
            </div>
          </a>
        </div>
      </div>
    </div>
    
    <div className="movie-title">{title}</div>
  </div>
);

const FilterDropdown = ({ label, options, value, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="filter-dropdown">
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon size={16} />
        <span>{value || label}</span>
        <ChevronDown size={16} className={isOpen ? 'rotated' : ''} />
      </button>
      
      {isOpen && (
        <div className="filter-options">
          <div 
            className="filter-option"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
          >
            All {label}
          </div>
          {options.map((option, index) => (
            <div 
              key={index}
              className="filter-option"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const movieList = results.data.map((row) => ({
          title: row["Clean Title"],
          poster: row["Poster"],
          preview: row["Preview Link"],
          download: row["Download Link"],
          year: row["Year"] || row["Release Year"],
          rating: row["Rating"] || row["IMDb Rating"],
          genre: row["Genre"] || row["Genres"],
          duration: row["Duration"] || row["Runtime"],
        }));
        setMovies(movieList);
        setIsLoading(false);
      },
    });
  }, []);

  // Get unique values for filters
  const genres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))];
  const years = [...new Set(movies.map(movie => movie.year).filter(Boolean))].sort((a, b) => b - a);

  // Filter and sort movies
  let filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title?.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesYear = !selectedYear || movie.year === selectedYear;
    
    return matchesSearch && matchesGenre && matchesYear;
  });

  // Sort movies
  if (sortBy === 'title') {
    filteredMovies.sort((a, b) => a.title?.localeCompare(b.title) || 0);
  } else if (sortBy === 'year') {
    filteredMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortBy === 'rating') {
    filteredMovies.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
  }

  const LoadingCard = () => (
    <div className="movie-card loading">
      <div className="loading-poster"></div>
      <div className="loading-title"></div>
    </div>
  );

  return (
    <div className="app">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src={logo} alt="CineCue Logo" />
          </a>
          <ul className="nav-links">
            <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>My List</li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className={`search-container ${isFocused ? "expanded" : ""}`}>
            <button className="search-icon" onClick={() => setIsFocused((prev) => !prev)}>
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Unlimited movies, TV shows, and more.</h1>
          <p className="hero-subtitle">Watch anywhere. Cancel anytime.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{movies.length}</span>
              <span className="stat-label">Movies Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">{genres.length}</span>
              <span className="stat-label">Genres</span>
            </div>
            <div className="stat">
              <span className="stat-number">HD</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
        </div>
        <div className="hero-gradient"></div>
      </div>

      {/* Filters and Controls */}
      <div className="controls-section">
        <div className="controls-left">
          <h2 className="section-title">
            {query ? `Search Results for "${query}"` : "Latest Movies"}
            <span className="results-count">({filteredMovies.length} movies)</span>
          </h2>
        </div>
        
        <div className="controls-right">
          <div className="filters">
            <FilterDropdown
              label="Genre"
              options={genres}
              value={selectedGenre}
              onChange={setSelectedGenre}
              icon={Filter}
            />
            
            <FilterDropdown
              label="Year"
              options={years}
              value={selectedYear}
              onChange={setSelectedYear}
              icon={Calendar}
            />
            
            <FilterDropdown
              label="Sort By"
              options={['Title', 'Year', 'Rating']}
              value={sortBy}
              onChange={setSortBy}
              icon={Filter}
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className={`movies-container ${viewMode}`}>
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : (
          filteredMovies.map((movie, index) => (
            <MovieCard key={index} {...movie} />
          ))
        )}
      </div>
      
      {filteredMovies.length === 0 && query && (
        <div className="no-results">
          <h3>No movies found for "{query}"</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CineCue</h4>
            <p>Your ultimate destination for movies and entertainment.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Movies</li>
              <li>TV Shows</li>
              <li>My List</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CineCue. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
