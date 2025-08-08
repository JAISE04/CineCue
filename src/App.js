import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";
import SearchResults from "./pages/SearchResults";

function App() {
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
    setIsSearchActive(query.length > 0);
  };

  const clearSearch = () => {
    setGlobalSearchQuery("");
    setIsSearchActive(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          onSearch={handleGlobalSearch}
          searchQuery={globalSearchQuery}
          onClearSearch={clearSearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                globalSearchQuery={isSearchActive ? globalSearchQuery : ""}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                globalSearchQuery={isSearchActive ? globalSearchQuery : ""}
              />
            }
          />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/my-list" element={<MyList />} />
          <Route
            path="/search"
            element={
              <SearchResults
                searchQuery={globalSearchQuery}
                onClearSearch={clearSearch}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
