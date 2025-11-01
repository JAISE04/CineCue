import React from "react";
import { Filter, Calendar, Grid, List, Globe } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ControlsSection = ({
  query,
  setQuery,
  filteredMoviesCount,
  genres,
  years,
  languages,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  pageType = "home",
}) => {
  const { user, setShowSuggestMovieModal } = useAuth();
  const navigate = useNavigate();

  const handleSuggestClick = () => {
    if (user) {
      setShowSuggestMovieModal(true);
    } else {
      toast.error("Please sign in to suggest a movie");
      navigate("/auth");
    }
  };

  const getSortOptions = () => {
    if (pageType === "tv-shows") {
      return ["Title (A-Z)", "Title (Z-A)", "Most Episodes", "Most Seasons"];
    }
    return [
      "Title (A-Z)",
      "Rating (High → Low)",
      "Year (Newest)",
      "Recently Uploaded",
    ];
  };

  const getSectionTitle = () => {
    if (query) return `Search Results for "${query}"`;
    if (pageType === "movies") return "All Movies";
    if (pageType === "tv-shows") return "All TV Shows";
    return "Latest Movies";
  };

  const getItemLabel = () => {
    if (pageType === "tv-shows") return "series";
    if (pageType === "movies") return "movies";
    return "items";
  };

  return (
    <div className="controls-section">
      <div className="controls-left">
        <h2 className="section-title">
          {getSectionTitle()}
          <span className="results-count">
            ({filteredMoviesCount} {getItemLabel()})
          </span>
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
            label="Language"
            options={languages}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            icon={Globe}
          />

          <FilterDropdown
            label="Sort By"
            options={getSortOptions()}
            value={sortBy}
            onChange={setSortBy}
            icon={Filter}
          />
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </button>
        </div>
        <button onClick={handleSuggestClick} className="suggest-button"
        style={{ background: "#e50914",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    marginLeft: "10px",}}>
          Suggest a movie
        </button>
      </div>
    </div>
  );
};

export default ControlsSection;
