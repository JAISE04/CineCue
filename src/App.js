import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css"; 

const SHEET_CSV_URL = process.env.REACT_APP_SHEET_CSV_URL;

const MovieCard = ({ title, poster, preview, download }) => (
  <div className="movie-card">
    <img src={poster} alt={title} className="movie-poster" />
    <div className="movie-title">{title}</div>
    <div className="movie-buttons">
      <a href={preview} target="_blank" rel="noreferrer">Watch</a>
      <a href={download} target="_blank" rel="noreferrer">Download</a>
    </div>
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
        const movieList = results.data.map(row => ({
          title: row["Clean Title"],
          poster: row["Poster"],
          preview: row["Preview Link"],
          download: row["Download Link"]
        }));
        setMovies(movieList);
      }
    });
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      {/* ─── Netflix-style Navbar ─── */}
      <div className="navbar">
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ─── Title ─── */}
      <h1 style={{ textAlign: "center", color: "white", fontSize: "2rem", margin: "20px 0" }}>
        Latest Movies
      </h1>

      {/* ─── Movie Grid ─── */}
      <div className="grid">
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
