import React from "react";
import PageHeader from "../components/PageHeader";

const TVShows = () => {
  return (
    <>
      <PageHeader
        title="TV Shows"
        subtitle="Binge-watch your favorite series"
        itemCount={0}
      />

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
          <h2
            style={{ fontSize: "2rem", marginBottom: "1rem", color: "#e50914" }}
          >
            Coming Soon!
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#ccc",
              marginBottom: "1.5rem",
            }}
          >
            We're working hard to bring you an amazing collection of TV shows.
            Stay tuned for updates!
          </p>
          <div
            style={{
              background: "linear-gradient(45deg, #e50914, #8b0000)",
              padding: "12px 24px",
              borderRadius: "6px",
              display: "inline-block",
              color: "white",
              fontWeight: "600",
            }}
          >
            Launching Soon
          </div>
        </div>
      </div>
    </>
  );
};

export default TVShows;
