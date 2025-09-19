import React, { useState } from "react";
import { X, Play, Plus, Check, Tv, Calendar } from "lucide-react";
import { useSeriesList } from "../context/SeriesContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./SeriesModal.css";

const SeriesModal = ({ series, isOpen, onClose, user }) => {
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);
  const {
    isInMySeriesList,
    optimisticAddToSeriesList,
    optimisticRemoveFromSeriesList,
  } = useSeriesList();
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;

  if (!isOpen || !series) return null;

  const inMyList = isInMySeriesList(series.title);
  const currentSeason = series.seasonsData[currentSeasonIndex];

  const handleAddToList = async () => {
    if (!currentUser) {
      toast.error("Please sign in to add to your list");
      return;
    }

    try {
      if (inMyList) {
        await optimisticRemoveFromSeriesList(currentUser.id, series.title);
        toast.success("Removed from your list");
      } else {
        await optimisticAddToSeriesList(currentUser.id, series);
        toast.success("Added to your list");
      }
    } catch (error) {
      console.error("Error updating list:", error);
      toast.error("Failed to update your list");
    }
  };

  const handlePlay = (episode) => {
    // Check if we have valid URLs (not placeholders)
    const hasValidPreview =
      episode.preview && episode.preview !== "#" && episode.preview !== "";
    const hasValidDownload =
      episode.download && episode.download !== "#" && episode.download !== "";

    // Function to convert Google Drive share link to direct view link
    const convertGoogleDriveLink = (url) => {
      if (url.includes("drive.google.com") && url.includes("/file/d/")) {
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
          const fileId = fileIdMatch[1];
          return `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }
      return url;
    };

    if (hasValidPreview) {
      const previewUrl = convertGoogleDriveLink(episode.preview);
      toast.success(`Opening: ${episode.title}`, { duration: 2000 });
      window.open(previewUrl, "_blank");
    } else if (hasValidDownload) {
      const downloadUrl = convertGoogleDriveLink(episode.download);
      toast.success(`Opening: ${episode.title}`, { duration: 2000 });
      window.open(downloadUrl, "_blank");
    } else {
      // For development/demo purposes, show a toast with episode info
      toast.success(`Playing: ${episode.title}`, {
        duration: 3000,
      });
      console.log("Playing episode:", episode);
      console.log("Episode data:", {
        title: episode.title,
        season: episode.season,
        episode: episode.episode,
        fileName: episode.fileName,
        fileSize: episode.fileSize,
        dateAdded: episode.dateAdded,
      });
    }
  };

  return (
    <div className="series-modal-overlay" onClick={onClose}>
      <div className="series-modal" onClick={(e) => e.stopPropagation()}>
        <button className="series-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="series-modal-content">
          {/* Header */}
          <div className="series-modal-header">
            <div className="series-modal-poster">
              <img
                src={
                  series.poster ||
                  `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(
                    series.title
                  )}`
                }
                alt={series.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(
                    series.title
                  )}`;
                }}
              />
            </div>
            <div className="series-modal-info">
              <h1 className="series-modal-title">{series.title}</h1>
              <div className="series-modal-meta">
                <span className="series-modal-seasons">
                  <Tv size={16} />
                  {series.seasons} Season{series.seasons !== 1 ? "s" : ""}
                </span>
                <span className="series-modal-episodes">
                  {series.totalEpisodes} Episodes
                </span>
                <span className="series-modal-latest">
                  <Calendar size={16} />
                  Latest: Season {series.latestSeason}
                </span>
              </div>
              <div className="series-modal-actions">
                <button
                  className="series-play-button"
                  onClick={() =>
                    currentSeason?.episodes[0] &&
                    handlePlay(currentSeason.episodes[0])
                  }
                >
                  <Play size={20} fill="white" />
                  Play S{currentSeason?.season}E1
                </button>
                <button
                  className={`series-list-button ${inMyList ? "in-list" : ""}`}
                  onClick={handleAddToList}
                >
                  {inMyList ? (
                    <>
                      <Check size={20} />
                      In My List
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      My List
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Season selector */}
          <div className="series-modal-seasons-selector">
            <h3>Seasons</h3>
            <div className="seasons-tabs">
              {series.seasonsData.map((seasonData, index) => (
                <button
                  key={index}
                  className={`season-tab ${
                    index === currentSeasonIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentSeasonIndex(index)}
                >
                  Season {seasonData.season}
                  <span className="episode-count">
                    ({seasonData.episodes.length} episodes)
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Episodes list */}
          <div className="series-modal-episodes">
            <h3>Season {currentSeason?.season} Episodes</h3>
            <div className="episodes-list">
              {currentSeason?.episodes.map((episode, index) => (
                <div key={index} className="episode-item">
                  <div className="episode-number">{episode.episode}</div>
                  <div className="episode-info">
                    <h4 className="episode-title">{episode.title}</h4>
                    <p className="episode-description">
                      {episode.fileName || episode.title}
                    </p>
                    {episode.fileSize && (
                      <p className="episode-filesize">
                        File Size: {episode.fileSize}
                      </p>
                    )}
                    {episode.dateAdded && (
                      <p className="episode-date">Added: {episode.dateAdded}</p>
                    )}
                    <p className="episode-filename">
                      {series.title} - Season {currentSeason.season}, Episode{" "}
                      {episode.episode}
                    </p>
                  </div>
                  <div className="episode-actions">
                    <button
                      className="episode-play-btn"
                      onClick={() => handlePlay(episode)}
                      title="Play Episode"
                    >
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesModal;
