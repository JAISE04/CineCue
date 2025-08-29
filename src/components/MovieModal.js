// src/components/MovieModal.js
import React from "react";
import { X, Play, Download, Star, Clock } from "lucide-react";
import "./MovieModal.css";


// Helper to extract YouTube video ID from a URL or return the ID if already provided
const getYouTubeId = (urlOrId) => {
  if (!urlOrId) return null;
  // If it's already an ID (11 chars, no special chars), return as is
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
  // Try to extract ID from URL
  const match = urlOrId.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const MovieModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const trailerId = getYouTubeId(movie.trailer);

  return (
    <div className="movie-modal-backdrop" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header with trailer (YouTube embed) */}
        <div className="movie-modal-header">
          {trailerId ? (
            <iframe
              className="modal-trailer"
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={movie.poster} alt={movie.title} className="modal-poster" />
          )}
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="movie-modal-content">
          <h2 className="modal-title">{movie.title}</h2>
          <div className="modal-meta">
            {movie.rating && (
              <span className="modal-rating">
                <Star size={16} /> {movie.rating}
              </span>
            )}
            {movie.year && <span>{movie.year}</span>}
            {movie.duration && (
              <span>
                <Clock size={16} /> {movie.duration}
              </span>
            )}
            {movie.genre && <span>{movie.genre}</span>}
            {movie.language && <span>{movie.language}</span>}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <a href={movie.preview} target="_blank" rel="noreferrer">
              <button className="modal-btn primary">
                <Play size={18} /> Play
              </button>
            </a>
            <a href={movie.download} target="_blank" rel="noreferrer">
              <button className="modal-btn secondary">
                <Download size={18} /> Download
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
