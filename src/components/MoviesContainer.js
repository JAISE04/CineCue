import React, { useState } from "react";
import MovieCard from "./MovieCard";
import LoadingCard from "./LoadingCard";
import MovieModal from "./MovieModal";
import { useAuth } from "../context/AuthContext";

const MoviesContainer = ({
  movies,
  viewMode,
  isLoading,
  onMovieClick,
  user,
}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;

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
              onClick={() =>
                onMovieClick ? onMovieClick(movie) : setSelectedMovie(movie)
              }
              user={currentUser}
            />
          ))}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={true}
          onClose={() => setSelectedMovie(null)}
          user={currentUser}
        />
      )}
    </div>
  );
};

export default MoviesContainer;
