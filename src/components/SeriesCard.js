import React from "react";
import { Play, Tv } from "lucide-react";

const SeriesCard = ({
  title,
  poster,
  seasons,
  totalEpisodes,
  latestSeason,
  preview,
  onClick,
  viewMode,
}) => {
  // Generate a poster URL if not provided
  const posterUrl =
    poster ||
    `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(
      title
    )}`;

  return (
    <div
      className={`series-card ${viewMode === "list" ? "list-view" : ""}`}
      onClick={onClick}
    >
      <div className="series-poster-container">
        <img
          src={posterUrl}
          alt={title}
          className="series-poster"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(
              title
            )}`;
          }}
        />

        {/* Season count badge */}
        <div className="series-season-badge">
          <Tv size={12} />
          <span>
            {seasons} Season{seasons !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Episode count */}
        <div className="series-episode-count">{totalEpisodes} Episodes</div>
      </div>

      <div className="series-info">
        <h3 className="series-title">{title}</h3>
        <div className="series-meta">
          <span className="series-latest">Latest: Season {latestSeason}</span>
        </div>
      </div>

      {/* Netflix-style expanded info on hover */}
      <div className="series-hover-info">
        <div className="series-hover-content">
          <h3 className="series-hover-title">{title}</h3>
          <div className="series-hover-meta">
            <span className="series-hover-seasons">
              {seasons} Season{seasons !== 1 ? "s" : ""}
            </span>
            <span className="series-hover-episodes">
              {totalEpisodes} Episodes
            </span>
          </div>
          <div className="series-hover-description">
            Latest Season: {latestSeason}
          </div>
          <div className="series-hover-actions">
            <button className="series-play-btn">
              <Play size={16} fill="white" />
              Play
            </button>
            <button className="series-add-btn">
              <span>+</span>
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
