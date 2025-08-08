import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ControlsSection from "../components/ControlSection";
import MoviesContainer from "../components/MoviesContainer";
import NoResults from "../components/NoResults";
import PageHeader from "../components/PageHeader";

const SHEET_CSV_URL = process.env.REACT_APP_SHEET_CSV_URL;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("Year (Newest)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const movieList = results.data
          .map((row) => ({
            title: row["Clean Title"],
            poster: row["Poster"],
            preview: row["Preview Link"],
            download: row["Download Link"],
            year: row["Year"] || row["Release Year"],
            rating: row["Rating"] || row["IMDb Rating"],
            genre: row["Genre"] || row["Genres"],
            duration: row["Duration"] || row["Runtime"],
            type: row["Type"] || "movie", // Assuming there's a type field
          }))
          .filter((item) => item.type?.toLowerCase() === "movie" || !item.type); // Filter only movies
        setMovies(movieList);
        setIsLoading(false);
      },
    });
  }, []);

  // Get unique values for filters
  const genres = [
    ...new Set(
      movies
        .flatMap((movie) => (movie.genre ? movie.genre.split(",") : []))
        .map((genre) => genre.trim())
        .filter(Boolean)
    ),
  ];

  const years = [
    ...new Set(movies.map((movie) => movie.year).filter(Boolean)),
  ].sort((a, b) => b - a);

  // Filter and sort movies
  let filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(query.toLowerCase());
    const matchesGenre =
      !selectedGenre ||
      movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesYear = !selectedYear || movie.year === selectedYear;

    return matchesSearch && matchesGenre && matchesYear;
  });

  // Sort movies
  if (sortBy === "Title (A-Z)") {
    filteredMovies.sort((a, b) => a.title?.localeCompare(b.title) || 0);
  } else if (sortBy === "Rating (High → Low)") {
    filteredMovies.sort(
      (a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0)
    );
  } else if (sortBy === "Year (Newest)") {
    filteredMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortBy === "Recently Uploaded") {
    filteredMovies = [...filteredMovies];
  }

  return (
    <>
      <PageHeader
        title="Movies"
        subtitle="Discover amazing movies from every genre"
        itemCount={movies.length}
      />

      <ControlsSection
        query={query}
        setQuery={setQuery}
        filteredMoviesCount={filteredMovies.length}
        genres={genres}
        years={years}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        pageType="movies"
      />

      <MoviesContainer
        movies={filteredMovies}
        viewMode={viewMode}
        isLoading={isLoading}
      />

      {filteredMovies.length === 0 && query && <NoResults query={query} />}
    </>
  );
};

export default Movies;
