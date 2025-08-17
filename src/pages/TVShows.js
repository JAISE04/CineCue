import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ControlsSection from "../components/ControlSection";
import MoviesContainer from "../components/MoviesContainer";
import NoResults from "../components/NoResults";
import PageHeader from "../components/PageHeader";

const SHEET_CSV_URL = process.env.REACT_APP_SHEET_CSV_URL;

const TVShows = ({ globalSearchQuery = "" }) => {
  const [tvShows, setTvShows] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("Title (A-Z)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!SHEET_CSV_URL || SHEET_CSV_URL === "your_csv_url_here") {
      console.warn(
        "CSV URL not configured. Please set REACT_APP_SHEET_CSV_URL in your .env file"
      );
      setTvShows([]);
      setIsLoading(false);
      return;
    }

    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const tvShowList = results.data
          .map((row) => ({
            category: row["Category"],
            title: row["Clean Title"],
            poster: row["Poster"],
            preview: row["Preview Link"],
            download: row["Download Link"],
          }))
          .filter((item) => item.title); // only valid rows
        setTvShows(tvShowList);
        setIsLoading(false);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setTvShows([]);
        setIsLoading(false);
      },
    });
  }, []);

  // Clear filters when search is active
  useEffect(() => {
    if (globalSearchQuery) {
      setSelectedGenre("");
    }
  }, [globalSearchQuery]);

  // Unique genres (use Category column)
  const genres = [
    ...new Set(tvShows.map((show) => show.category).filter(Boolean)),
  ];

  // Filter TV shows
  let filteredTvShows = tvShows.filter((show) => {
    const matchesSearch = globalSearchQuery
      ? show.title?.toLowerCase().includes(globalSearchQuery.toLowerCase())
      : true;
    const matchesGenre =
      !selectedGenre ||
      show.category?.toLowerCase() === selectedGenre.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  // Sort TV shows
  if (sortBy === "Title (A-Z)") {
    filteredTvShows.sort((a, b) => a.title?.localeCompare(b.title) || 0);
  } else if (sortBy === "Title (Z-A)") {
    filteredTvShows.sort((a, b) => b.title?.localeCompare(a.title) || 0);
  }

  const getPageTitle = () => {
    if (globalSearchQuery) return "TV Show Search Results";
    return "TV Shows";
  };

  const getPageSubtitle = () => {
    if (globalSearchQuery) return `Results for "${globalSearchQuery}"`;
    return "Binge-watch your favorite series";
  };

  return (
    <>
      <PageHeader
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
        itemCount={globalSearchQuery ? filteredTvShows.length : tvShows.length}
      />

      <ControlsSection
        query={globalSearchQuery}
        filteredMoviesCount={filteredTvShows.length}
        genres={genres}
        years={[]} // not available in CSV
        languages={[]} // not available in CSV
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={""}
        setSelectedYear={() => {}}
        selectedLanguage={""}
        setSelectedLanguage={() => {}}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        pageType="tv-shows"
        hideSearch={true}
        isSearchActive={!!globalSearchQuery}
      />

      <MoviesContainer
        movies={filteredTvShows}
        viewMode={viewMode}
        isLoading={isLoading}
      />

      {filteredTvShows.length === 0 && !isLoading && (
        <div
          style={{
            padding: "2rem 4%",
            textAlign: "center",
            minHeight: "50vh",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "3rem",
              borderRadius: "12px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              {globalSearchQuery
                ? `No TV shows found for "${globalSearchQuery}"`
                : "No TV shows available"}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#ccc",
                marginBottom: "1.5rem",
              }}
            >
              {globalSearchQuery
                ? "Try adjusting your search or filters"
                : "TV shows will appear here when they're added to your collection."}
            </p>
          </div>
        </div>
      )}

      {filteredTvShows.length === 0 && globalSearchQuery && (
        <NoResults query={globalSearchQuery} />
      )}
    </>
  );
};

export default TVShows;
