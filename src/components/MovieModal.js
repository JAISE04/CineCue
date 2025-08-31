// src/components/MovieModal.js
import React, { useState } from "react";
import { X, Play, Download, Star, Clock, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import "./MovieModal.css";
import { useMovieList } from "../context/MovieListContext";

// Helper to extract YouTube video ID from a URL or return the ID if already provided
const getYouTubeId = (urlOrId) => {
  if (!urlOrId) return null;
  if (urlOrId.length === 11) return urlOrId;
  const match = urlOrId.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const MovieModal = ({ movie, isOpen, onClose, user }) => {
  const [isAddingToList, setIsAddingToList] = useState(false);
  const { isInMyList, optimisticAddToList, optimisticRemoveFromList } =
    useMovieList();
  const isInList = isInMyList(movie?.title);

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
            <img
              src={movie.poster}
              alt={movie.title}
              className="modal-poster"
            />
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
              <button
                className="modal-btn primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (movie.preview) {
                    const iframe = document.createElement("iframe");
                    iframe.src = movie.preview;
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    iframe.style.position = "fixed";
                    iframe.style.top = "0";
                    iframe.style.left = "0";
                    iframe.style.zIndex = "9999";
                    iframe.style.border = "none";
                    document.body.appendChild(iframe);

                    // Create close button
                    const closeBtn = document.createElement("button");
                    closeBtn.innerHTML = "×";
                    closeBtn.style.position = "fixed";
                    closeBtn.style.top = "20px";
                    closeBtn.style.right = "20px";
                    closeBtn.style.zIndex = "10000";
                    closeBtn.style.background = "#e50914";
                    closeBtn.style.border = "none";
                    closeBtn.style.color = "white";
                    closeBtn.style.fontSize = "24px";
                    closeBtn.style.width = "40px";
                    closeBtn.style.height = "40px";
                    closeBtn.style.borderRadius = "50%";
                    closeBtn.style.cursor = "pointer";
                    closeBtn.onclick = () => {
                      document.body.removeChild(iframe);
                      document.body.removeChild(closeBtn);
                    };
                    document.body.appendChild(closeBtn);
                  }
                }}
              >
                <Play size={18} /> Play
              </button>
            </a>
            <button
              className={`modal-btn secondary list-toggle-btn ${
                isAddingToList ? "loading" : ""
              } ${isInList ? "in-list" : ""}`}
              onClick={async () => {
                if (!user) {
                  toast.error("Please sign in to add to your list", {
                    id: `auth-${movie.title}`,
                  });
                  return;
                }
                setIsAddingToList(true);
                try {
                  if (isInList) {
                    toast.success("Removed from My List", {
                      id: `remove-${movie.title}`,
                      duration: 2000,
                    });
                    await optimisticRemoveFromList(user.id, movie.title);
                  } else {
                    toast.success("Added to My List", {
                      id: `add-${movie.title}`,
                      duration: 2000,
                    });
                    await optimisticAddToList(user.id, movie);
                  }
                } catch (error) {
                  toast.error("Failed to update list", {
                    id: `error-${movie.title}`,
                  });
                  console.error("Error toggling movie in list:", error);
                }
                setIsAddingToList(false);
              }}
              disabled={isAddingToList}
            >
              <div className="btn-icon-container">
                {isInList ? (
                  <Check className="list-icon check" size={18} />
                ) : (
                  <Plus className="list-icon plus" size={18} />
                )}
              </div>
              <span className="btn-text">
                {isInList ? "In My List" : "Add to My List"}
              </span>
            </button>
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
