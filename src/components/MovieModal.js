// src/components/MovieModal.js
import React from "react";
import { X, Play, Download, Star, Clock } from "lucide-react";
import "./MovieModal.css";

const MovieModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="movie-modal-backdrop" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header with poster */}
        <div className="movie-modal-header">
          <img src={movie.poster} alt={movie.title} className="modal-poster" />
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
