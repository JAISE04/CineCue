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

  // Handler for search in Navbar
  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
  };

  const clearSearch = () => {
    setGlobalSearchQuery("");
  };

  return (
    <Router>
      <Navbar
        onSearch={handleGlobalSearch}
        searchQuery={globalSearchQuery}
        onClearSearch={clearSearch}
      />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home globalSearchQuery={globalSearchQuery} />}
          />
          <Route
            path="/movies"
            element={<Movies globalSearchQuery={globalSearchQuery} />}/>
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
