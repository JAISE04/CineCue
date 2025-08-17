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
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("Year (Newest)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    if (!SHEET_CSV_URL || SHEET_CSV_URL === "your_csv_url_here") {
      console.warn("CSV URL not configured. Please set REACT_APP_SHEET_CSV_URL in your .env file");
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
            title: row["Clean Title"],
            poster: row["Poster"],
            preview: row["Preview Link"],
            download: row["Download Link"],
            year: row["Year"] || row["Release Year"],
            rating: row["Rating"] || row["IMDb Rating"],
            genre: row["Genre"] || row["Genres"],
            language: row["Language"] || row["Languages"],
            duration: row["Duration"] || row["Runtime"],
            type: row["Type"] || "movie",
          }))
          .filter((item) => item.type?.toLowerCase() === "tv" || 
                           item.type?.toLowerCase() === "series" ||
                           item.type?.toLowerCase() === "tv show" ||
                           item.title?.toLowerCase().includes("season") ||
                           item.title?.toLowerCase().includes("s0") ||
                           item.title?.toLowerCase().includes("series"));
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
      setSelectedYear("");
      setSelectedLanguage("");
    }
  }, [globalSearchQuery]);

  // Get unique values for filters
  const genres = [
    ...new Set(
      tvShows
        .flatMap((show) => (show.genre ? show.genre.split(",") : []))
        .map((genre) => genre.trim())
        .filter(Boolean)
    ),
  ];

  const years = [
    ...new Set(tvShows.map((show) => show.year).filter(Boolean)),
  ].sort((a, b) => b - a);

  const languages = [
    ...new Set(
      tvShows
        .flatMap((show) => (show.language ? show.language.split(",") : []))
        .map((language) => language.trim())
        .filter(Boolean)
    ),
  ];

  // Filter and sort TV shows
  let filteredTvShows = tvShows.filter((show) => {
    const matchesSearch = globalSearchQuery
      ? show.title?.toLowerCase().includes(globalSearchQuery.toLowerCase())
      : true;
    const matchesGenre =
      !selectedGenre ||
      show.genre?.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesYear = !selectedYear || show.year === selectedYear;
    const matchesLanguage =
      !selectedLanguage ||
      show.language?.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesGenre && matchesYear && matchesLanguage;
  });

  // Sort TV shows
  if (sortBy === "Title (A-Z)") {
    filteredTvShows.sort((a, b) => a.title?.localeCompare(b.title) || 0);
  } else if (sortBy === "Rating (High → Low)") {
    filteredTvShows.sort(
      (a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0)
    );
  } else if (sortBy === "Year (Newest)") {
    filteredTvShows.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortBy === "Recently Uploaded") {
    filteredTvShows = [...filteredTvShows];
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
        years={years}
        languages={languages}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
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
        <div style={{ padding: "2rem 4%", textAlign: "center", minHeight: "50vh" }}>
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
              {globalSearchQuery ? `No TV shows found for "${globalSearchQuery}"` : "No TV shows available"}
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