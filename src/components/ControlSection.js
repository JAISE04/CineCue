import React from "react";
import { Filter, Calendar, Grid, List } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

const ControlsSection = ({
  query,
  setQuery,
  filteredMoviesCount,
  genres,
  years,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  pageType = "home",
}) => {
  const sortOptions = [
    "Title (A-Z)",
    "Rating (High → Low)",
    "Year (Newest)",
    "Recently Uploaded",
  ];

  const getSectionTitle = () => {
    if (query) return `Search Results for "${query}"`;
    if (pageType === "movies") return "All Movies";
    return "Latest Movies";
  };

  return (
    <div className="controls-section">
      <div className="controls-left">
        <h2 className="section-title">
          {getSectionTitle()}
          <span className="results-count">
            ({filteredMoviesCount} {pageType === "movies" ? "movies" : "items"})
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
            label="Sort By"
            options={sortOptions}
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
      </div>
    </div>
  );
};

export default ControlsSection;
