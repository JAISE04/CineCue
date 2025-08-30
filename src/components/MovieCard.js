import React, { useState } from "react";
import { Play, Download, Star, Clock, X } from "lucide-react";

const extractDriveFileId = (url) => {
  if (!url) return null;
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
};

const MovieCard = ({
  title,
  poster,
  preview,
  download,
  year,
  rating,
  genre,
  language,
  duration,
  onClick,
}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const driveFileId = extractDriveFileId(preview);

  return (
    <>
      <div className="movie-card" onClick={onClick}>
        <img src={poster} alt={title} className="movie-poster" />

        {rating && (
          <div className="movie-rating">
            <Star size={12} fill="gold" color="gold" />
            <span>{rating}</span>
          </div>
        )}

        {year && <div className="movie-year">{year}</div>}

        <div className="movie-hover">
          <div className="movie-info">
            <h3 className="hover-title">{title}</h3>
            {genre && <p className="hover-genre">{genre}</p>}
            {language && <p className="hover-genre">{language}</p>}

            {duration && (
              <div className="hover-duration">
                <Clock size={14} />
                <span>{duration}</span>
              </div>
            )}
          </div>

          <div className="movie-icons">
            <div className="movie-icons-row">
              <button
                className="icon"
                title="Watch"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayer(true);
                }}
              >
                <Play size={20} />
              </button>
            </div>
            <div className="movie-icons-row">
              <a
                href={download}
                target="_blank"
                rel="noreferrer"
                title="Download"
              >
                <div className="icon">
                  <Download size={20} />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="movie-title">{title}</div>
      </div>

      {/* Fullscreen video player rendered outside the card */}
      {showPlayer && driveFileId && (
        <div
          className="movie-player-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.95)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <iframe
            className="movie-player"
            src={`https://drive.google.com/file/d/${driveFileId}/preview`}
            title="Google Drive Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            width="80%"
            height="80%"
            style={{
              borderRadius: "12px",
              boxShadow: "0 0 32px #000",
            }}
          />
          <button
            style={{
              position: "absolute",
              top: 32,
              right: 32,
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: 24,
              cursor: "pointer",
              zIndex: 2100,
            }}
            onClick={() => setShowPlayer(false)}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default MovieCard;
