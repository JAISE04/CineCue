import React from "react";

const HeroSection = ({ movieCount, genreCount }) => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Unlimited movies, TV shows, and more.</h1>
        <p className="hero-subtitle">Watch anywhere. Cancel anytime.</p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{movieCount}</span>
            <span className="stat-label">Movies Available</span>
          </div>
          <div className="stat">
            <span className="stat-number">{genreCount}</span>
            <span className="stat-label">Genres</span>
          </div>
          <div className="stat">
            <span className="stat-number">HD</span>
            <span className="stat-label">Quality</span>
          </div>
        </div>
      </div>
      <div className="hero-gradient"></div>
    </div>
  );
};

export default HeroSection;
