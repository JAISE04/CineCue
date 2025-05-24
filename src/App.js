import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { Play, Download,Search} from "lucide-react";
import logo from "./assests/cinecue-logo-transparent.png";



const SHEET_CSV_URL = process.env.REACT_APP_SHEET_CSV_URL;

const MovieCard = ({ title, poster, preview, download }) => (
  <div className="movie-card">
    <img src={poster} alt={title} className="movie-poster" />

    <div className="movie-hover">
  <div className="movie-icons">
    <div className="movie-icons-row">
      <a href={preview} target="_blank" rel="noreferrer" title="Watch">
        <Play className="icon" />
      </a>
    </div>
    <div className="movie-icons-row">
      <a href={download} target="_blank" rel="noreferrer" title="Download">
        <Download className="icon" />
      </a>
    </div>
  </div>
</div>
    <div className="movie-title">{title}</div>
  </div>
);


function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const movieList = results.data.map((row) => ({
          title: row["Clean Title"],
          poster: row["Poster"],
          preview: row["Preview Link"],
          download: row["Download Link"],
        }));
        setMovies(movieList);
      },
    });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(query.toLowerCase())
  );
const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      <img src={logo} alt="CineCue Logo" />
    </a>
    <ul className="nav-links">
      <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
      <li>Movies</li>
      <li>TV Shows</li>
    
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
        placeholder="Search..."
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
  </div>
</nav>


      <h1 className="section-title">Latest Movies</h1>

      <div className="grid">
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
