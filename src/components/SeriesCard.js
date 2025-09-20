import React from "react";

const SeriesCard = ({
  title,
  poster,
  seasons,
  totalEpisodes,
  onClick,
}) => (
  <div className="series-card" onClick={onClick}>
    <img src={poster} alt={title} className="series-poster" />

    <div className="series-hover">
      <div className="series-info">
        <h3 className="hover-title">{title}</h3>
        {seasons && <p className="hover-genre">{seasons} Seasons</p>}
        {totalEpisodes && <p className="hover-genre">{totalEpisodes} Episodes</p>}
      </div>
    </div>

    <div className="series-title">{title}</div>
  </div>
);

export default SeriesCard;
