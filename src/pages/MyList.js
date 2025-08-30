import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import MoviesContainer from "../components/MoviesContainer";
import MovieModal from "../components/MovieModal";
import { useMovieList } from "../context/MovieListContext";
import { supabase } from "../supabaseClient";

const MyList = () => {
  const { myList, loading } = useMovieList();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="My List"
        subtitle="Your personally curated collection"
        itemCount={myList.length}
      />

      {loading ? (
        <div
          style={{ padding: "2rem 4%", textAlign: "center", minHeight: "50vh" }}
        >
          <p>Loading your list...</p>
        </div>
      ) : myList.length === 0 ? (
        <div
          style={{ padding: "2rem 4%", textAlign: "center", minHeight: "50vh" }}
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
              Your list is empty
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#ccc",
                marginBottom: "1.5rem",
              }}
            >
              Start adding movies to your personal collection. Browse through
              our catalog and add movies you want to watch later!
            </p>
            <a
              href="/movies"
              style={{
                background: "linear-gradient(45deg, #e50914, #8b0000)",
                padding: "12px 24px",
                borderRadius: "6px",
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
                display: "inline-block",
              }}
            >
              Browse Movies
            </a>
          </div>
        </div>
      ) : (
        <MoviesContainer
          movies={myList.map((item) => ({
            ...item.movie_data,
            id: item.id,
          }))}
          viewMode="grid"
          isLoading={false}
          onMovieClick={handleOpenModal}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
        />
      )}
    </>
  );
};

export default MyList;
