import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import MoviesContainer from "../components/MoviesContainer";

const MyList = () => {
  const [myListMovies, setMyListMovies] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from localStorage or a backend
    const savedList = JSON.parse(localStorage.getItem("myMovieList") || "[]");
    setMyListMovies(savedList);
  }, []);

  return (
    <>
      <PageHeader
        title="My List"
        subtitle="Your personally curated collection"
        itemCount={myListMovies.length}
      />

      {myListMovies.length === 0 ? (
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
          movies={myListMovies}
          viewMode="grid"
          isLoading={false}
        />
      )}
    </>
  );
};

export default MyList;
