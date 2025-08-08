import React from "react";
import MovieCard from "./MovieCard";
import LoadingCard from "./LoadingCard";

const MoviesContainer = ({ movies, viewMode, isLoading }) => {
  return (
    <div className={`movies-container ${viewMode}`}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        : movies.map((movie, index) => <MovieCard key={index} {...movie} />)}
    </div>
  );
};

export default MoviesContainer;
