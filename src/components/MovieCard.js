import React from "react";
import { Play, Download, Star, Clock } from "lucide-react";

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
}) => (
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
          <a href={preview} target="_blank" rel="noreferrer" title="Watch">
            <div className="icon">
              <Play size={20} />
            </div>
          </a>
        </div>
        <div className="movie-icons-row">
          <a href={download} target="_blank" rel="noreferrer" title="Download">
            <div className="icon">
              <Download size={20} />
            </div>
          </a>
        </div>
      </div>
    </div>

    <div className="movie-title">{title}</div>
  </div>
);

export default MovieCard;
