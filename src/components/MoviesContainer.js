import React from "react";
import MovieCard from "./MovieCard";
import LoadingCard from "./LoadingCard";

const MoviesContainer = ({
  movies,
  viewMode,
  isLoading,
  onMovieClick,
  user,
}) => {
  return (
    <div className={`movies-container ${viewMode}`}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        : movies.map((movie, index) => (
            <MovieCard
              key={index}
              {...movie}
              viewMode={viewMode}
              onClick={() => onMovieClick(movie)}
              user={user}
            />
          ))}
    </div>
  );
};

export default MoviesContainer;
